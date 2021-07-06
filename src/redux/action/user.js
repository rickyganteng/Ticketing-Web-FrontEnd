import axiosApiIntances from "../../utils/axios";

export const updateProfile = (data) => {
  return {
    type: "UPDATE",
    payload: axiosApiIntances.post("user", data),
  };
};

export const getOrderHistory = (id) => {
  return {
    type: "ORDER_HISTORY",
    payload: axiosApiIntances.get(`booking/user-book?userId=${id}`),
  };
};
