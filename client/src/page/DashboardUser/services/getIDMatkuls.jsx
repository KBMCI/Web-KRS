import { url } from "../../../api/url";

const getIDMatkuls = async (token) => {
  try {
    const response = await url
      .get("/user/matkul", { headers: { Authorization: `Bearer ${token}` } })
      .then((result) => {
        const getIDFromResponse = result.data.data.matkuls.map((item) => ({
          ID: item.id,
        }));
        return getIDFromResponse;
      })
      .catch((result) => {
        return result;
      });
    return response;
  } catch (errror) {}
};

export { getIDMatkuls };
