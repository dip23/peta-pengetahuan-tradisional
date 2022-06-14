import Api from "./api";

const adminAPI = {
  login(data) {
    return Api.post(`/admin/login`, data);
  },
  logout() {
    return Api.post(`/admin/logout`);
  },
};

export default adminAPI;