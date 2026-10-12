import React from 'react';
import MarkerImg from '../images/marker.svg';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import '../styles/pages/orphanages-maps.css'
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
function OrphanagesMaps() {
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={MarkerImg} alt="Happy" />

                    <h2>Escolha um Orfanato no Mapa</h2>
                    <p> Muitas crianças estão esperando a sua visita :) </p>
                </header>
                <footer>
                    <strong>Inhumas</strong>
                    <span>Góias</span>
                </footer>

            </aside>
            <MapContainer
            center={[-16.3565191,-49.4974716]}
            zoom={15}
            style={{width:'100%', height:'100%'}}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
            
            <Link to="" className='create-orphanage'>
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    )
}


export default OrphanagesMaps;
