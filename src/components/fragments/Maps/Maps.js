import React from 'react';
import styles from './styles.module.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  ZoomControl,
  GeoJSON,
} from 'react-leaflet';

export default function Maps(props) {
  const {
    data,
    geoJson,
    handleClick
  } = props;

  const countryStyle = {
    fillOpacity: 0.7,
    color: 'black',
    weight: 2
  };

  const onEachProvince = (province, layer) => {
    let high = 48.5811082;
    let low = 15.8188918;
    const totalBudaya = province.properties.totalBudaya;

    if (totalBudaya >= high) {
      layer.options.fillColor = '#73D737';
    } else if (totalBudaya <= low) {
      layer.options.fillColor = '#FB4141';
    } else {
      layer.options.fillColor = '#E1FB41';
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
            position={[i.latitude, i.longitude]}
            eventHandlers={{
              click: () => {
                handleClick(i.id, i.nama_provinsi)
              },
            }}
          />
        ))}
        <GeoJSON
          style={countryStyle}
          data={geoJson}
          onEachFeature={onEachProvince}
        />
        <ZoomControl position='topright' />
      </MapContainer>
    </div>
  )
}
