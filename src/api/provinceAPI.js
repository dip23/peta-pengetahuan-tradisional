import Api from "./api";

const provinceAPI = {
  getProvinces() {
    return Api.get('/provinsi');
  },
  getAllDataProvinces() {
    return Api.get('/provinsi/totalBudaya');
  }
};

export default provinceAPI;