import { url } from "../../../api/url";

const suggestion = async (token, id_kelas) => {
  try {
    const result = await url
      .post(
        "/planning-krs",
        {
          id_kelas,
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
  } catch (error) {}
};

export { suggestion };
