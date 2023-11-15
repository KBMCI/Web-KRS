import { url } from "../../../../../api/url";

const createFakultas = async (token, fakultas) => {
  try {
    const result = await url
      .post(
        "/fakultas",
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

export { createFakultas };
