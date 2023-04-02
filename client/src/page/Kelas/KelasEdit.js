import Form from "./KelasForm";
import { useState, useEffect, useContext, useRef } from "react";
import { url } from "../../api/url";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";

const KelasEdit = () => {
  const { feedbackHandler, validate } = useOutletContext();
  const { dataMatkul, TriggerKelas, link } = useContext(DataContext);
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

  const patchData = async ({
    kode_matkul,
    nama,
    ruang_kelas,
    hari,
    jam_mulai,
    jam_selesai,
  }) => {
    try {
      const res = await url.patch(`/kelas/${kodeParams.current.kode}`, {
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
        navigate(link.admin.kelas);
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
        const { data } = await url.get(`/kelas/${kodeParams.current.kode}`);
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
