import { url } from "../../../../../api/url";

const deleteFakultas = async (token, id_fakultas) => {
  try {
    const result = await url
      .delete(`/fakultas/${id_fakultas}`, {
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

export { deleteFakultas };
