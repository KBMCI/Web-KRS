import { url } from "../../../../../api/url";

const editKelas = async (token, kelas, id_kelas, id_jadwal) => {
  try {
    const result = await url
      .patch(
        `/kelas/${id_kelas}/jadwal/${id_jadwal}`,
        {
          ...kelas,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
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

export { editKelas };
