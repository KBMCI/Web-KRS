import { useContext, useEffect, useRef, useState } from "react";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { url } from "../../api/url";
import { DataContext } from "../../context/DataContext";
import Form from "./KelasForm";

const KelasEdit = () => {
  const { feedbackHandler, validate } = useOutletContext();
  const { dataMatkul, TriggerKelas, link } = useContext(DataContext);
  const location = useLocation();
  const kodeParams = useRef();
  kodeParams.current = useParams();
  const navigate = useNavigate();

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
  const [isSubmit, setIsSubmit] = useState(false);

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

  const patchData = async ({
    kode_matkul,
    nama,
    ruang_kelas,
    hari,
    jam_mulai,
    jam_selesai,
  }) => {
    const id = idParams();
    try {
      const token = localStorage.getItem("Authorization");
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await url.patch(
        `/kelas/${id.idKelas}/jadwal/${kodeParams.current.kode}`,
        {
          kode_matkul,
          nama,
          ruang_kelas,
          hari,
          jam_mulai,
          jam_selesai,
          updated_at: null,
          created_at: null,
        },
        config
      );
      if (res.status === 200) {
        console.log(res);
        TriggerKelas();
        navigate(link.admin.kelas);
        feedbackHandler(true, "patch");
      }
    } catch (err) {
      console.log(err);
      feedbackHandler(false, "patch");
    }
  };

  useEffect(() => {
    const id = idParams();
    const getKelasId = async () => {
      try {
        const token = localStorage.getItem("Authorization");
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await url.get(
          `/kelas/${id.idKelas}/jadwal/${kodeParams.current.kode}`,
          config
        );
        console.log(data);

        setFormValue({
          kode_matkul: data.data.kelas.matkul.kode_matkul,
          nama: data.data.kelas.nama,
          ruang_kelas: data.data.ruang_kelas,
          hari: data.data.hari,
          jam_mulai: data.data.jam_mulai,
          jam_selesai: data.data.jam_selesai,
        });
      } catch (err) {
        console.log(err);
      }
    };
    getKelasId();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // name menjadi key dari value yang diinputkan
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValue));
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      patchData(formValue);
    }
  };

  return (
    <>
      <Form
        header="Edit Kelas"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formValue={formValue}
        formErrors={formErrors}
        dataMatkul={dataMatkul}
      />
    </>
  );
};

export default KelasEdit;
