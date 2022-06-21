import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formBudayaSchema } from './validation';
import imgDefault from '../../../assets/img-default.svg';
import style from './styles.module.css';
import Text from '../../fields/Text';
import Button from '../../elements/Button';
import { useNavigate } from 'react-router';
import provinceAPI from '../../../api/provinceAPI';
import Select from '../../fields/Select/Select';
import checkURL from '../../../helpers/checkURL';

export default function FormBudaya({ handleSubmitForm, preloadValues }) {
  const { 
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: preloadValues,
    resolver: yupResolver(formBudayaSchema)
  });
  const navigate = useNavigate();  
  const [provinsi, setProvinsi] = useState([]);

  const watchImage = watch("image");

  const imageURL = useMemo(()=>{
    if(typeof watchImage === 'string' && checkURL(watchImage)){
      return watchImage;
    }
    if(watchImage?.length > 0 && watchImage !=='undefined'){
      return URL.createObjectURL(watchImage[0]);
    }
    return '';
  }, [watchImage]);

  const inputProps = [
    { type: "text", placeholder: "Masukkan Nama Budaya" },
    { type: "number", placeholder: "2022" },
    { type: "text", placeholder: "Pilih Jenis Budaya", defaultValue: preloadValues?.jenis_budaya },
    { type: "number", placeholder: "No.Registrasi" },
    { type: "text", placeholder: "Jawa Barat", defaultValue: preloadValues?.idProvinsi },
    { type: "text" }
  ];

  const inputPropsFile = {
    type: "file",
    accept: "image/*"
  };

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
        <Text label="Masukkan Gambar" name="image" inputProps={inputPropsFile} register={register}/>
        <img alt='choose' src={imageURL || preloadValues.image || imgDefault}/>
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
              selected={preloadValues?.jenis_budaya}
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
            selected={preloadValues?.idProvinsi}
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
        <Button onClick={() => navigate(-1)} type={'button'}>Batal</Button>
      </div>
    </form>
  )
}
