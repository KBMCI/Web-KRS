import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { getAllProgramStudi } from "../../programStudi/services/getAllProgramStudi";
import { validateEditUser } from "../lib/validateUser";
import { editUser } from "../services/editUser";
import { getUserById } from "../services/getUserById";
import UserFormEdit from "./UserFormEdit";

const UserEdit = () => {
  const token = window.localStorage.getItem("Authorization");
  const { setNotif, setRefresh } = useOutletContext();
  const navigate = useNavigate();
  const { kode } = useParams();
  const [dataAllProgramStudi, setDataAllProgramStudi] = useState([]);
  const [loadingBtn, setLoadinBtn] = useState(false);

  // Validation Form
  const [formValue, setFormValue] = useState({
    id_program_studi: "",
    nama: "",
    nim: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // useEffect for get Data matkul By Id and All Program Studi
  useEffect(() => {
    const getDataUserById = async () => {
      try {
        const result = await getUserById(token, kode);

        if (result?.response?.data) {
          alert(result.response.data.message);
          return;
        }
        console.log(result.data.data);
        setFormValue(() => ({
          id_program_studi: result.data.data.program_studi.id_program_studi,
          nama: result.data.data.nama,
          email: result.data.data.email,
          nim: result.data.data.nim,
        }));
      } catch (error) {}
    };
    const getDataAllProgramStudi = async () => {
      try {
        const result = await getAllProgramStudi(token);

        if (result?.response?.data) {
          alert(result.response.data.message);
          return;
        }

        setDataAllProgramStudi(() => result.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getDataAllProgramStudi();
    getDataUserById();
  }, []);

  const editDataUser = async () => {
    setLoadinBtn(true);
    try {
      const result = await editUser(token, formValue, kode);

      if (result?.response?.data) {
        setLoadinBtn(false);
        setNotif(() => ({
          open: true,
          status: false,
          message: result.response.data.message,
        }));

        setTimeout(() => {
          setNotif((prev) => ({
            ...prev,
            open: false,
          }));
        }, 2000);
        return;
      }

      setTimeout(() => {
        setNotif(() => ({
          open: true,
          status: true,
          message: result.data.message,
        }));
        navigate("/admin/user-panel");
        setLoadinBtn(false);
        setRefresh((prev) => !prev);
      }, 1000);

      setTimeout(() => {
        setNotif((prev) => ({
          ...prev,
          open: false,
        }));
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isError = validateEditUser(formValue);
    if (Object.keys(isError).length !== 0) {
      setFormErrors(() => isError);
      return;
    }
    editDataUser();
  };

  return (
    <>
      <UserFormEdit
        header="Edit User Admin"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formValue={formValue}
        formErrors={formErrors}
        dataAllProgramStudi={dataAllProgramStudi}
        loading={loadingBtn}
      />
    </>
  );
};

export default UserEdit;
