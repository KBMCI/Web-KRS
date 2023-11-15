import { url } from "../../../../../api/url";

const editUser = async (token, user, id_user) => {
  try {
    const result = await url
      .patch(
        `/user/${id_user}`,
        {
          ...user,
          id_program_studi: parseInt(user.id_program_studi),
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

export { editUser };
