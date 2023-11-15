import { url } from "../../../../../api/url";

const editFakultas = async (token, fakultas, id_fakultas) => {
  try {
    const result = await url
      .patch(
        `/fakultas/${id_fakultas}`,
        {
          ...fakultas,
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

export { editFakultas };
