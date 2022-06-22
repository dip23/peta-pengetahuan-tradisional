import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import budayaAPI from '../../../api/budayaAPI';
import { routes } from '../../../configs/routes';
import Loader from '../../elements/Loader';

export default function ListBudaya(props) {
  const {
    name,
    handleClickBudaya
  } = props;
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get('id'));
  const navigate = useNavigate();
  const [listBudaya, setListBudaya] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListBudaya = async () => {
      setListBudaya(null);
      setLoading(true);
      const res = await budayaAPI.getListBudaya(id);
      if(res.data.sucess){
        setListBudaya(res.data.data);
        setLoading(false);
      }
    };
    fetchListBudaya();
  }, [id]);

  const onClose = () => {
    navigate(routes.LANDING_PAGE());
  };

  return (
    <section className={styles.root}>
      <div className={styles.header}>
        <p><b>Provinsi {name}</b></p>
        <FontAwesomeIcon className={styles.close} icon={faClose} onClick={onClose} />
      </div>
      <div className={styles.list}>
        {listBudaya?.length > 0 ? (
          listBudaya.map((i, idx) => (
            <div key={idx} onClick={() => handleClickBudaya(i.id)}>{i.nama_budaya}</div>
          ))
        ) : loading ? (
          <div className={styles.loader}><Loader/></div>
        ) : (
          <div>Data Tidak ada</div>
        )}
      </div>
    </section>
  )
}

ListBudaya.defaultProps = {
  name: '',
  handleClickBudaya: () => { }
}

ListBudaya.propTypes = {
  name: PropTypes.string,
  handleClickBudaya: PropTypes.func
}
