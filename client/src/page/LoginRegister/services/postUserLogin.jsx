import { url } from "../../../api/url";
import { getAllJamKelas } from "./getAllJamKelas";

const postUserLogin = async (email, password, setErrMsg, setNotSuccess) => {
  try {
    const response = await url
      .post("/user/login", JSON.stringify({ email, password }))
      .then(async (result) => {
        const res = await getAllJamKelas(result.data.data.token);
        return result;
      })
      .catch((err) => {
        console.log(err);
        setErrMsg(err.response.message);
        setNotSuccess(true);
        if (err.response.status === 400) {
          setErrMsg("Invalid Email or Password");
          setTimeout(() => {
            setNotSuccess(false);
          }, 5000);
        }
        return err;
      });
    return response;
  } catch (err) {}
};

export { postUserLogin };
