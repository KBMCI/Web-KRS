import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginImg from "../../assets/LoginImg.png";
import Logo from "../../assets/Logo.png";
import AuthContext from "../../context/AuthContext";
import icon1Reg from "../../assets/icon_1_reg.svg";
import icon2Reg from "../../assets/icon_2_reg.svg";
import { url } from "../../api/url";
import Input from "./components/Input";
import Message from "../PlanningKrs/components/message/Message";
import { getAllJamKelas } from "./services/getAllJamKelas";
import Button from "../../component/button/Button";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [notif, setNotif] = useState({
    open: false,
    status: false,
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("password");
  const navigate = useNavigate();
  // Set Auth berasal dari AuthContext.js
  const [isRequired, setIsRequired] = useState(false);
  const { setAuth } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await url.post("/user/login", JSON.stringify(form), {
        headers: { "Content-Type": "application/json" },
      });

      if (result?.response?.data) {
        setNotif(() => ({
          open: true,
          status: false,
          message: result.response.data.message,
        }));

        setTimeout(() => {
          setLoading(() => false);
          setNotif((prev) => ({
            ...prev,
            open: false,
          }));
        }, 2000);
        return;
      }

      await getAllJamKelas(result.data.data.token);

      const dataUser = result.data.data.user;
      const role = dataUser.role;

      setAuth({
        id: dataUser.id,
        email: form.email,
        nama: dataUser.nama,
        nim: dataUser.nim,
        program_studi: dataUser.program_studi,
        role: dataUser.role,
      });

      // ambil token
      const accessToken = result.data.data.token;
      // Simpan token pada localStorage
      localStorage.setItem("Authorization", accessToken);
      localStorage.setItem("role", role);

      const profileObject = {
        id: dataUser.id,
        nama: dataUser.nama,
        nim: dataUser.nim,
        program_studi: dataUser.program_studi,
      };
      localStorage.setItem("Profile", JSON.stringify(profileObject));

      setNotif(() => ({
        open: true,
        status: true,
        message: result.data.message,
      }));

      setTimeout(() => {
        setLoading(() => false);
        setNotif((prev) => ({
          ...prev,
          open: false,
        }));
      }, 1500);

      setTimeout(() => {
        if (role === "admin") navigate("/admin");
        else navigate("/");
      }, 2000);
    } catch (err) {
      setNotif(() => ({
        open: true,
        status: false,
        message: err.response.data.message,
      }));

      setTimeout(() => {
        setLoading(() => false);
        setNotif((prev) => ({
          ...prev,
          open: false,
        }));
      }, 2000);
    }
  };

  const toggleRequired = () => {
    if (isRequired === true) {
      setIsRequired(true);
    } else {
      setIsRequired(!isRequired);
    }
  };

  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <div className="h-screen w-full relative overflow-hidden">
      <div className="h-full w-full flex justify-center py-6 px-8 gap-20 relative z-20">
        {/* Kiri */}
        <div className="w-2/6 bg-blue rounded-2xl shadow-lg p-8 flex items-center justify-center">
          <img src={LoginImg} alt="background login" />
        </div>
        {/* Kanan */}
        <div className="w-2/6 bg-secondary rounded-2xl shadow-lg flex flex-col items-center py-8 space-y-6">
          <img alt="logo" src={Logo} className="w-16" />
          <div className="mt-10 w-4/6 flex flex-col justify-center gap-4">
            <h1 className="font-bold text-4xl text-center">Aloo!</h1>
            <p className="text-neutral-400 font-normal text-[15px] text-center">
              Login dulu ya, Sobat! Silakan masukan email dan password terdaftar
              kamu.
            </p>
          </div>
          <form onSubmit={handleLogin} className="w-4/6 space-y-4 mt-6">
            <Input
              type={"email"}
              id={"email"}
              name={"email"}
              value={form.email}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder={"Email"}
              required={isRequired}
              icon={"material-symbols:alternate-email"}
            />
            <Input
              type={type}
              id={"password"}
              name={"password"}
              value={form.password}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, password: e.target.value }))
              }
              placeholder={"Password"}
              password={true}
              required={isRequired}
              icon={"material-symbols:lock-outline"}
              setType={setType}
            />
            <div className="flex flex-row justify-between items-center pt-2 pb-4">
              <div className="flex items-center gap-2">
                <input type="checkbox" name="rememberme" className="block" />
                <label
                  className="text-neutral-400 font-semibold text-sm"
                  htmlFor="rememberme"
                >
                  Remember Me
                </label>
              </div>
              <p className="text-primary font-semibold text-[13px] mr-[10px]">
                Lupa Password
              </p>
            </div>
            <Button
              type={"submit"}
              loading={loading}
              onClick={toggleRequired}
              className={`w-full bg-primary h-12 text-secondary`}
            >
              Login
            </Button>
          </form>
          <div className="flex justify-center">
            <p className="text-neutral-400 text-[15px]">
              Belum mempunyai akun?
            </p>
            <p className="text-primary text-[15px]" href="">
              <Link to="/register"> &nbsp;Register</Link>
            </p>
          </div>
        </div>
      </div>
      {/* Message */}
      <Message
        open={notif.open}
        statusMsg={notif.status}
        textMsg={notif.message}
      />
      {/* icon */}
      <div className="absolute right-0 top-0 w-[28rem]">
        <img
          src={icon1Reg}
          alt="icon"
          className="object-cover w-full h-full object-center"
        />
      </div>

      <div className="absolute left-20 -bottom-10 w-64">
        <img
          src={icon2Reg}
          alt="icon"
          className="object-cover w-full h-full object-center"
        />
      </div>
    </div>
  );
};

export default Login;
