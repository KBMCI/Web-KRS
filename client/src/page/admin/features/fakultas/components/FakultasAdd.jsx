import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { validateFakultas } from "../lib/validateFakultas";
import { createFakultas } from "../services/createFakultas";
import FakultasForm from "./FakultasForm";

const FakultasAdd = () => {
  const token = window.localStorage.getItem("Authorization");
  const { setNotif, setRefresh } = useOutletContext();
  const navigate = useNavigate();
  const [loadingBtn, setLoadinBtn] = useState(false);

  // Validation Form
  const [formValue, setFormValue] = useState({
    nama: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const AddDataFakultas = async () => {
    setLoadinBtn(true);
    try {
      const result = await createFakultas(token, formValue);

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
    AddDataFakultas();
  };

  return (
    <>
      <FakultasForm
        header="Tambah Fakultas"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formValue={formValue}
        formErrors={formErrors}
        loading={loadingBtn}
      />
    </>
  );
};

export default FakultasAdd;
