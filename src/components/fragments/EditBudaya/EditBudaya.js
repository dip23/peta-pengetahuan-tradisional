import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import budayaAPI from '../../../api/budayaAPI';
import { routes } from '../../../configs/routes';
import Alert from '../../elements/Alert';
import FormBudaya from '../FormBudaya';
import style from './styles.module.css';

export default function EditBudaya({ data }) {
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get('id'));
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitForm = async (data) => {
    const formData = new FormData();
    formData.append('nama_budaya', data.nama_budaya);
    formData.append('image', data.image ? data.image[0] : undefined);
    formData.append('tahun', data.tahun);
    formData.append('desc', data.desc);
    formData.append('video', data.video || '')    
    formData.append('ProvinsiId', parseInt(data.idProvinsi));

    try {
      setLoading(true);
      const res = await budayaAPI.editBudaya(id, formData);
      if (res.data.success) {
        setLoading(false);
        navigate(routes.ADMIN());
        setAlert(false);
      }
    } catch (error) {
      setLoading(false);
      setMessage(error.response.data.message)
      setAlert(true);
    }
  };

  const preloadValues = {
    nama_budaya: data?.nama_budaya,
    tahun: data?.tahun,
    image: data?.image,    
    jenis_budaya: data?.JenisBudayaId,
    idProvinsi: data?.ProvinsiId,
    registNum: data?.registNum,
    desc: data?.desc,
  };

  return (
    <div className={style.root}>
      <p>Edit Budaya Pengetahuan Tradisional</p>
      {alert && (
        <Alert message={message}/>
      )}
      {data && (
        <FormBudaya 
          isLoading={loading}
          handleSubmitForm={submitForm}
          preloadValues={preloadValues}
        />
      )}
    </div>
  )
}
