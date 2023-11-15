import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { getAllFakultas } from "../../fakultas/services/getAllFakultas";
import { validateProgramStudi } from "../lib/validateProgramStudi";
import { editProgramStudi } from "../services/editProgramStudi";
import { getProgramStudiById } from "../services/getProgramStudiById";
import ProgramStudiForm from "./ProgramStudiForm";

const ProgramStudiEdit = () => {
  const token = window.localStorage.getItem("Authorization");
  const { setNotif, setRefresh } = useOutletContext();
  const navigate = useNavigate();
  const { kode } = useParams();
  const [dataAllFakultas, setDataAllFakultas] = useState([]);
  const [loadingBtn, setLoadinBtn] = useState(false);

  // Validation Form
  const [formValue, setFormValue] = useState({
    id_fakultas: "",
    nama: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // useEffect for get Data matkul By Id and All Program Studi
  useEffect(() => {
    const getDataProgramStudiById = async () => {
      try {
        const result = await getProgramStudiById(token, kode);

        if (result?.response?.data) {
          alert(result.response.data.message);
          return;
        }
        console.log(result.data.data);
        setFormValue(() => ({
          nama: result.data.data.nama,
          id_fakultas: result.data.data.fakultas.id_fakultas,
        }));
      } catch (error) {}
    };
    const getDataAllFakultas = async () => {
      try {
        const result = await getAllFakultas(token);

        if (result?.response?.data) {
          alert(result.response.data.message);
          return;
        }

        setDataAllFakultas(() => result.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getDataAllFakultas();
    getDataProgramStudiById();
  }, []);

  const editDataProgramStudi = async () => {
    setLoadinBtn(true);
    try {
      const result = await editProgramStudi(token, formValue, kode);

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
        navigate("/admin/program-studi");
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
    const isError = validateProgramStudi(formValue);
    if (Object.keys(isError).length !== 0) {
      setFormErrors(() => isError);
      return;
    }
    editDataProgramStudi();
  };

  return (
    <>
      <ProgramStudiForm
        header="Edit Program Studi"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formValue={formValue}
        formErrors={formErrors}
        dataAllFakultas={dataAllFakultas}
        loading={loadingBtn}
      />
    </>
  );
};

export default ProgramStudiEdit;
