import { url } from "../../../api/url";

const getAllJamKelas = async (token) => {
  try {
    const response = await url
      .get("/jam-kelas", { headers: { Authorization: `${token}` } })
      .then((result) => {
        console.log(result);
        localStorage.setItem("JamKelas", JSON.stringify(result.data.data));
        return result;
      })
      .catch((result) => {
        return result;
      });
    return response;
  } catch (err) {}
};

export { getAllJamKelas };
