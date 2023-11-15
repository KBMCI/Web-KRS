import { url } from "../../../../../api/url";

const getFakultasById = async (token, id_fakultas) => {
  try {
    const result = url
      .get(`/fakultas/${id_fakultas}`, {
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

export { getFakultasById };
