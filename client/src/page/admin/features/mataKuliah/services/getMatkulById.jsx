import { url } from "../../../../../api/url";

const getMatkulById = async (token, id_matkul) => {
  try {
    const result = url
      .get(`/matkul/${id_matkul}`, {
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

export { getMatkulById };
