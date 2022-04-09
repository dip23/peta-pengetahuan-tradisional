import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import Search from '../../fields/Search';
import styles from './styles.module.css';

export default function SearchBar() {
  const [keyword, setKeyword] = useState('');
  const [openResult, setOpenResult] = useState(false);

  const handleInput = (e) => {
    setTimeout(() => {
      setKeyword(e.target.value)
    }, 1500)
  }

  const inputProps = {
    placeholder: 'Search..',
    onChange: handleInput
  }

  const handleSubmit = () => {
    setOpenResult(true);
  }

  console.log(openResult);

  return (
    <div className={styles.root}>
      <div>Peta Persebaran Pengetahuan Tradisional Indonesia</div>
      <Search
        inputProps={inputProps}
        className={styles.searchInput}
        handleSubmit={handleSubmit}
      />
      {keyword && (
        <div className={styles.resultBox}>
          <div>
            <span><FontAwesomeIcon icon={faLocationDot} /></span>
            <p>{keyword}</p>
          </div>
        </div>
      )}
    </div>
  )
}
