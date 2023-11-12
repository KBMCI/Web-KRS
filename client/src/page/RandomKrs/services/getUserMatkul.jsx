import { url } from "../../../api/url";

const getUserMatkul = async (token) => {
  try {
    const response = await url
      .get("/user/matkul", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((result) => {
        return result;
      });
    return response;
  } catch (err) {}
};

export { getUserMatkul };
