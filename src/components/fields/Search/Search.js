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
      <form className={styles.wrapper} onSubmit={handleSubmit}>
        <input type="text" {...inputProps} />
        <button type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </div>
  )
}
