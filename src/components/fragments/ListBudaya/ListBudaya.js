import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import styles from './styles.module.css';

export default function ListBudaya(props) {
  const {
    name,
    onClose,
    data,
    handleClickBudaya
  } = props;

  return (
    <section className={styles.root}>
      <div className={styles.header}>
        <p>Provinsi {name}</p>
        <FontAwesomeIcon className={styles.close} icon={faClose} onClick={onClose} />
      </div>
      <div className={styles.list}>
        {data && data.map((i, idx) => (
          <div key={idx} onClick={() => handleClickBudaya(i.id)}>{i.nama_budaya}</div>
        ))}
      </div>
    </section>
  )
}
