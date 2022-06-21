import React from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

export default function Select(props) {
  const {
    label,
    inputProps,
    disabled,
    className,
    register,
    name,
    error,
    options,
    displayValue,
    onChange,
    selected
  } = props;

  const classes = [styles.root, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {label && (
        <label htmlFor={label}>{label}</label>
      )}
      <select
        name={name}
        onChange={onChange}
        {...register(name)}
        {...inputProps}
        disabled={disabled}
      >
        {options.length > 0 && options.map((i, idx) => (
          <option
            key={idx}
            value={i.id}
            selected={selected === i.id}
          >
            {i[displayValue]}
          </option>
        ))}
      </select>
      {error && (
        <p>{error}</p>
      )}
    </div>
  )
}

Select.defaultProps = {
  label: '',
  inputProps: {},
  disabled: false,
  className: ''
};

Select.propTypes = {
  label: PropTypes.string,
  inputProps: PropTypes.object,
  disabled: PropTypes.bool,
  className: PropTypes.string
};
