import React from 'react';
import styles from './styles.module.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  GeoJSON,
  Tooltip,
} from 'react-leaflet';

export default function Maps(props) {
  const {
    data,
    geoJson,
    handleClick,
    high,
    low
  } = props;

  const countryStyle = {
    fillOpacity: 0.4,
    color: 'black',
    weight: 2
  };

  const onEachProvince = (province, layer) => {
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

    layer.on("click", function () {
      handleClick(
        data[province.index]?.ProvinsiId,
        data[province.index]?.Provinsi?.nama_provinsi,
      )
    })

    layer.on("mouseover", function (e){
      const target = e.target;
      target.setStyle({
        color: 'black',
        fillOpacity: 0.8,
        weight: 2
      })
    })

    layer.on("mouseout", function (e){
      const target = e.target;
      target.setStyle({
        fillOpacity: 0.4,
        color: 'black',
        weight: 2
      })
    })
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
        {(data.length > 0) && high && low && (
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
