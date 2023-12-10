import { url } from "../../../../../api/url";

const deleteProgramStudi = async (token, id_program_studi) => {
  try {
    const result = await url
      .delete(`/program-studi/${id_program_studi}`, {
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

export { deleteProgramStudi };
