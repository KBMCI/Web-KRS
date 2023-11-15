import { url } from "../../../../../api/url";

const getAllKelas = async (token) => {
  try {
    const result = await url
      .get("/kelas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        return result;
      })
      .catch((result) => {
        return result;
      });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { getAllKelas };
