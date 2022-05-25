import React from 'react';
import styles from './styles.module.css';
import defaultImage from '../../../assets/img-default.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

export default function DetailBudaya({ data, onClose }) {
  const empty = '-';

  return (
    <section className={styles.root}>
      <div className={styles.image}>
        <img alt="budaya-img" src={data?.image || defaultImage} />
        <FontAwesomeIcon className={styles.close} icon={faClose} onClick={onClose} />
      </div>
      <div className={styles.title}>
        <div>
          <p title={data?.nama_budaya}>{data?.nama_budaya || empty}</p>
          <p>No. {data?.registNum || empty}</p>
        </div>
        <div>{data.JenisBudaya ? data?.JenisBudaya.nama_jenis : empty}</div>
      </div>
      <div className={styles.desc}>
        <div>
          <p>Tahun</p>
          <p>: {data?.tahun || empty}</p>
        </div>
        <div>
          <p>Provinsi</p>
          <p>: {data.Provinsi ? data?.Provinsi.nama_provinsi : empty}</p>
        </div>
        <p>{data?.desc || empty}</p>
      </div>
    </section>
  )
};
