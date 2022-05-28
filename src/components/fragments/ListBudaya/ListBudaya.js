import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import budayaAPI from '../../../api/budayaAPI';
import { routes } from '../../../configs/routes';

export default function ListBudaya(props) {
  const {
    name,
    handleClickBudaya
  } = props;
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get('id'));
  const navigate = useNavigate();
  const [listBudaya, setListBudaya] = useState([]);

  const fetchListBudaya = async () => {
    const res = await budayaAPI.getListBudaya(id);
    setListBudaya(res.data.data);
  };

  useEffect(() => {
    fetchListBudaya();
  });

  const onClose = () => {
    navigate(routes.LANDING_PAGE());
  };

  return (
    <section className={styles.root}>
      <div className={styles.header}>
        <p>Provinsi {name}</p>
        <FontAwesomeIcon className={styles.close} icon={faClose} onClick={onClose} />
      </div>
      <div className={styles.list}>
        {listBudaya && listBudaya.map((i, idx) => (
          <div key={idx} onClick={() => handleClickBudaya(i.id)}>{i.nama_budaya}</div>
        ))}
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
