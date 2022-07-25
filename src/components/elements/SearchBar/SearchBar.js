import React from 'react';
import Search from '../../fields/Search';
import styles from './styles.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar(props) {
  const {
    onClickResult,
    openResult,
    handleInput,
    handleSubmit,
    resultData
  } = props;

  const inputProps = {
    placeholder: 'Cari nama pengetahuan tradisional...',
    onChange: handleInput
  }

  return (
    <div className={styles.root}>
      <div>Persebaran Pengetahuan Tradisional Indonesia</div>
      <Search
        inputProps={inputProps}
        className={styles.searchInput}
        handleSubmit={handleSubmit}
      />
      {openResult && (
        <div className={styles.resultBox}>
          {resultData.length !== 0 ? (
            resultData.map((i, idx) => (
              <div onClick={() => onClickResult(i.id)} key={idx}>
                <span><FontAwesomeIcon icon={faLocationDot} /></span>
                <p><b>{i.nama_budaya}</b>, {i.Provinsi.nama_provinsi}</p>
              </div>
            ))
          ) : (
            <div>
              <p>Pengetahuan Tradisional tidak ditemukan!</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

SearchBar.defaultProps = {
  handleInput: () => { },
  handleSubmit: () => { },
  onClickResult: () => { },
  openResult: false,
  resultData: []
};

SearchBar.propTypes = {
  handleInput: PropTypes.func,
  handleSubmit: PropTypes.func,
  onClickResult: PropTypes.func,
  openResult: PropTypes.bool,
  resultData: PropTypes.array
};