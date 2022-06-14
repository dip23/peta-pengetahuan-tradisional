import Api from "./api";

const calculationAPI = {
  getAllCalculate(n) {
    return Api.get(`/total/${n}`);
  },
};

export default calculationAPI;