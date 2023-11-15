import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { getAllProgramStudi } from "../../programStudi/services/getAllProgramStudi";
import { validateMatkul } from "../lib/validateMatkul";
import { createMatkul } from "../services/createMatkul";
import MatkulForm from "./MatkulForm";

const MatkulAdd = () => {
  const token = window.localStorage.getItem("Authorization");
  const { setNotif, setRefresh } = useOutletContext();
  const navigate = useNavigate();
  const [dataAllProgramStudi, setDataAllProgramStudi] = useState([]);
  const [loadingBtn, setLoadinBtn] = useState(false);

  // Validation Form
  const [formValue, setFormValue] = useState({
    id_program_studi: "",
    kode_matkul: "",
    nama: "",
    sks: "",
    tahun_kurikulum: "",
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
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
  }, []);

  const AddDataMatkul = async () => {
    setLoadinBtn(true);
    try {
      const result = await createMatkul(token, formValue);

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
        navigate("/admin/mata-kuliah");
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
    const isError = validateMatkul(formValue);
    if (Object.keys(isError).length !== 0) {
      setFormErrors(() => isError);
      return;
    }
    AddDataMatkul();
  };

  return (
    <>
      <MatkulForm
        header="Tambah Mata Kuliah"
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

export default MatkulAdd;
