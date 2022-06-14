import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './styles.module.css';

export default function Button(props) {
  const {
    className,
    type,
    children,
    onClick,
    disabled,
    iconBtn
  } = props;

  const classes = [styles.root, className].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {iconBtn ? <FontAwesomeIcon icon={iconBtn} /> : children}
    </button>
  )
}
