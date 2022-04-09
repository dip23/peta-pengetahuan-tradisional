import React from 'react';
import styles from './styles.module.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  ZoomControl,
  GeoJSON
} from 'react-leaflet';

export default function Maps(props) {
  const {
    data,
    geoJson,
    handleClick
  } = props;

  return (
    <div className={styles.root}>
      <MapContainer center={[0.9248186, 112.8078095, 5]} zoom={6} zoomControl={false}>
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
                handleClick(i.name)
              },
            }}
          />
        ))}
        <GeoJSON data={geoJson} />
        <ZoomControl position='topright' />
      </MapContainer>
    </div>
  )
}
