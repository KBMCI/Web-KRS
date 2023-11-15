import { url } from "../../../../../api/url";

const getAllUser = async (token) => {
  try {
    const result = await url
      .get("/user", {
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

export { getAllUser };
