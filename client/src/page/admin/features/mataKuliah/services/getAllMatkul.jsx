import { url } from "../../../../../api/url";

const getAllMatkul = async (token) => {
  try {
    const result = await url
      .get("/matkul", {
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

export { getAllMatkul };
