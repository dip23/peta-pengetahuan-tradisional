import React from 'react';
import style from './styles.module.css';
import PropTypes from 'prop-types';

export default function MapsDesc(props) {
  const { high, low } = props;

  const roundedHigh = Math.round(high);
  const roundedLow = Math.round(low);

  return (
    <div className={style.root}>
      <div className={style.header}>Keterangan</div>
      <div className={style.desc}>
        <div>
          <div className={style.high}/>
          <p><span>≥ {roundedHigh || '...'}</span> Kebudayaan</p>  
        </div>
        <div>
          <div className={style.between}/>
          <p><span>{roundedLow || '...'} - {roundedHigh || '...'}</span> Kebudayaan</p>  
        </div>
        <div>
          <div className={style.low}/>
          <p><span>≤ {roundedLow || '...'}</span> Kebudayaan</p>  
        </div>
      </div>
    </div>
  )
}
