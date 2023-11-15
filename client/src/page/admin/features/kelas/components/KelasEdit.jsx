import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { getAllMatkul } from "../../mataKuliah/services/getAllMatkul";
import { validateKelas } from "../lib/validateKelas";
import { editKelas } from "../services/editKelas";
import { getKelasById } from "../services/getKelasById";
import KelasForm from "./KelasForm";

const KelasEdit = () => {
  const location = useLocation();
  const { kode } = useParams();
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

  const idParams = () => {
    // Mengambil pathname dari url
    const path = location.pathname.split("/").filter((p) => p !== "");
    // Memasukan path pada id yang sesuai
    const id = {
      idKelas: path[2],
      idJadwalKElas: path[4],
    };
    return id;
  };

  // useEffect for get Data matkul By Id and All Program Studi
  useEffect(() => {
    const getDataKelasById = async () => {
      try {
        const result = await getKelasById(token, kode);

        if (result?.response?.data) {
          alert(result.response.data.message);
          return;
        }
        
        setFormValue(() => ({
          kode_matkul: result.data.data.matkul.kode_matkul,
          nama: result.data.data.nama,
          ruang_kelas: result.data.data.jadwal_kelas[0].ruang_kelas,
          hari: result.data.data.jadwal_kelas[0].hari,
          jam_mulai: result.data.data.jadwal_kelas[0].jam_mulai,
          jam_selesai: result.data.data.jadwal_kelas[0].jam_selesai,
        }));
      } catch (error) {
        console.log(error);
      }
    };
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
    getDataKelasById();
    getDataAllMatkul();
  }, []);

  const editDataKelas = async () => {
    setLoadinBtn(true);
    const id = idParams();
    try {
      const result = await editKelas(
        token,
        formValue,
        id.idKelas,
        id.idJadwalKElas
      );

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
    editDataKelas();
  };

  return (
    <>
      <KelasForm
        header="Edit Kelas"
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

export default KelasEdit;
