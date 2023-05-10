import axios from "axios";
import { useContext, useState } from "react";
import Button from "../../component/Button";
import AuthContext from "../../context/AuthContext";

const PlanningKrs = () => {
  const [password, setPassword] = useState("Admin123.");
  const [email, setEmail] = useState("admin@gmail.com");
  // Set Auth berasal dari AuthContext.js
  const { auth, setAuth} = useContext(AuthContext)

  const login = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/user/login",
        JSON.stringify({ email, password })
      );
      console.log("INI RESPONSENYA");
      console.log(response);
      console.log(response.data.data.token)
      // ambil token
      const accessToken = response.data.data.token
      // Simpan token pada localStorage
      localStorage.setItem('Authorization', accessToken)
    } catch (err) {
      console.log(email);
      console.log(err.response.data);
    }
  };

  const logout = () => {
    localStorage.removeItem("Authorization");
  }

  return (
    <>
      <div onClick={login}>
        <Button name="Log In"></Button>
      </div>
      <div onClick={logout}>
        <Button name="Logout"></Button>
      </div>
      <h1>AKU MAU COBA LOGIN AH</h1>
    </>
  );
};

export default PlanningKrs;
