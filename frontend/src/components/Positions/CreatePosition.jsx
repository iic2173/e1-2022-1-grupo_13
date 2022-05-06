// importar elementos leaflet
import { MapContainer } from 'react-leaflet/MapContainer'
import { Marker } from 'react-leaflet/Marker'
import { Popup } from 'react-leaflet/Popup'
import { TileLayer } from 'react-leaflet/TileLayer'
import { LayersControl, LayerGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, { Component, useState, useEffect } from 'react';
// import { Deserializer } from 'jsonapi-serializer';
import Select from 'react-select';
import {Formik, Form, Field} from 'formik'
import useAuth from '../../hooks/useAuth';
import { element, elementType } from 'prop-types';

import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
});

L.Marker.prototype.options.icon = DefaultIcon;

const CreatePosition = function CreatePosition() {
    const { currentUser } = useAuth();
    const center = [-10.1,10.1]
    const [marker, setMarker] = useState([-10.1, 10.1])

    addMarker = (e) => {
        const {markers} = this.state
        markers.push(e.latlng)
        this.setState({marker})
      }

    return (
        <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
            <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  </MapContainer>
    )

}

export default CreatePosition;