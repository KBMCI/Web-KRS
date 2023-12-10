import { url } from "../../../../../api/url";

const getAllProgramStudi = async (token) => {
  try {
    const result = await url
      .get("/program-studi", {
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

export { getAllProgramStudi };
