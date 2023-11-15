import { url } from "../../../../../api/url";

const getUserById = async (token, id_user) => {
  try {
    const result = url
      .get(`/user/${id_user}`, {
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

export { getUserById };
