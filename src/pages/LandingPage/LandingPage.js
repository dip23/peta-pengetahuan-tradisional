import React, { useState } from 'react';
import SearchBar from '../../components/elements/SearchBar';
import Maps from '../../components/fragments/Maps';
import { provinceData } from './dummyData';
import styles from './styles.module.css';
import indonesia from '../../data/indonesia.json';
import ListBudaya from '../../components/fragments/ListBudaya';

export default function LandingPage() {
  const [locationName, setlocationName] = useState('');
  const [openListBudaya, setOpenListBudaya] = useState(false);
  const [openResult, setOpenResult] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [filteredResult, setFilteredResult] = useState([]);

  const dataBudaya = [
    { id: 1, name: 'Jawa Barat' },
    { id: 2, name: 'Ppaua' },
    { id: 3, name: 'Jawa Timur' },
  ];

  const handleClickLocation = (name) => {
    setlocationName(name);
    setOpenListBudaya(true);
  };

  const handleClickResult = () => {
    setOpenListBudaya(true);
  };

  const handleInput = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.stopPropagation();
    if (keyword !== '') {
      setFilteredResult(() => {
        let result = [];
        result = dataBudaya.filter((budaya) => {
          return budaya.name.toLowerCase().includes(keyword.toLowerCase())
        })
        return result
      });
      setOpenResult(true);
    }
  };

  console.log(filteredResult);

  return (
    <div onClick={() => setOpenResult(false)}>
      <div className={styles.content}>
        <SearchBar
          onClickResult={handleClickResult}
          openResult={openResult}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          resultData={filteredResult}
        />
        {openListBudaya && (
          <ListBudaya name={locationName} onClose={() => setOpenListBudaya(false)} />
        )}
      </div>
      <Maps
        data={provinceData}
        geoJson={indonesia}
        handleClick={handleClickLocation}
      />
    </div>
  )
}
