import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import FormBudaya from '../../components/fragments/FormBudaya';
import style from './styles.module.css';
import { routes } from '../../configs/routes';
import Alert from '../../components/elements/Alert';
import budayaAPI from '../../api/budayaAPI';

export default function AddBudaya() {
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const submitForm = async (data) => {
    const dataForm = {
      nama_budaya: data.nama_budaya,
      image: data.image || '',
      tahun: data.tahun,
      desc: data.desc,
      video: data.video || '',
      JenisBudayaId: parseInt(data.jenis_budaya),
      ProvinsiId: parseInt(data.idProvinsi)
    }
    console.log(dataForm);
    try {
      const res = await budayaAPI.addData(dataForm);
      if (res.data.success) {
        navigate(routes.ADMIN());
        setAlert(false);
      }
    } catch (error) {
      setMessage(error.response.data.message)
      setAlert(true);
    }
  };

  return (
    <div className={style.root}>
      <p>Tambah Data Pengetahuan Tradisional</p>
      {alert && (
        <Alert className={style.alert} message={message} />
      )}
      <FormBudaya handleSubmitForm={submitForm} />
    </div>
  )
}
