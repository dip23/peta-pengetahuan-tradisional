import React from 'react';
import styles from './styles.module.css';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

export default function Modal(props) {
  const {
    children,
    className,
    onClose,
    show,
    title
  } = props;

  const classes = [styles.rootModal, className].filter(Boolean).join(' ');

  if (!show) {
    return null;
  }

  return (
    <div className={classes} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          {title && <h4>{title}</h4>}
          <FontAwesomeIcon
            className={styles.close}
            icon={faTimes}
            onClick={onClose}
          />
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
}

Modal.defaultProps = {
  children: null,
  className: '',
  onClose: () => { },
  show: false,
  title: ''
};

Modal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClose: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string
}
