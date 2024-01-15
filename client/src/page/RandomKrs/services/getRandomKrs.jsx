import { url } from "../../../api/url";

const getRandomKrs = async (token, urlParameterWaktu, urlParameterKelas) => {
  try {
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        jadwal: urlParameterWaktu,
        kelas: urlParameterKelas,
      },
    };
    const response = await url
      .get("/random-krs", config)
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

export { getRandomKrs };
