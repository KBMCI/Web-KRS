import { url } from "../../../../../api/url";

const getAllFakultas = async (token) => {
  try {
    const result = await url
      .get("/fakultas", {
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

export { getAllFakultas };
