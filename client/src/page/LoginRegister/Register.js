import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import RegisterImg from "../../assets/RegisterImg.png";
import icon1Reg from "../../assets/icon_1_reg.svg";
import icon2Reg from "../../assets/icon_2_reg.svg";
import Dropdown from "./components/Dropdown";
import { url } from "../../api/url";
import Input from "./components/Input";
import Message from "../PlanningKrs/components/message/Message";
import Button from "../../component/button/Button";

const Register = () => {
  const [form, setForm] = useState({
    nama: "",
    nim: "",
    email: "",
    id_program_studi: 0,
    password: "",
    confirm_password: "",
  });

  const [password, setPassword] = useState("password");
  const [confirmPassword, setConfirmPassword] = useState("password");

  const [notif, setNotif] = useState({
    open: false,
    status: false,
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const [isRequired, setIsRequired] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(() => true);
    try {
      const result = await url.post("/user/register", JSON.stringify(form), {
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
        navigate("/login");
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
    <>
      <div className="min-h-screen w-full relative overflow-hidden">
        <div className="h-full w-full flex justify-center py-6 px-8 gap-20 relative z-20">
          {/* Bagian Kiri */}
          <div className="w-2/6 bg-blue rounded-2xl shadow-lg p-8 flex items-center justify-center">
            <img src={RegisterImg} alt="background register" />
          </div>
          {/* Bagian Kanan */}
          <div className="w-2/6 bg-secondary rounded-2xl shadow-lg flex flex-col items-center py-8 gap-6">
            <img alt="logo" src={Logo} className="w-16" />
            <h1 className="font-bold text-4xl">Yuk, Daftar Dulu!</h1>
            <form className="w-4/6 space-y-4" onSubmit={handleRegister}>
              <Input
                type={"text"}
                id={"nama"}
                name={"nama"}
                value={form.nama}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, nama: e.target.value }))
                }
                required={isRequired}
                placeholder={"Nama Lengkap"}
                icon={"material-symbols:person-2-outline-rounded"}
              />
              <Input
                type={"text"}
                id={"nim"}
                name={"nim"}
                value={form.nim}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, nim: e.target.value }))
                }
                required={isRequired}
                placeholder={"NIM"}
                icon={"material-symbols:credit-card-outline"}
              />
              <Input
                type={"email"}
                id={"email"}
                name={"email"}
                value={form.email}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
                required={isRequired}
                placeholder={"Email"}
                icon={"material-symbols:alternate-email"}
              />
              <div className="relative">
                <Dropdown
                  setProgram_studi={setForm}
                  name="program_studi"
                  id="program_studi"
                  required={isRequired}
                  value={form.id_program_studi}
                />
              </div>
              <Input
                type={password}
                id={"password"}
                name={"password"}
                value={form.password}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, password: e.target.value }))
                }
                required={isRequired}
                placeholder={"Password"}
                icon={"material-symbols:lock-outline"}
                password={true}
                setType={setPassword}
              />
              <Input
                type={confirmPassword}
                id={"confirm_password"}
                name={"confirm_password"}
                value={form.confirm_password}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    confirm_password: e.target.value,
                  }))
                }
                required={isRequired}
                placeholder={"Konfirmasi Password"}
                icon={"material-symbols:lock-outline"}
                password={true}
                setType={setConfirmPassword}
              />
              <Button
                type={"submit"}
                loading={loading}
                onClick={toggleRequired}
                className={"bg-primary w-full h-12 text-secondary focus:outline-primary"}
              >
                Register
              </Button>
              <div className="flex justify-center mt-4 space-x-1">
                <p className="text-neutral-400">Sudah mempunyai akun?</p>
                <p className="text-primary focus:outline-primary">
                  <Link to="/login">Login</Link>
                </p>
              </div>
            </form>
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
    </>
  );
};

export default Register;
