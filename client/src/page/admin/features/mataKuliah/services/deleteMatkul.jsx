import { url } from "../../../../../api/url";

const deleteMatkul = async (token, id_matkul) => {
  try {
    const result = await url
      .delete(`/matkul/${id_matkul}`, {
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

export { deleteMatkul };
