import { url } from "../../../api/url";

const getMyPlan = async (token) => {
  try {
    const response = await url
      .get("/my-plan", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        return result;
      })
      .catch((result) => {
        return result;
      });
    return response;
  } catch (error) {}
};

export { getMyPlan };
