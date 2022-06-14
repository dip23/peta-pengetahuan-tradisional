import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  GeoJSON,
  Tooltip,
} from 'react-leaflet';
import calculationAPI from '../../../api/calculationAPI';

export default function Maps(props) {
  console.log('render')
  const {
    data,
    geoJson,
    handleClick,
  } = props;

  const [dataCalc, setDataCalc] = useState({});

  const fetchData = async () => {
    const res = await calculationAPI.getAllCalculate(0.8);
    setDataCalc(res.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const countryStyle = {
    fillOpacity: 0.7,
    color: 'black',
    weight: 2
  };

  const onEachProvince = (province, layer) => {
    let high = dataCalc?.high;
    let low = dataCalc?.low;
    const totalBudaya = parseInt(data[province.index]?.totalBudaya) + 1;

    if (!isNaN(totalBudaya)) {
      if (totalBudaya >= high) {
        layer.options.fillColor = '#73D737';
      } else if (totalBudaya <= low) {
        layer.options.fillColor = '#FB4141';
      } else {
        layer.options.fillColor = '#E1FB41';
      }
    }
  };

  return (
    <div className={styles.root}>
      <MapContainer center={[-0.789275, 113.921326]} zoom={6} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data && data.map((i, idx) => (
          <Marker
            key={idx}
            position={[i.Provinsi?.latitude || '', i.Provinsi?.longitude || '']}
            eventHandlers={{
              click: () => {
                handleClick(i.ProvinsiId, i.Provinsi?.nama_provinsi)
              },
            }}
          >
            <Tooltip>
              <b>{i.Provinsi?.nama_provinsi}</b>
              <p>{parseInt(i.totalBudaya) + 1} Budaya</p>
            </Tooltip>
          </Marker>
        ))}
        {(data.length > 0) && (
          <GeoJSON
            style={countryStyle}
            data={geoJson}
            onEachFeature={onEachProvince}
          />
        )}
      </MapContainer>
    </div>
  )
}
