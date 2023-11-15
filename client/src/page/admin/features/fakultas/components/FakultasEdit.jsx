import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { validateFakultas } from "../lib/validateFakultas";
import { editFakultas } from "../services/editFakultas";
import { getFakultasById } from "../services/getFakultasById";
import FakultasForm from "./FakultasForm";

const FakultasEdit = () => {
  const token = window.localStorage.getItem("Authorization");
  const { setNotif, setRefresh } = useOutletContext();
  const navigate = useNavigate();
  const { kode } = useParams();
  const [loadingBtn, setLoadinBtn] = useState(false);

  // Validation Form
  const [formValue, setFormValue] = useState({
    nama: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // useEffect for get Data matkul By Id and All Program Studi
  useEffect(() => {
    const getDataFakultasById = async () => {
      try {
        const result = await getFakultasById(token, kode);

        if (result?.response?.data) {
          alert(result.response.data.message);
          return;
        }
        console.log(result.data.data);
        setFormValue(() => ({
          nama: result.data.data.nama,
        }));
      } catch (error) {}
    };
    getDataFakultasById();
  }, []);

  const editDataFakultas = async () => {
    setLoadinBtn(true);
    try {
      const result = await editFakultas(token, formValue, kode);

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
        navigate("/admin/fakultas");
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
    const isError = validateFakultas(formValue);
    if (Object.keys(isError).length !== 0) {
      setFormErrors(() => isError);
      return;
    }
    editDataFakultas();
  };

  return (
    <>
      <FakultasForm
        header="Edit Fakultas"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formValue={formValue}
        formErrors={formErrors}
        loading={loadingBtn}
      />
    </>
  );
};

export default FakultasEdit;
