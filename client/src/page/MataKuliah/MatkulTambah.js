import { useState, useEffect, useContext } from "react";
import { MatkulContext } from "../../context/contextMatkul";
import MatkulForm from "./MatkulForm";
import { url } from "../../api/url";
import { useOutletContext } from "react-router-dom";

export default function MatkulTambah() {
  const { feedbackHandler } = useOutletContext();
  const { Trigger } = useContext(MatkulContext);
  const [loading, setLoading] = useState(false);

  // Validation Form
  const intialValue = {
    kode_matkul: "",
    nama: "",
    sks: "",
    tahun_kurikulum: "",
  };

  const [formValue, setFormValue] = useState(intialValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // name menjadi key dari value yang diinputkan
    setFormValue({ ...formValue, [name]: value });
  };

  const postData = async ({ kode_matkul, nama, tahun_kurikulum, sks }) => {
    try {
      setLoading(true);
      const res = await url.post("/matkul", {
        kode_matkul,
        nama,
        tahun_kurikulum: parseInt(tahun_kurikulum),
        sks: parseInt(sks),
        updated_at: null,
        created_at: null,
      });
      if (res.status === 200) {
        console.log(res);
        feedbackHandler(true, "post");
        setLoading(false);
        setFormValue(intialValue);
        Trigger();
      }
    } catch (err) {
      console.log(err);
      feedbackHandler(false, "post");
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      postData(formValue);
    }
  }, [formErrors]);

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
    <MatkulForm
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formErrors={formErrors}
      formValue={formValue}
      loading={loading}
    />
  );
}
