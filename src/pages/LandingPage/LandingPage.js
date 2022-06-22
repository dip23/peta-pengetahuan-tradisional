import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/elements/SearchBar';
import Maps from '../../components/fragments/Maps';
import styles from './styles.module.css';
import feature from '../../data/features.json';
import ListBudaya from '../../components/fragments/ListBudaya';
import provinceAPI from '../../api/provinceAPI';
import budayaAPI from '../../api/budayaAPI';
import DetailBudaya from '../../components/fragments/DetailBudaya';
import { useNavigate } from 'react-router';
import { routes } from '../../configs/routes';
import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/elements/Button';
import MapsDesc from '../../components/fragments/MapsDesc/MapsDesc';
import calculationAPI from '../../api/calculationAPI';

export default function LandingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get('id'));
  const idBudaya = parseInt(searchParams.get('idBudaya'));
  const [locationName, setlocationName] = useState('');
  const [openResult, setOpenResult] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [filteredResult, setFilteredResult] = useState([]);
  const [dataProvinsi, setDataProvinsi] = useState([]);
  const [dataBudaya, setDataBudaya] = useState([]);
  const [dataCalc, setDataCalc] = useState({});

  const fetchData = async () => {
    const res = await provinceAPI.getAllDataProvinces();
    setDataProvinsi(res.data.data);
    const resCalc = await calculationAPI.getAllCalculate(0.8);
    setDataCalc(resCalc.data.data);
    const resBudaya = await budayaAPI.getAllBudaya();
    setDataBudaya(resBudaya.data.data);
  };

  useEffect(() => {
    fetchData();
  }, [])

  const handleClickLocation = (id, name) => {
    navigate(routes.LIST_BUDAYA(id), { replace: false });
    setlocationName(name);
  };

  const handleClickResult = (id) => {
    navigate(routes.DETAIL_BUDAYA(id))
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

  const renderContent = () => {
    if (id) {
      return (
        <ListBudaya handleClickBudaya={handleClickResult} name={locationName} />
      );
    } if (idBudaya) {
      return (
        <DetailBudaya />
      );
    }
  }

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
        {renderContent()}
        <Button
          className={styles.buttonSign}
          type={'button'}
          onClick={() => navigate(routes.LOGIN())}
        >
          Sign In <span><FontAwesomeIcon icon={faUser} /></span>
        </Button>
        <MapsDesc high={dataCalc.high} low={dataCalc.low}/>
      </div>
      <Maps
        data={dataProvinsi}
        geoJson={feature}
        handleClick={handleClickLocation}
        high={dataCalc.high}
        low={dataCalc.low}
      />
    </div>
  )
}
