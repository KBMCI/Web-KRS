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
        window.alert(
          "Mata kuliah anda sudah dipilih untuk diproses dalam Random Krs"
        );
        console.log(selectedIdMatkul);
        return result;
      })
      .catch((result) => {
        return result;
      });
    return response;
  } catch {}
};

export default postUserMatkul;
