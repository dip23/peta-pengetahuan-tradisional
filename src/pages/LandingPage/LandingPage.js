import React, { useState } from 'react';
import SearchBar from '../../components/elements/SearchBar';
import Maps from '../../components/fragments/Maps';
import { provinceData } from './dummyData';
import styles from './styles.module.css';
import indonesia from '../../jawaBarat.json';
import ListBudaya from '../../components/fragments/ListBudaya';

export default function LandingPage() {
  const [locationName, setlocationName] = useState('');
  const [openListBudaya, setOpenListBudaya] = useState(false);

  const handleClickLocation = (e) => {
    setlocationName(e);
    setOpenListBudaya(true);
  }

  return (
    <div>
      <div className={styles.content}>
        <SearchBar />
        {openListBudaya &&
          <ListBudaya name={locationName} onClose={() => setOpenListBudaya(false)} />}
      </div>
      <Maps data={provinceData} geoJson={indonesia} handleClick={handleClickLocation} />
    </div>
  )
}
