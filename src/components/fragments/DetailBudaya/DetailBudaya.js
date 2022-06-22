import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import defaultImage from '../../../assets/img-default.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import budayaAPI from '../../../api/budayaAPI';
import Modal from '../../elements/Modal';

export default function DetailBudaya() {
  const empty = '-';
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get('idBudaya'));
  const navigate = useNavigate();
  const [detail, setDetail] = useState([]);
  const [openModalJenis, setOpenModalJenis] = useState(false);
  const [openModalNomor, setOpenModalNomor] = useState(false);

  useEffect(() => {
    const fetchDetailBudaya = async () => {
      const res = await budayaAPI.getDetailBudaya(id);
      setDetail(res.data.data);
    };

    fetchDetailBudaya()
  }, [id]);

  const handleCloseJenis = () => {
    setOpenModalJenis(false);
  };

  const handleCloseNomor = () => {
    setOpenModalNomor(false);
  };

  return (
    <section className={styles.root}>
      <div className={styles.image}>
        <img
          alt="budaya-img"
          src={detail.image || defaultImage}
          onError={(e) => { e.target.onerror = null; e.target.src = defaultImage }}
        />
        <div className={styles.close} onClick={() => navigate(-1)}>
          <FontAwesomeIcon
            icon={faArrowLeft}
          />
        </div>
      </div>
      <div className={styles.title}>
        <div>
          <p title={detail?.nama_budaya}>{detail?.nama_budaya || empty}</p>
          <p>No. {detail?.registNum || empty}
            <span>
              <FontAwesomeIcon
                icon={faCircleInfo}
                onClick={() => setOpenModalNomor(true)}
              />
            </span>
          </p>
        </div>
        <div onClick={() => setOpenModalJenis(true)}>
          {detail.JenisBudaya?.nama_jenis || empty}
        </div>
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
      <Modal
        show={openModalJenis}
        onClose={handleCloseJenis}
        title="Jenis Kebudayaan"
      >
        <p><b>Pencatatan</b></p>
        <p>
          Suatu budaya memiliki status jenis kebudayaan pencatatan saat Kebudayaan
          tersebut diusulkan pada website Warisan Budaya Tak Benda
        </p>
        <p><b>Penetapan</b></p>
        <p>
          Suatu budaya memiliki status jenis kebudayaan penetapan saat Kebudayaan
          tersebut disetujui
        </p>
      </Modal>
      <Modal
        show={openModalNomor}
        onClose={handleCloseNomor}
        title="Nomor Registrasi"
      >
        <p>Nomor Registrasi merupakan id dari pengetahuan tradisional
          saat pengetahuan tradisional tersebut dicatat ataupun ditetapkan</p>
      </Modal>
    </section>
  )
};