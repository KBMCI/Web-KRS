import { url } from "../../../../../api/url";

const createKelas = async (token, kelas) => {
  try {
    const result = await url
      .post(
        "/kelas",
        {
          ...kelas,
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

export { createKelas };
