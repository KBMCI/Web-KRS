import { url } from "../../../api/url";

const userHasMatkul = async (token) => {
  try {
    const result = await url
      .get("/user/matkul", {
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

export { userHasMatkul };
