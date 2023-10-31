import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import { url } from "../../api/url";
import UserForm from "./UserForm";

const UserEdit = () => {
  const { feedbackHandler, validate } = useOutletContext();
  const { TriggerMatkul, link } = useContext(DataContext);
  const navigate = useNavigate();
  const kodeParams = useRef();
  kodeParams.current = useParams();
  const [loading, setLoading] = useState(false);

  // Validation Form
  const [formValue, setFormValue] = useState({
    email: "",
    nama: "",
    program_studi: "",
    nim: "",
    password: "",
    role: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const patchData = async ({
    email,
    nama,
    program_studi,
    nim,
    password,
    role,
  }) => {
    try {
      const token = localStorage.getItem("Authorization");
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setLoading(true);
      const res = await url.patch(
        `user/${kodeParams.current.kode}`,
        {
          id: null,
          email,
          nama,
          program_studi,
          nim,
          password,
          role,
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
        navigate(link.admin.user_panel);
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
          `user/${kodeParams.current.kode}`,
          config
        );
        console.log(data);
        setFormValue({
          email: data.data.data.email,
          nama: data.data.data.nama,
          program_studi: data.data.data.program_studi,
          nim: data.data.data.nim,
          password: data.data.data.password,
          role: data.data.data.role,
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
    console.log(formValue);
    e.preventDefault();
    setFormErrors(validate(formValue));
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValue);
      patchData(formValue);
    }
  };

  return (
    <UserForm
      header="Edit User Panel"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formErrors={formErrors}
      formValue={formValue}
      loading={loading}
    />
  );
};

export default UserEdit;
