import React from 'react';
import Button from '../../elements/Button';
import Modal from '../../elements/Modal';
import style from './styles.module.css';
import PropTypes from 'prop-types';

export default function ModalDelete(props) {
  const {
    show,
    onClose,
    deleteClick
  } = props;

  return (
    <Modal
      show={show}
      onClose={onClose}
      className={style.modalDelete}
    >
      <div className={style.root}>
        <p>Hapus Kebudayaan?</p>
        <div>
          <Button onClick={deleteClick}>Ya</Button>
          <Button onClick={onClose}>Tidak</Button>
        </div>
      </div>
    </Modal>
  )
}

Modal.defaultProps = {
  show: false,
  onClose: () => { },
  deleteClick: () => { }
}

Modal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  deleteClick: PropTypes.func
}