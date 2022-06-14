import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email().required('Email wajib diisi'),
  password: yup.string().required('Password wajib diisi')
})