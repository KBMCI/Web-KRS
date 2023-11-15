import { url } from "../../../../../api/url";

const deleteUser = async (token, id_user) => {
  try {
    const result = await url
      .delete(`/user/${id_user}`, {
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

export { deleteUser };
