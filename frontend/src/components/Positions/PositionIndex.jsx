import config from '../../config';

// importar elementos leaflet
import { MapContainer } from 'react-leaflet/MapContainer'
import { useMapEvents } from 'react-leaflet'
import { Marker } from 'react-leaflet/Marker'
import { Popup } from 'react-leaflet/Popup'
import { TileLayer } from 'react-leaflet/TileLayer'
import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';

import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
});

const markerIcon = new L.Icon({
    iconUrl: require("../../assets/images/marker.png"),
    iconSize: [40, 40],
    iconAnchor: [17, 46], //[left/right, top/bottom]
    popupAnchor: [0, -46], //[left/right, top/bottom]
  });

L.Marker.prototype.options.icon = DefaultIcon;

function LocationMarkers() {
    const initialMarkers= [-1000,-1000];
    const [markers, setMarkers] = useState([initialMarkers]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const {currentUser} = useAuth();
  
    const map = useMapEvents({
      click(e) {
        markers.push(e.latlng);
        setMarkers((prevValue) => [...prevValue, e.latlng]);
      }
    });
  
    return (
      <React.Fragment>
        {markers.map(marker => <Marker position={marker} icon={markerIcon}>
            <Popup>
            <Formik initialValues={{
          title: '',
          lat: marker.lat,
          long: marker.lng,
        }}
        onSubmit={async (values) => {
          setLoading(true);
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${currentUser?.access_token}` },
            body: JSON.stringify(values),
          };
          try {
            const response = await fetch(`${config.API_URL}/api/map/new`, requestOptions);
            if (!response.ok) {
              const error = await response.text();
              throw new Error(error);
            }
            setMessage('Posicion creada con exito');
            navigate(0);
          } catch (error) {
            setMessage(error.message);
          } finally {
            setLoading(false);
          }
        }}
      >
          <Form>
              <div className="form-label">
                <label htmlFor="title">Titulo de la posicion</label>
                <Field name="title" type="text" placeholder="Titulo" />
              </div>
              <Field name="lat" type="hidden" value={marker.lat}/>
              <Field name="long" type="hidden" value={marker.lng}/>
              <div className="form-label">
                  <button className="boton" type="submit">Crear posicion</button>
                </div>
            </Form>
            </Formik>
            </Popup>
        </Marker>)}
      </React.Fragment>
    );
  }

const PositionIndex = function PositionIndex() {
    const { currentUser } = useAuth()
    const [positions, setPositions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [center, setCenter] = useState([10.1,10.1])

    
    useEffect(() => {
        setLoading(true);
        const requestOptions = {headers: { 'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser?.access_token}` }}
        fetch(`${config.API_URL}/api/map/user`, requestOptions)
        .then((response) => {
            if (!response.ok) {
              setError(true);
              return response.text().then((message) => Promise.reject(new Error(message)));
            }
            return response.json();
          })
          .then((response) => {setPositions(response);
            setCenter(response[0].geography)

          })
          .catch(() => {
            setError(true);
          })
          .finally(() => {
            setLoading(false);
          });
      }, []);
    
      return (
            <div>
                <h1>Tus posiciones :D</h1>
                <h5> Da click donde quieras crear una posicion, y haz click en el marcador rojo!</h5>
                <MapContainer center={center} zoom={3} scrollWheelZoom={true}>
                        <TileLayer 
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                            {positions.map((element,index) => (
                              <Marker position={[element.geography[0], element.geography[1]]} id="map" key={index} icon={DefaultIcon}>
                              <Popup>
                                <p>{element.title}</p>
                                
                                <p>Long:{element.geography[0]},Lat:{element.geography[1]}</p>
                              </Popup>
                            </Marker> 
                            ))}
                            <LocationMarkers />
                    </MapContainer>
            </div>
      )
}

export default PositionIndex;