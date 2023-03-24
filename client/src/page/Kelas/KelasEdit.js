import Form from "./KelasForm";
import { useState, useEffect, useContext } from "react";
import { url } from "../../api/url";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";

const KelasEdit = () => {
  const { feedbackHandler } = useOutletContext();
  const { dataMatkul, TriggerKelas } = useContext(DataContext);
  const kodeParams = useParams();
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

  const patchData = async ({
    kode_matkul,
    nama,
    ruang_kelas,
    hari,
    jam_mulai,
    jam_selesai,
  }) => {
    try {
      const res = await url.patch(`/kelas/${kodeParams.kode}`, {
        kode_matkul,
        nama,
        ruang_kelas,
        hari,
        jam_mulai,
        jam_selesai,
        updated_at: null,
        created_at: null,
      });
      if (res.status === 200) {
        console.log(res);
        TriggerKelas();
        navigate("/kelas");
        feedbackHandler(true, "patch");
      }
    } catch (err) {
      console.log(err);
      feedbackHandler(false, "patch");
    }
  };

  useEffect(() => {
    const getKelasId = async () => {
      try {
        const { data } = await url.get(`/kelas/${kodeParams.kode}`);
        setFormValue({
          kode_matkul: data.data.matkul.kode_matkul,
          nama: data.data.nama,
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

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      patchData(formValue);
    }
  }, [formErrors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // name menjadi key dari value yang diinputkan
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValue));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.kode_matkul) {
      errors.kode_matkul = "Kode Mata Kuliah is required";
    }
    if (!values.nama) {
      errors.nama = "Nama Mata Kuliah is required";
    }
    if (!values.ruang_kelas) {
      errors.ruang_kelas = "Ruang KElas Kuliah is required";
    }
    if (!values.hari) {
      errors.hari = "Hari is required";
    }
    if (!values.jam_mulai) {
      errors.jam_mulai = "Jam Mulai is required";
    }
    if (!values.jam_selesai) {
      errors.jam_selesai = "Jam Selesai is required";
    }
    return errors;
  };
  return (
    <>
      <Form
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
