import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import styles from './styles.module.css';

export default function Search(props) {
  const {
    label,
    inputProps,
    className,
    handleSubmit
  } = props;

  const classes = [styles.root, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {label && (<label>{label}</label>)}
      <div className={styles.wrapper}>
        <input type="search" {...inputProps} />
        <span onClick={handleSubmit}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </span>
      </div>
    </div>
  )
}
