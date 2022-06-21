export const routes = {
  LANDING_PAGE: () => {
    return `/`;
  },
  LIST_BUDAYA: (idProvinsi) => {
    return `?id=${idProvinsi}`
  },
  DETAIL_BUDAYA: (idBudaya) => {
    return `?idBudaya=${idBudaya}`
  },
  ADMIN: () => {
    return `/admin`;
  },
  LOGIN: () => {
    return `/login`;
  },
  ADD_BUDAYA: () => {
    return `/admin/addBudaya`;
  },
  EDIT_BUDAYA: (id) => {
    return `/admin?editBudaya=true&id=${id}`
  }
}