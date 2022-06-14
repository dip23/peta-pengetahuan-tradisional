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
}