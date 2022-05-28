import React from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

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
};

Search.defaultProps = {
  label: '',
  inputProps: {},
  className: '',
  handleSubmit: () => { }
};

Search.propTypes = {
  label: PropTypes.string,
  inputProps: PropTypes.object,
  className: PropTypes.string,
  handleSubmit: PropTypes.func
};