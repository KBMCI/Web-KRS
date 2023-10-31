import { useContext, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { url } from "../../api/url";
import { DataContext } from "../../context/DataContext";
import Form from "./KelasForm";

export const KelasTambah = () => {
  const { feedbackHandler, validate } = useOutletContext();
  const { TriggerKelas, dataMatkul } = useContext(DataContext);

  // Validation Form
  const intialValue = {
    kode_matkul: "",
    nama: "",
    ruang_kelas: "",
    hari: "",
    jam_mulai: "",
    jam_selesai: "",
  };

  const [formValue, setFormValue] = useState(intialValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // name menjadi key dari value yang diinputkan
    setFormValue({ ...formValue, [name]: value });
  };

  const postData = async ({
    kode_matkul,
    nama,
    ruang_kelas,
    hari,
    jam_mulai,
    jam_selesai,
  }) => {
    try {
      const token = localStorage.getItem("Authorization");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await url.post(
        "/kelas",
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
        setFormValue(intialValue);
        TriggerKelas();
        feedbackHandler(true, "post");
      }
    } catch (err) {
      console.log(err);
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
    <>
      <Form
        header="Add Kelas"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formValue={formValue}
        formErrors={formErrors}
        dataMatkul={dataMatkul}
      />
    </>
  );
};
