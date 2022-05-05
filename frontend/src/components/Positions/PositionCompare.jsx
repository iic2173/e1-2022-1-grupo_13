import config from '../../config';

// importar elementos leaflet
import { MapContainer } from 'react-leaflet/MapContainer'
import { Marker } from 'react-leaflet/Marker'
import { Popup } from 'react-leaflet/Popup'
import { TileLayer } from 'react-leaflet/TileLayer'
import { LayersControl, LayerGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap } from 'react-leaflet/hooks'

import React, { Component, useState, useEffect } from 'react';
// import { Deserializer } from 'jsonapi-serializer';
import Select from 'react-select';
import {Formik, Form, Field} from 'formik'
import useAuth from '../../hooks/useAuth';
import { element, elementType } from 'prop-types';

import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;


let count = 0;
const initialValues = {
    nicknames: '',
};


const PositionCompare = function PositionCompare() {
    const { currentUser } = useAuth()
    const [users, setUsers] = useState([]);
    const [positions, setPositions] = useState([]);
    const [positions2, setPositions2] = useState({});
    const [user_positions, setUserPositions] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const nickname_options = [];
    const map_coor = {};
    const user_coor = {};
    const [count1, setCount] = useState(0);
  
  
    useEffect(() => {
      setLoading(true);
      fetch(`${config.API_URL}/api/users`)
        .then((response) => {
          if (!response.ok) {
            setError(true);
            return [];
          }
          return response.json();
        })
        .then(setUsers)
          // (data) => new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(
          //   data,
          //   (_error, nicknamesList) => setNicknames(nicknamesList),)
        .catch(() => setError(true))
        .finally(() => {
          setLoading(false);});
        ;

    }, []);

    
  
    if (loading) {
      return (
        <section id="compare">
          <div className="mainsection">
            <h2>Cargando...</h2>
          </div>
        </section>
      );
    }

    users.forEach(user => {
      let current = { value: user.id, label: user.nickname}
      nickname_options.push(current);
    });
    
  
    return (
      <section id="workouts">
        
        {error ? (
          <div className="mainsection">
            <h2>Error</h2>
          </div>
        ) : (
          <>
            <div>
              <br />
            </div>
            <div id="workouts" className="mainsection">
              
              <Formik
                initialValues={initialValues}
                onSubmit={async () => {
                  let body = { idsArray: []};
                  selectedOptions.forEach((opt) => {
                    body.idsArray.push(opt.value);
                  });
                  setLoading(true);
                  const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json',
                                Authorization: `Bearer ${currentUser?.access_token}`, },
                    body: JSON.stringify(body),
                  };
                  fetch(`${process.env.REACT_APP_API_URL}/api/map/compare`, requestOptions)
                    .then((response) => {
                      if (!response.ok) {
                        setError(true);
                        return response.text().then((message) => Promise.reject(new Error(message)));
                      }
                      return response.json();
                    })
                    .then((response) => {setPositions(response);
                      Object.keys(positions).map((id, position) => {
                        if (id === String(currentUser.id) ) {
                          user_coor[id] = positions[id];
                        }
                        else if (positions[id].length > 0) {
                          map_coor[id] = positions[id];
                        }

                      });
                      setUserPositions(user_coor);
                      setPositions2(map_coor);
                    })
                    .catch(() => {
                      setError(true);
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                }}
  
              >
                
                <Form>
                  <div className="filtro">
                    <div className="barra-filtro">
  
                      <Field
                        className="barra-filtro"
                        name="nicknames"
                        component={({ field, form }) => (
                          <Select
                            isMulti
                            placeholder="Seleccione 5 usuarios..."
                            name="nicknames"
                            options={nickname_options}
                            value={selectedOptions}
                            isOptionDisabled={() => selectedOptions.length >= 5}
                            onChange={(options) => {
                              setSelectedOptions(options);
                              form.setFieldValue(field.name, options.value);
                            }}
                          />
                        )}
                      />
                    </div>
                    <button className="boton-filtro" type="submit"> Seleccionar </button>
                  </div>
                  <br />
                </Form>
  
              </Formik>
              <div id="workouts" className="container">
                <p>Aqui van los mapas</p>
                {Object.keys(positions2).map((id, position) => (
                  <div id="map">
                    <p>hola</p>
                    
                    <MapContainer center={positions2[id][0].geography } zoom={13} scrollWheelZoom={true}>
                        <TileLayer 
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                            <LayersControl position="topright">
                            <LayersControl.Overlay name="posiciones del usuario">
                            <LayerGroup>
                            {user_positions[currentUser.id].map((element,index) => (
                              <Marker position={[element.geography[0], element.geography[1]]} id="map2" key={count}>
                              <Popup>
                                <p>{element.title}</p>
                              </Popup>
                            </Marker> 
                            ))}
                            </LayerGroup>
                        </LayersControl.Overlay>
                        <LayersControl.Overlay name="posiciones del otro usuario">
                        <LayerGroup>
                            {positions2[id].map( element => (
                                <Marker position={[element.geography[0], element.geography[1]]} key="1" id="map" >
                                {count += 1}
                                <Popup>
                                  <p>{element.title}</p>
                                </Popup>
                              </Marker> 
                            ))}
                          </LayerGroup>
                            </LayersControl.Overlay>
                        </LayersControl>

                    </MapContainer>
                  </div>
                ))}
              </div>
            </div>
  
          </>
        ) }
      </section>
  
    );
  };

  export default PositionCompare;