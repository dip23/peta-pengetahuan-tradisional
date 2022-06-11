import Api from "./api";

const calculationAPI = {
  getAllCalculate() {
    return Api.get('/total');
  },
};

export default calculationAPI;