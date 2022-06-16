import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formBudayaSchema } from './validation';
import addImage from '../../../assets/add-image.svg';
import style from './styles.module.css';
import Text from '../../fields/Text';
import Button from '../../elements/Button';
import { useNavigate } from 'react-router';
import provinceAPI from '../../../api/provinceAPI';
import Select from '../../fields/Select/Select';

export default function FormBudaya({ handleSubmitForm }) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(formBudayaSchema)
  });

  const [provinsi, setProvinsi] = useState([]);

  const inputProps = [
    { type: "text", placeholder: "Masukkan Nama Budaya" },
    { type: "number", placeholder: "2022" },
    { type: "text", placeholder: "Pilih Jenis Budaya" },
    { type: "number", placeholder: "No.Registrasi" },
    { type: "text", placeholder: "Jawa Barat" },
    { type: "text" }
  ];

  const fetchDataProvinsi = async () => {
    const res = await provinceAPI.getProvinces();
    setProvinsi(res.data.data);
  }

  useEffect(() => {
    fetchDataProvinsi();
  }, [])

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className={style.root}>
      <div className={style.image}>
        <img alt="add-img" src={addImage} />
      </div>
      <div className={style.field}>
        <div>
          <Text
            label="Nama Budaya"
            name="nama_budaya"
            inputProps={inputProps[0]}
            error={errors?.nama_budaya?.message}
            register={register}
          />
          <div className={style.textBlock}>
            <Text
              label="Tahun"
              name="tahun"
              inputProps={inputProps[1]}
              error={errors?.tahun?.message}
              register={register}
            />
            <Select
              label="Jenis"
              name="jenis_budaya"
              inputProps={inputProps[2]}
              error={errors?.jenis_budaya?.message}
              register={register}
              displayValue={'nama_jenis'}
              options={[
                { id: 1, nama_jenis: 'Pencatatan' },
                { id: 2, nama_jenis: 'Penetapan' },
              ]}
            />
          </div>
        </div>
        <div>
          <Text
            label="Nomor Pencatatan/Penetapan"
            name="registNum"
            inputProps={inputProps[3]}
            register={register}
          />
          <Select
            label="Provinsi"
            name="idProvinsi"
            inputProps={inputProps[4]}
            error={errors?.idProvinsi?.message}
            register={register}
            displayValue={'nama_provinsi'}
            options={provinsi}
          />
        </div>
        <div>
          <Text
            label="Deskripsi"
            name="desc"
            inputProps={inputProps[5]}
            error={errors?.desc?.message}
            register={register}
          />
        </div>
      </div>
      <div className={style.submitFooter}>
        <Button type="submit">Simpan</Button>
        <Button onClick={() => navigate(-1)}>Batal</Button>
      </div>
    </form>
  )
}
