import config from '../../config';

// importar elementos leaflet
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'

import React, { Component } from 'react'
import Select from 'react-select'
import useAuth from '../../hooks/useAuth';
import { element } from 'prop-types';

const initialValues = {
    nicknames: '',
};

const ComparePositions = function ComparePositions() {
    const { currentUser } = useAuth()
    const [nicknames, setNicknames] = useState([]);
    const [positions, setPositions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
  
  
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
        .then(
          (data) => new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(
            data,
            (_error, nicknamesList) => setNicknames(nicknamesList),
          ),
        )
        .catch(() => setError(true))
        .finally(() => setLoading(false));
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
  
    return (
  
      <section id="workouts">
        {error ? (
          <div className="mainsection">
            <h2>Error</h2>
          </div>
        ) : (
          <>
            <div id="form">
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
                    .then((data) => {
                      new Deserializer({ keyForAttribute: 'camelCase' })
                        .deserialize(data, (_error, positionList) => setPositions(positionList));
                    })
                    .catch(() => {
                      setError(true);
                    })
                    .finally(() => {
                      setLoading(false);
                      setSelectedOptions2([]);
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
                            options={nicknames}
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
                {positions.map((position) => (
                    <MapContainer center={position[0].geography } zoom={13} scrollWheelZoom={false}>
                        <TileLayer 
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                            {position.forEach( element => {
                                <Marker position={element.geography}>
                                <Popup>
                                  <p>{element.title}</p>
                                </Popup>
                              </Marker>
                            })}
                    </MapContainer>
                ))}
              </div>
            </div>
  
          </>
        ) }
      </section>
  
    );
  };

  export default ComparePositions;