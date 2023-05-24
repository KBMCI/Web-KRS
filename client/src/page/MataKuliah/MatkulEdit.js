import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { url } from "../../api/url";
import { DataContext } from "../../context/DataContext";
import MatkulForm from "./MatkulForm";

export default function MatkulEdit() {
  const { feedbackHandler, validate } = useOutletContext();
  const { TriggerMatkul, link } = useContext(DataContext);
  const navigate = useNavigate();
  const kodeParams = useRef();
  kodeParams.current = useParams();
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
      const token = localStorage.getItem("Authorization");
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await url.patch(
        `matkul/${kodeParams.current.kode}`,
        {
          kode_matkul,
          nama,
          tahun_kurikulum: parseInt(tahun_kurikulum),
          sks: parseInt(sks),
          updated_at: null,
          created_at: null,
        },
        config
      );
      if (res.status === 200) {
        console.log(res);
        feedbackHandler(true, "patch");
        TriggerMatkul();
        setLoading(false);
        navigate(link.admin.mata_kuliah);
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
        const token = localStorage.getItem("Authorization");
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await url.get(
          `matkul/${kodeParams.current.kode}`,
          config
        );
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
      console.log(formValue);
      patchData(formValue);
    }
  };

  return (
    <>
      <MatkulForm
        header="Edit Mata Kuliah"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formValue={formValue}
        formErrors={formErrors}
        loading={loading}
      />
    </>
  );
}
