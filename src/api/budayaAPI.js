import Api from "./api";

const budayaAPI = {
  getAllBudaya() {
    return Api.get('/budaya');
  },
  getBudayaPage(limit, page) {
    return Api.get(`/budaya/all?limit=${limit}&page=${page}`, {withCredentials: true});
  },
  getListBudaya(provinceId) {
    return Api.get(`/budaya/list/${provinceId}`);
  },
  getDetailBudaya(idBudaya) {
    return Api.get(`/budaya/${idBudaya}`)
  },
  deleteBudaya(idBudaya) {
    return Api.delete(`/budaya/${idBudaya}`)
  },
  addData(data) {
    return Api.post(`/budaya`, data)
  },
  editBudaya(idBudaya, data) {
    console.log('edit')
    return Api.put(`/budaya/${idBudaya}`, data)
  }
};

export default budayaAPI;