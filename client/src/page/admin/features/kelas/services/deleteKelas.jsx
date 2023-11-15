import { url } from "../../../../../api/url";

const deleteKelas = async (token, id_kelas) => {
  try {
    const result = await url
      .delete(`/kelas/${id_kelas}`, {
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

export { deleteKelas };
