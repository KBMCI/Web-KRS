import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import Button from "../../component/Button";
import AuthContext from "../../context/AuthContext";

const PlanningKrs = () => {
  const [password, setPassword] = useState("Admin123.");
  const [email, setEmail] = useState("admin@gmail.com");
  const [type, setType] = useState("password");
  const [errMsg, setErrMsg] = useState('')
  const errRef = useRef()
  // Set Auth berasal dari AuthContext.js
  const { auth, setAuth } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        "http://localhost:8080/user/login",
        JSON.stringify({ email, password })
      );
      console.log("INI RESPONSENYA");
      console.log(response);
      console.log(response.data.data.token);
      // ambil token
      const accessToken = response.data.data.token;
      // Simpan token pada localStorage
      localStorage.setItem("Authorization", accessToken);
    } catch (err) {
      console.log("error dijalankan")
      setErrMsg(err.response.message)
      if ( err.response.status === 400) {
        setErrMsg("Invalid Email or Password")
      }
      console.log(email);
      console.log(err.response.status);
      errRef.current.focus()
    }
    
  };

  const handleType = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }

   
  };

  const eyes = () => {
    if (type === "password") {
      return (
        <img src="https://pic.onlinewebfonts.com/svg/img_301914.png" alt="" className="h-10"/>
      );
    } else {
      return (
        <img src="https://pic.onlinewebfonts.com/svg/img_301914.png" alt="" className="h-10"/>
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("Authorization");
  };

 useEffect(()=>{
  console.log(email)
  console.log(errMsg)
  setErrMsg('')
 },[email, password])

  return (
    <>
   
      <div >
        <form onSubmit={handleLogin} className="flex flex-col">
          <div className="flex flex-col">
          <label htmlFor="email" className="">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            required
            className=""
          />
          <div>

          </div>
          <label htmlFor="password" className="">
            Password
          </label>
          <input
            type={type}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className=""
          />
          <div className="absolute right-3 mt-20">
            <div onClick={handleType}>{eyes()}</div>
          </div>
          </div>
          <button>PENCET</button>
          {/* <Button name="Log In"></Button> */}
        </form>
        <p ref={errRef} className={errMsg ? 'errmsg' : "offscreen"} aria-live="assertive">{errMsg}</p>
      </div>
      <div onClick={handleLogin}>
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
