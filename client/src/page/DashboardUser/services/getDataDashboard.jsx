import { url } from "../../../api/url";

const getDataDashboard = async (token) => {
  try {
    const response = await url
      .get("/dashboard", { headers: { Authorization: `Bearer ${token}` } })
      .then((result) => {
        console.log("Dijalankan");
        return result;
      })
      .catch((result) => {
        return result;
      });
    return response;
  } catch (error) {}
};

export { getDataDashboard };
