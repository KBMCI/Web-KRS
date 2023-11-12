import { url } from "../../../api/url";

const getAllProgramStudi = async () => {
  try {
    const response = await url
      .get("/program-studi")
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        return err;
      });
    return response;
  } catch {}
};

export default getAllProgramStudi;
