import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import styles from './styles.module.css';

export default function ListBudaya(props) {
  const {
    name,
    onClose
  } = props;

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <p>Provinsi {name}</p>
        <FontAwesomeIcon className={styles.close} icon={faClose} onClick={onClose} />
      </div>
      <div>
        List Budaya
      </div>
    </div>
  )
}
