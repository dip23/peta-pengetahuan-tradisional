import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import Search from '../../fields/Search';
import styles from './styles.module.css';

export default function SearchBar(props) {
  const {
    onClickResult,
    openResult,
    handleInput,
    handleSubmit,
    resultData
  } = props;

  const inputProps = {
    placeholder: 'Search..',
    onChange: handleInput
  }

  return (
    <div className={styles.root}>
      <div>Peta Persebaran Pengetahuan Tradisional Indonesia</div>
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
                <p>{`${i.nama_budaya}, ${i.Provinsi.nama_provinsi}`}</p>
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
