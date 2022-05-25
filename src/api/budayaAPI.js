import Api from "./api";

const budayaAPI = {
  getAllBudaya() {
    return Api.get('/budaya');
  },
  getListBudaya(provinceId) {
    return Api.get(`/budaya/list/${provinceId}`);
  },
  getDetailBudaya(idBudaya) {
    return Api.get(`/budaya/${idBudaya}`)
  }
};

export default budayaAPI;