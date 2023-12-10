import { url } from "../../../api/url";

const postUserRegister = async ({
  nama,
  nim,
  email,
  password,
  confirm_password,
  program_studi,
}) => {
  try {
    const response = await url
      .post(
        "/user/register",
        JSON.stringify({
          nama,
          nim,
          email,
          password,
          confirm_password,
          id_program_studi: program_studi,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
    return response;
  } catch {}
};

export { postUserRegister };
