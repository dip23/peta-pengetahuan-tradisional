import React from "react";
import Button from "../../elements/Button";
import Modal from "../../elements/Modal";
import Text from "../../fields/Text";
import styles from "./styles.module.css";
import PropTypes from "prop-types";

export default function ModalMultiply(props) {
  const { handleSubmit, show, onClose } = props;
  const inputProps = {
    type: "number",
    step: "any",
    placeholder: JSON.parse(window.localStorage.getItem('multiply'))
  };

  return (
    <Modal className={styles.modal} show={show} onClose={onClose} title="Ubah Skala Perhitungan Peta">
      <form className={styles.root} onSubmit={handleSubmit}>
        <Text inputProps={inputProps} name="multipy" />
        <div>
          <Button onClick={onClose}>Batal</Button>
          <Button type="submit">Ubah</Button>
        </div>
      </form>
    </Modal>
  );
}

ModalMultiply.defaultProps = {
  handleSubmit: () => {},
  show: false,
  onClose: () => {},
};

ModalMultiply.propTypes = {
  handleSubmit: PropTypes.func,
  show: PropTypes.bool,
  onClose: PropTypes.func,
};
