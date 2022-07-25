import React from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

export default function Text(props) {
  const {
    label,
    inputProps,
    disabled,
    className,
    register,
    name,
    error
  } = props;

  const classes = [styles.root, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {label && (
        <label htmlFor={label}>{label}</label>
      )}
      <input {...inputProps} disabled={disabled} {...register(name)} />
      {error && (
        <p>{error}</p>
      )}
    </div>
  )
}

Text.defaultProps = {
  label: '',
  inputProps: {},
  disabled: false,
  className: '',
  register: ()=>{}
};

Text.propTypes = {
  label: PropTypes.string,
  inputProps: PropTypes.object,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  register: PropTypes.func
};
