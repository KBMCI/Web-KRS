import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { getAllProgramStudi } from "../../programStudi/services/getAllProgramStudi";
import { validateMatkul } from "../lib/validateMatkul";
import { editMatkul } from "../services/editMatkul";
import { getMatkulById } from "../services/getMatkulById";
import MatkulForm from "./MatkulForm";

const MatkulEdit = () => {
  const token = window.localStorage.getItem("Authorization");
  const { setNotif, setRefresh } = useOutletContext();
  const navigate = useNavigate();
  const { kode } = useParams();
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

  // useEffect for get Data matkul By Id and All Program Studi
  useEffect(() => {
    const getDataMatkulId = async () => {
      try {
        const result = await getMatkulById(token, kode);

        if (result?.response?.data) {
          alert(result.response.data.message);
          return;
        }
        console.log(result.data.data);
        setFormValue(() => ({
          kode_matkul: result.data.data.kode_matkul,
          nama: result.data.data.nama,
          sks: result.data.data.sks,
          tahun_kurikulum: result.data.data.tahun_kurikulum,
          id_program_studi: result.data.data.program_studi.id_program_studi,
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
    getDataMatkulId();
  }, []);

  const editDataMatkul = async () => {
    setLoadinBtn(true);
    try {
      const result = await editMatkul(token, formValue, kode);

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
    editDataMatkul();
  };

  return (
    <>
      <MatkulForm
        header="Edit Mata Kuliah"
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

export default MatkulEdit;
