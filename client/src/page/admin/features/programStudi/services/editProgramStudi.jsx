import { url } from "../../../../../api/url";

const editProgramStudi = async (token, programStudi, id_program_studi) => {
  try {
    const result = await url
      .patch(
        `/program-studi/${id_program_studi}`,
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

export { editProgramStudi };
