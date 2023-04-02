import { useState, useContext } from "react";
import { DataContext } from "../../context/DataContext";
import UserForm from "./UserForm";
import { url } from "../../api/url";
import { useOutletContext } from "react-router-dom";

const UserTambah = () => {
  const { feedbackHandler, validate } = useOutletContext();
  const { TriggerUser } = useContext(DataContext);
  const [loading, setLoading] = useState(false);

  // Validation Form
  const intialValue = {
    email: "",
    nama: "",
    program_studi: "",
    nim: "",
    password: "",
    role: "",
  };
  const [formValue, setFormValue] = useState(intialValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const postData = async ({
    email,
    nama,
    program_studi,
    nim,
    password,
    role,
  }) => {
    try {
      setLoading(true);
      const res = await url.post("/user", {
        email,
        nama,
        program_studi,
        nim,
        password,
        role,
        updated_at: null,
        created_at: null,
        deleted_at: null,
      });
      if (res.status === 200) {
        console.log(res);
        feedbackHandler(true, "post");
        setLoading(false);
        setFormValue(intialValue);
        TriggerUser();
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      feedbackHandler(false, "post");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValue));
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValue);
      postData(formValue);
    }
  };

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    // name menjadi key dari value yang diinputkan
    setFormValue({ ...formValue, [name]: value });
  };
  return (
    <UserForm
      header="Add User Panel"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formErrors={formErrors}
      formValue={formValue}
      loading={loading}
    />
  );
};

export default UserTambah;
