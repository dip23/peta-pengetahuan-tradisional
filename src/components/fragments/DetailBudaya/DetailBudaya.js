import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import defaultImage from '../../../assets/img-default.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import budayaAPI from '../../../api/budayaAPI';

export default function DetailBudaya() {
  const empty = '-';
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get('idBudaya'));
  const navigate = useNavigate();
  const [detail, setDetail] = useState([]);

  const fetchDetailBudaya = async () => {
    const res = await budayaAPI.getDetailBudaya(id);
    setDetail(res.data.data);
  };

  useEffect(() => {
    fetchDetailBudaya();
  });

  return (
    <section className={styles.root}>
      <div className={styles.image}>
        <img
          alt="budaya-img"
          src={detail.image || defaultImage}
          onError={(e) => { e.target.onerror = null; e.target.src = defaultImage }}
        />
        <FontAwesomeIcon
          className={styles.close}
          icon={faClose}
          onClick={() => navigate(-1)}
        />
      </div>
      <div className={styles.title}>
        <div>
          <p title={detail?.nama_budaya}>{detail?.nama_budaya || empty}</p>
          <p>No. {detail?.registNum || empty}</p>
        </div>
        <div>{detail.JenisBudaya?.nama_jenis || empty}</div>
      </div>
      <div className={styles.desc}>
        <div>
          <p>Tahun</p>
          <p>: {detail?.tahun || empty}</p>
        </div>
        <div>
          <p>Provinsi</p>
          <p>: {detail.Provinsi?.nama_provinsi || empty}</p>
        </div>
        <p>{detail?.desc || empty}</p>
      </div>
    </section>
  )
};