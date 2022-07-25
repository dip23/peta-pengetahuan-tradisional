import React from 'react';
import style from './styles.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGear} from '@fortawesome/free-solid-svg-icons';

export default function MapsDesc(props) {
  const { high, low, handleClickSet } = props;

  const roundedHigh = Math.round(high);
  const roundedLow = Math.round(low);

  return (
    <div className={style.root}>
      <div className={style.header}>
        <p>Keterangan</p>
        <FontAwesomeIcon icon={faGear} onClick={handleClickSet}/>
      </div>
      <div className={style.desc}>
        <div>
          <div className={style.high}/>
          <p><span>{`> ${roundedHigh}` || '...'}</span> Kebudayaan</p>  
        </div>
        <div>
          <div className={style.between}/>
          <p><span>{roundedLow || '...'} ≤ x ≤ {roundedHigh || '...'}</span> Kebudayaan</p>  
        </div>
        <div>
          <div className={style.low}/>
          <p><span>{`< ${roundedLow}` || '...'}</span> Kebudayaan</p>  
        </div>
      </div>
    </div>
  )
}

MapsDesc.defaultProps = {
  high: 0,
  low: 0,
  handleClickSet: ()=>{}
};

MapsDesc.propTypes = {
  high: PropTypes.number,
  low: PropTypes.number,
  handleClickSet: PropTypes.func
}