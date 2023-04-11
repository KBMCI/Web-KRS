import { useState, useContext } from "react";
import { DataContext } from "../../context/DataContext";
import MatkulForm from "./MatkulForm";
import { url } from "../../api/url";
import { useOutletContext } from "react-router-dom";

export default function MatkulTambah() {
  const { feedbackHandler, validate } = useOutletContext();
  const { TriggerMatkul } = useContext(DataContext);
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
    console.log(formValue);
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
        TriggerMatkul();
      }
    } catch (err) {
      console.log(err);
      feedbackHandler(false, "post");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValue));
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      postData(formValue);
    }
  };

  return (
    <MatkulForm
      header="Add Mata Kuliah"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formErrors={formErrors}
      formValue={formValue}
      loading={loading}
    />
  );
}
