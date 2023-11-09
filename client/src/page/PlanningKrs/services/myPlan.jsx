import { url } from "../../../api/url";

const getMyPlan = async (token) => {
  try {
    const result = await url
      .get("/my-plan", {
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

const postMyPlan = async (token, id_kelas) => {
  try {
    const result = await url
      .post(
        "/my-plan",
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
  } catch (error) {
    console.log(error);
  }
};

const patchMyPlan = async (token, id_kelas, id_plan) => {
  try {
    const result = await url
      .patch(
        `my-plan/${id_plan}`,
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

export { getMyPlan, postMyPlan, patchMyPlan };
