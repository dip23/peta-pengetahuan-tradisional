import * as yup from 'yup';

export const formBudayaSchema = yup.object().shape({
  nama_budaya: yup.string().required('Nama Kebudayaan Wajib diisi'),
  tahun: yup.number().required('Tahun wajib diisi'),
  jenis_budaya: yup.string().required('Jenis Kebudayaan Wajib diisi'),
  idProvinsi: yup.string().required('Provinsi Wajib diisi'),
  desc: yup.string()
})