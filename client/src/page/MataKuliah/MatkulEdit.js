import { useState, useEffect, useContext } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { MatkulContext } from "../../context/contextMatkul";
import { url } from "../../api/url";
import MatkulForm from "./MatkulForm";

export default function MatkulEdit() {
  const { feedbackHandler } = useOutletContext();
  const { Trigger } = useContext(MatkulContext);
  const navigate = useNavigate();
  const kodeParams = useParams();
  const [loading, setLoading] = useState(false);

  // Validation Form
  const [formValue, setFormValue] = useState({
    kode_matkul: "",
    nama: "",
    sks: "",
    tahun_kurikulum: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const patchData = async ({ kode_matkul, nama, tahun_kurikulum, sks }) => {
    try {
      setLoading(true);
      const res = await url.patch(`matkul/${kodeParams.kode}`, {
        kode_matkul,
        nama,
        tahun_kurikulum: parseInt(tahun_kurikulum),
        sks: parseInt(sks),
        updated_at: null,
        created_at: null,
      });
      if (res.status === 200) {
        console.log(res);
        feedbackHandler(true, "patch");
        Trigger();
        setLoading(false);
        navigate("/mata-kuliah");
      }
    } catch (err) {
      console.log(err);
      feedbackHandler(false, "patch");
      setLoading(false);
    }
  };

  useEffect(() => {
    const getMatkulId = async () => {
      try {
        const { data } = await url.get(`matkul/${kodeParams.kode}`);
        setFormValue({
          kode_matkul: data.data.kode_matkul,
          nama: data.data.nama,
          sks: data.data.sks,
          tahun_kurikulum: data.data.tahun_kurikulum,
        });
      } catch (err) {
        console.log(err);
      }
    };
    getMatkulId();
  }, []);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValue);
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
    const regexNumber = /^\d+$/;
    if (!values.kode_matkul) {
      errors.kode_matkul = "Kode Mata Kuliah is required";
    }
    if (!values.nama) {
      errors.nama = "Nama Mata Kuliah is required";
    }
    if (!values.sks) {
      errors.sks = "Jumlah SKS is required";
    } else if (!regexNumber.test(values.sks)) {
      errors.sks = "Number input type only";
    }
    if (!values.tahun_kurikulum) {
      errors.tahun_kurikulum = "Tahun Kurikulum is required";
    } else if (!regexNumber.test(values.tahun_kurikulum)) {
      errors.tahun_kurikulum = "Number input type only";
    }

    return errors;
  };

  return (
    <>
      <MatkulForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formValue={formValue}
        formErrors={formErrors}
        loading={loading}
      />
    </>
  );
}
