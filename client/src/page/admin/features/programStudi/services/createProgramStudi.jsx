import { url } from "../../../../../api/url";

const createProgramStudi = async (token, programStudi) => {
  try {
    const result = await url
      .post(
        "/program-studi",
        {
          id_fakultas: parseInt(programStudi.id_fakultas),
          nama: programStudi.nama,
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

export { createProgramStudi };
