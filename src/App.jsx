import produtos from './constants/produtos.json';
import { api } from "./api/rmApi";
import { useState, useEffect } from 'react';
import { Card } from './components/Card';
import { CardData } from './components/CardData';
import { Alert } from './components/Alert';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Modal from './components/Modal';
import style from './App.module.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import "leaflet-defaulticon-compatibility";

function App() {
  const [show, setShow] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(null);
  const position = [-25.424166329518574, -49.272255956756595]

  const handleOpenAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleOpenModal = (index) => {
    setSelectedCharacterIndex(index);
  };

  useEffect(() => {
    api.get(`/character/?page=${page}&name=${nameFilter}`).then((response) => {
      if (!response.data.results) {
        handleOpenAlert();
      }
      setData(response.data.results);
    }).catch((error) => {
      if (error.response.status === 404) {
        handleOpenAlert();
      }
      console.error(error);
    });
  }, [page, nameFilter]);

  return (
    <>
      <div className={style.wrapBtns}>
        <button onClick={() => setShow("prod")}>Produtos</button>
        <button onClick={() => setShow("api")}>API</button>
        <button onClick={() => setShow("map")}>Mapa</button>
      </div>
      <div className={style.wrapPage}>
        <h1>Exercícios de manutenção</h1>
        <div>
          {show === "api" && (
            <>
              <input type="text" placeholder="1/43" value={page} onChange={(event) => setPage(event.target.value)} />
              <input type="text" placeholder="Filter by name" value={nameFilter} onChange={(event) => setNameFilter(event.target.value)} />
            </>
          )}
        </div>
        {show === "prod" &&
          <>
            <h2>Showroom de produtos</h2>
            <div className={style.wrapCards}>
              {produtos.map((item) => (
                <Card
                  key={item.id}
                  name={item.name}
                  desc={item.desc}
                  value={item.value}
                  image={item.image}
                  status={item.status}
                />
              ))}
            </div>
          </>
        }
        {show === "api" &&
          <>
            <h2>Rick and Morty API</h2>
            <div className={style.wrapCardsData}>
              {data.map((item, index) => {
                return (
                  <div style={{display: 'flex', flexDirection:'column', alignItems: 'center'}} key={item.id}>
                    <CardData name={item.name} desc={item.species} value={item.gender} image={item.image} />
                    <button onClick={() => handleOpenModal(index)}>Info</button>
                  </div>
                );
              })}
            </div>
          </>
        }
        {selectedCharacterIndex !== null && (
          <Modal character={data[selectedCharacterIndex]} closeModal={() => setSelectedCharacterIndex(null)} />
        )}
        {show === "map" &&
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ margin: '0 0 1em 0' }}>MAPA:</h2>
            <MapContainer center={position} zoom={19} scrollWheelZoom={false} style={{ width: '50em', height: '50em' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        }
      </div>
      {showAlert && <Alert message="Esta página não contém este personagem" onClose={handleCloseAlert} />}
    </>
  );
}

export default App;