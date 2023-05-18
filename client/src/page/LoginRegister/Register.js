import { Icon } from "@iconify/react";
import axios from "axios";
import { useState } from "react";
import Eyes_close from "../../assets/Eyes_close.svg";
import Eyes_open from "../../assets/Eyes_open.svg";
import Logo from "../../assets/Logo.png";
import RegisterImg from "../../assets/RegisterImg.png";
import Error from "./Error";
import Success from "./Success";
import { Link , useNavigate} from "react-router-dom";

const Register = () => {
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [program_studi, setProgram_studi] = useState("");
  const [role, setRole] = useState("user");
  const [type, setType] = useState("password");
  const [notSuccess, setNotSuccess] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const respone = await axios.post(
        "http://localhost:8080/user/register",
        JSON.stringify({
          nama,
          nim,
          email,
          password,
          confirm_password,
          program_studi,
          role,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("BERHASIL");
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/login");
      }, 4000);
    } catch (err) {
      setNotSuccess(true);
      setTimeout(() => {
        setNotSuccess(false);
      }, 4000);
      setErrMsg(err.response.data.message);
      console.log(err.response.data);
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

  const InputText = () => {
    return "h-[56px] rounded-xl shadow-lg w-full py-[17px] pl-[16px] mb-[24px]";
  };

  const iconStyle = () => {
    return "text-neutral-400 absolute top-1 right-4 translate-y-3";
  };

  return (
    <div className="bg-[#F3F7FF] h-full w-full flex items-center justify-center gap-[58px]">
      {/* Kiri */}
      <div className="bg-blue w-50 flex items-center justify-center rounded-2xl shadow-lg h-[864px] w-[530px]">
        <img src={RegisterImg} width={590} height={590}></img>
      </div>
      {/* Kanan */}
      <div className="bg-secondary w-50 flex flex-col items-center justify-center rounded-2xl shadow-lg h-auto w-[530px] my-[80px]">
        <img
          className="mx-[231px] mt-[44px] mb-[20px]"
          src={Logo}
          width="67px"></img>
        <div className="w-[380px] h-[65px] mx-[75px] mb-[32px] text-center">
          {/* ini harusnya 5xl tapi kegedean */}
          <h1 className="font-bold text-4xl">Yuk, Daftar Dulu!</h1>
        </div>
        <div className="w-[350px] h-[588px] mx-[90px] mb-[48px]">
          <form onSubmit={handleRegister} className="flex flex-col" action="">
            <div className="relative">
              <input
                className="h-[56px] rounded-xl shadow-lg w-full py-[17px] pl-[16px] mb-[24px]"
                type="text"
                id="nama"
                name="nama"
                value={nama}
                autoComplete="off"
                onChange={(e) => setNama(e.target.value)}
                required
                placeholder="Nama Lengkap"
              />
              <Icon
                icon="material-symbols:person-2-outline-rounded"
                width={24}
                className={iconStyle()}
              />
            </div>
            <div className="relative">
              <input
                className={InputText()}
                type="text"
                id="nim"
                name="nim"
                value={nim}
                autoComplete="off"
                onChange={(e) => setNim(e.target.value)}
                required
                placeholder="NIM"
              />
              <Icon
                icon="material-symbols:credit-card-outline"
                width="24"
                className={iconStyle()}
              />
            </div>
            <div className="relative">
              <input
                className={InputText()}
                type="text"
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
                className={iconStyle()}
              />
            </div>
            <div className="relative">
              <input
                className={InputText()}
                type="text"
                id="program_studi"
                name="program_studi"
                value={program_studi}
                onChange={(e) => setProgram_studi(e.target.value)}
                required
                placeholder="Program Studi"
              />
              <Icon
                icon="fluent:building-24-regular"
                width="24"
                className={iconStyle()}
              />
            </div>
            <div className="relative">
              <input
                className={InputText()}
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
                  className="absolute right-[18px] top-4">
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
            <div className="relative">
              <input
                className={InputText()}
                type={type}
                id="confirm_password"
                name="confirm_password"
                value={confirm_password}
                onChange={(e) => setConfirm_password(e.target.value)}
                required
                placeholder="Konfirmasi Ulang Password"
              />

              {password ? (
                <div
                  onClick={handleType}
                  className="absolute right-[18px] top-4">
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

            <button className="bg-primary rounded-xl font-bold text-base text-secondary h-[56px] p-[16px] mb-[24px] mt-[8px]">
              Register
            </button>
          </form>
          <div className="flex justify-center">
            <p className="text-neutral-400 text-[15px]">
              Sudah mempunyai akun?{" "}
            </p>
            <a className="text-primary text-[15px]" href=""><Link to='/login'> &nbsp;Login</Link>
             
            </a>
          </div>
        </div>

        {success ? <Success></Success> : ""}
        {notSuccess ? <Error errmsg={errMsg}></Error> : ""}
      </div>
    </div>
  );
};

export default Register;
