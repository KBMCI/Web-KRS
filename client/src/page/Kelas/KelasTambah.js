import Form from "./KelasForm";
import { useState, useEffect, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { url } from "../../api/url";
import { DataContext } from "../../context/DataContext";

export const KelasTambah = () => {
  const { feedbackHandler } = useOutletContext();
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
      const res = await url.post("/kelas", {
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
        setFormValue(intialValue);
        TriggerKelas();
        feedbackHandler(true, "post");
      }
    } catch (err) {}
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
    if (!values.kode_matkul) {
      errors.kode_matkul = "Kode Mata Kuliah is required";
    }
    if (!values.nama) {
      errors.nama = "Nama Kelas is required";
    }
    if (!values.ruang_kelas) {
      errors.ruang_kelas = "Ruang Kelas Kuliah is required";
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
