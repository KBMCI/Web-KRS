import { url } from "../../../api/url";

const postUserMatkul = async (token, selectedIdMatkul) => {
  try {
    const response = await url
      .post(
        "/user/matkul",
        {
          matkuls: selectedIdMatkul,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        return result;
      })
      .catch((result) => {
        return result;
      });
    return response;
  } catch (err) {
    return err;
  }
};

export default postUserMatkul;
