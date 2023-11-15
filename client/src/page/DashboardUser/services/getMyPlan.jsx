import { url } from "../../../api/url";

const getMyPlan = async (token, setIsFilled) => {
  try {
    const response = await url
      .get("/my-plan", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setIsFilled(true);
        return result;
      })
      .catch((result) => {
        return result;
      });
    return response;
  } catch (error) {}
};

export { getMyPlan };
