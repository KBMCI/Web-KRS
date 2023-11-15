import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { getAllMatkul } from "../../mataKuliah/services/getAllMatkul";
import { validateKelas } from "../lib/validateKelas";
import { createKelas } from "../services/createKelas";
import KelasForm from "./KelasForm";

const KelasAdd = () => {
  const token = window.localStorage.getItem("Authorization");
  const { setNotif, setRefresh } = useOutletContext();
  const navigate = useNavigate();
  const [dataAllMatkul, setDataAllMatkul] = useState([]);
  const [loadingBtn, setLoadinBtn] = useState(false);

  // Validation Form
  const [formValue, setFormValue] = useState({
    kode_matkul: "",
    nama: "",
    ruang_kelas: "",
    hari: "",
    jam_mulai: "",
    jam_selesai: "",
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const getDataAllMatkul = async () => {
      try {
        const result = await getAllMatkul(token);

        if (result?.response?.data) {
          alert(result.response.data.message);
          return;
        }

        setDataAllMatkul(() => result.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDataAllMatkul();
  }, []);

  const addDataKelas = async () => {
    setLoadinBtn(true);
    try {
      const result = await createKelas(token, formValue);

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
        navigate("/admin/kelas");
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
    const isError = validateKelas(formValue);
    if (Object.keys(isError).length !== 0) {
      setFormErrors(() => isError);
      return;
    }
    addDataKelas();
  };

  return (
    <>
      <KelasForm
        header="Add Kelas"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formValue={formValue}
        formErrors={formErrors}
        dataAllMatkul={dataAllMatkul}
        loading={loadingBtn}
      />
    </>
  );
};

export default KelasAdd;
