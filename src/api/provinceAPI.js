import Api from "./api";

const provinceAPI = {
  getProvinces() {
    return Api.get('/provinsi');
  }
};

export default provinceAPI;