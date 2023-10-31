import { Icon } from "@iconify/react";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Eyes_close from "../../assets/Eyes_close.svg";
import Eyes_open from "../../assets/Eyes_open.svg";
import LoginImg from "../../assets/LoginImg.png";
import Logo from "../../assets/Logo.png";
import AuthContext from "../../context/AuthContext";
import Error from "./Error";
import Success from "./Success";

const Login = () => {
  const [password, setPassword] = useState("User123.");
  const [email, setEmail] = useState("user@gmail.com");
  const [type, setType] = useState("password");
  const [errMsg, setErrMsg] = useState("");
  const [notSuccess, setNotSuccess] = useState(false);
  const [success, setSuccess] = useState(false);
  const errRef = useRef();
  const navigate = useNavigate();
  // Set Auth berasal dari AuthContext.js
  const { auth, setAuth } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/user/login",
        JSON.stringify({ email, password })
      );
      console.log("INI RESPONSENYA");
      console.log(response);
      console.log(response.data.data.token);
      const dataUser = response.data.data.data;
      const id = dataUser.ID;
      const nama = dataUser.nama;
      const nim = dataUser.nim;
      const program_studi = dataUser.program_studi;
      const role = dataUser.role;

      setAuth({ id, email, nama, nim, program_studi, role });

      // ambil token
      const accessToken = response.data.data.token;
      // Simpan token pada localStorage
      localStorage.setItem("Authorization", accessToken);
      localStorage.setItem("role", role);
      setSuccess(true);

      if (role === "admin") {
        setTimeout(() => {
          setSuccess(false);
          navigate("/admin");
        }, 3100);
      } else {
        setTimeout(() => {
          console.log(`000000000000000000000000000`);
          setSuccess(false);
          navigate("/");
        }, 3100);
      }

      console.log(`000000000000000000000000000`);
    } catch (err) {
      console.log("error dijalankan");
      setErrMsg(err.response.message);
      setNotSuccess(true);
      if (err.response.status === 400) {
        setErrMsg("Invalid Email or Password");
        setTimeout(() => {
          setNotSuccess(false);
        }, 5000);
      }
      console.log(email);
      console.log(err.response.status);
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
      return <img src={Eyes_close} alt="" width="24" />;
    } else {
      return <img src={Eyes_open} alt="" width="24" />;
    }
  };

  // const logout = () => {
  //   localStorage.removeItem("Authorization");
  // };

  useEffect(() => {
    console.log(email);
    console.log(errMsg);
  }, [email, password]);

  const iconStyle = () => {
    return `${
      notSuccess ? `text-error` : `text-neutral-400 `
    } absolute top-1 right-4 translate-y-3`;
  };

  return (
    <div className="bg-[#F3F7FF] h-screen w-full flex items-center justify-center gap-20">
      {/* Kiri */}
      <div className="bg-blue flex items-center justify-center rounded-2xl shadow-lg p-8 ">
        <img src={LoginImg} alt="bg-login" className="object-cover w-full h-full object-center"/>
      </div>
      {/* Kanan */}
      <div className=" bg-secondary flex flex-col items-center justify-center rounded-2xl shadow-lg z-10 p-10">
        <img
          src={Logo}
          width="67px"
          alt="bg-login"
        />
        <div className="w-[351px] h-full">
          <h1 className="font-bold text-5xl flex justify-center mb-[14px]">
            Aloo!
          </h1>
          <p className="text-neutral-400 font-normal text-[15px] text-center">
            Login dulu ya, Sobat! Silakan masukan email dan password terdaftar
            kamu.
          </p>
        </div>
        <div className="mt-[39px] w-[350px] h-full">
          <form onSubmit={handleLogin} className="flex flex-col" action="">
            <div className="relative">
              <input
                className={`h-[56px] rounded-xl shadow-lg w-full py-[17px] pl-[16px] mb-[20px] ... 
                invalid:border-error 
                focus:invalid:border-error
                focus:invalid:ring-error ${notSuccess ? `border-error` : ``}`}
                type="email"
                id="email"
                name="email"
                value={email}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
              />
              <Icon
                icon="material-symbols:alternate-email"
                width="24"
                className={` ${iconStyle()}`}
              />
            </div>
            <div className="relative">
              <input
                className={`h-[56px] rounded-xl shadow-lg w-full py-[17px] pl-[16px] mb-[12px] ${
                  notSuccess ? `border-error` : ``
                }`}
                type={type}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
              {password ? (
                <div
                  onClick={handleType}
                  className="absolute right-[18px] top-4"
                >
                  {eyes()}
                </div>
              ) : (
                <Icon
                  icon="material-symbols:lock-outline"
                  width="24"
                  className={iconStyle()}
                />
              )}
            </div>
            <div className="flex flex-row justify-between mb-[32px]">
              <div className="">
                <input className="" type="checkbox" name="rememberme" />
                <label
                  className="text-neutral-400 font-semibold text-[13px] ml-[4px]"
                  htmlFor="rememberme"
                >
                  Remember Me
                </label>
              </div>
              <p className="text-primary font-semibold text-[13px] mr-[10px]">
                Lupa Password
              </p>
            </div>
            <button className="bg-primary rounded-xl font-bold text-base text-secondary h-[56px] mb-[24px]">
              Login
            </button>
          </form>
          <div className="flex justify-center">
            <p className="text-neutral-400 text-[15px]">
              Belum mempunyai akun?{" "}
            </p>
            <p className="text-primary text-[15px]" href="">
              <Link to="/register"> &nbsp;Register</Link>
            </p>
          </div>
        </div>
      </div>
      <Success isOpen={success}></Success>
      {success ? <>{/* <Success isOpen={success}></Success> */}</> : ""}
      {notSuccess ? <Error errmsg={errMsg}></Error> : ""}
    </div>
  );
};

export default Login;
