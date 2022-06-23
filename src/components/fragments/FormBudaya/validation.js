import * as yup from 'yup';

const date = new Date();
const yearToday = date.getFullYear();

export const formBudayaSchema = yup.object().shape({
  nama_budaya: yup.string().required('Nama Kebudayaan Wajib diisi'),
  tahun: yup.number().min(2010).max(yearToday, 'Tahun melebihi tahun pendaftaran').required('Tahun wajib diisi'),
  jenis_budaya: yup.string().required('Jenis Kebudayaan Wajib diisi'),
  desc: yup.string()
})