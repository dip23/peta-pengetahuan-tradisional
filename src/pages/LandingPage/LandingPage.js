import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/elements/SearchBar';
import Maps from '../../components/fragments/Maps';
import styles from './styles.module.css';
import feature from '../../data/features.json';
import ListBudaya from '../../components/fragments/ListBudaya';
import provinceAPI from '../../api/provinceAPI';
import budayaAPI from '../../api/budayaAPI';
import DetailBudaya from '../../components/fragments/DetailBudaya';

export default function LandingPage() {
  const [locationName, setlocationName] = useState('');
  const [openListBudaya, setOpenListBudaya] = useState(false);
  const [openDetailBudaya, setOpenDetailBudaya] = useState(false);
  const [openResult, setOpenResult] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [filteredResult, setFilteredResult] = useState([]);
  const [dataProvinsi, setDataProvinsi] = useState([]);
  const [dataBudaya, setDataBudaya] = useState([]);
  const [listBudaya, setListBudaya] = useState([]);
  const [detailBudaya, setDetailBudaya] = useState([]);

  const fetchData = async () => {
    const res = await provinceAPI.getProvinces();
    const resBudaya = await budayaAPI.getAllBudaya();
    setDataProvinsi(res.data.data);
    setDataBudaya(resBudaya.data.data);
  };

  const fetchListBudaya = async (id) => {
    const res = await budayaAPI.getListBudaya(id);
    setListBudaya(res.data.data);
  };

  const fetchDetailBudaya = async (id) => {
    const res = await budayaAPI.getDetailBudaya(id);
    setDetailBudaya(res.data.data);
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleClickLocation = (id, name) => {
    fetchListBudaya(id);
    setlocationName(name);
    setOpenListBudaya(true);
  };

  const handleClickResult = (id) => {
    fetchDetailBudaya(id);
    setOpenDetailBudaya(true);
    setOpenListBudaya(false);
  };

  const handleInput = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (keyword !== '') {
      setFilteredResult(() => {
        let result = [];
        result = dataBudaya.filter((budaya) => {
          return budaya.nama_budaya?.toLowerCase().includes(keyword.toLowerCase())
        })
        return result
      });
      setOpenResult(true);
    }
  };

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
          <ListBudaya
            handleClickBudaya={handleClickResult}
            name={locationName}
            onClose={() => setOpenListBudaya(false)}
            data={listBudaya}
          />
        )}
        {openDetailBudaya && (
          <DetailBudaya data={detailBudaya} onClose={() => setOpenDetailBudaya(false)} />
        )}
      </div>
      <Maps
        data={dataProvinsi}
        geoJson={feature}
        handleClick={handleClickLocation}
      />
    </div>
  )
}
