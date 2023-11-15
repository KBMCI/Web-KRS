import { url } from "../../../../../api/url";

const createUser = async (token, user) => {
  try {
    const result = await url
      .post(
        "/user/register/admin",
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

export { createUser };
