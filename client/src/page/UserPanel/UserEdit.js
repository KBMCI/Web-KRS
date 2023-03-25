import { useState, useEffect, useContext } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import { url } from "../../api/url";
import UserForm from "./UserForm";

const UserEdit = () => {
  const { feedbackHandler } = useOutletContext();
  const { TriggerMatkul } = useContext(DataContext);
  const navigate = useNavigate();
  const kodeParams = useParams();
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
      setLoading(true);
      const res = await url.patch(`user/${kodeParams.kode}`, {
        id: null,
        email,
        nama,
        program_studi,
        nim,
        password,
        role,
        updated_at: null,
        created_at: null,
      });
      if (res.status === 200) {
        console.log(res);
        feedbackHandler(true, "patch");
        TriggerMatkul();
        setLoading(false);
        navigate("/user-panel");
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
        const { data } = await url.get(`user/${kodeParams.kode}`);
        console.log(data);
        setFormValue({
          email: data.data.email,
          nama: data.data.nama,
          program_studi: data.data.program_studi,
          nim: data.data.nim,
          password: data.data.password,
          role: data.data.role,
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
    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.nama) {
      errors.nama = "Nama User is required";
    }
    if (!values.program_studi) {
      errors.program_studi = "Program Studi is required";
    }
    if (!values.nim) {
      errors.nim = "NIm is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    if (!values.role) {
      errors.role = "Role is required";
    }
    return errors;
  };

  return (
    <UserForm
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formErrors={formErrors}
      formValue={formValue}
      loading={loading}
    />
  );
};

export default UserEdit;
