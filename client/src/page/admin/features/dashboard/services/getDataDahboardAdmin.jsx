import { url } from "../../../../../api/url";

const getDataDashboardAdmin = async (token) => {
  try {
    const result = url
      .get(`/admin/dashboard`, {
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

export { getDataDashboardAdmin };
