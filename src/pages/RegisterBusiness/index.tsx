/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-use-before-define */
import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useCallback,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { toast } from 'react-toastify';
import api from '../../services/api';
import ibge from '../../services/ibge';

import Dropzone from '../../components/Dropzone';

import './styles.css';

import logo from '../../assets/logo.svg';

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface IBGEUFResponse {
  sigla: string;
  nome: string;
}

interface IBGECityResponse {
  nome: string;
}

const RegisterBusiness: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      title: 'I already have a business',
      image_url: '',
    },
    {
      id: 2,
      title: 'I want to start a business',
      image_url: '',
    },
  ]);
  const [ufs, setUfs] = useState<IBGEUFResponse[]>([]);
  const [cities, setCities] = useState<IBGECityResponse[]>([]);

  const [formData, setFormData] = useState({
    cnpj: '',
    password: '',
    email: '',
    forcas: '',
    fraquezas: '',
    oportunidades: '',
    ameacas: '',
  });

  const [selectedFile, setSelectedFile] = useState<File>();
  const [selectedItem, setSelectedItem] = useState<number>(-1);
  const [selectedUf, setSelectedUf] = useState<string>('0');
  const [selectedCity, setSelectedCity] = useState<string>('0');
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const history = useHistory();

  // Get Current Position
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        setInitialPosition([latitude, longitude]);
      },
      () => {
        toast.error('❌ Oops! Algo deu errado =/', toastOptions);
      },
      {
        timeout: 30000,
        enableHighAccuracy: true,
      },
    );
  }, []);

  // Load items
  // useEffect(() => {
  //   async function loadItems() {
  //     const response = await api.get('/items');

  //     setItems(response.data);
  //   }

  //   loadItems();
  // }, []);

  // Load UFs
  useEffect(() => {
    async function loadUfs() {
      const response = await ibge.get<IBGEUFResponse[]>(
        'localidades/estados?orderBy=nome',
      );

      const ufInitials = response.data.map(uf => {
        return {
          sigla: uf.sigla,
          nome: uf.nome,
        };
      });

      setUfs(ufInitials);
    }

    loadUfs();
  }, []);

  // Load Cities
  useEffect(() => {
    async function loadCities() {
      if (selectedUf === '0') return;

      const response = await ibge.get<IBGECityResponse[]>(
        `localidades/estados/${selectedUf}/municipios`,
      );

      const cityNames = response.data.map(city => {
        return { nome: city.nome };
      });

      setCities(cityNames);
    }

    loadCities();
  }, [selectedUf]);

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedUf(event.target.value);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedCity(event.target.value);
  }

  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  function handleSelectItem(id: number) {
    setSelectedItem(id);
  }

  // Toastify configurations
  const toastOptions = {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      try {
        const {
          cnpj,
          email,
          password,
          forcas,
          fraquezas,
          oportunidades,
          ameacas,
        } = formData;
        const [latitude, longitude] = selectedPosition;

        // const data = new FormData();

        await api.post('auth/register', {
          cnpj,
          password,
          email,
          forcas,
          fraquezas,
          oportunidades,
          ameacas,
        });
        // toast('✅ Criado com sucesso!', toastOptions);

        history.push('/');
      } catch (err) {
        toast.error('❌ Erro!', toastOptions);
      }
    },
    [
      formData,
      selectedCity,
      selectedItem,
      selectedPosition,
      selectedUf,
      history,
      selectedFile,
    ],
  );

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="businessPeak" />

        <Link to="/">
          <FiArrowLeft />
          GoBack
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>
          Register
          {/* <br /> ponto de coleta */}
        </h1>

        {/* <Dropzone onFileUploaded={setSelectedFile} /> */}

        <fieldset>
          <legend>
            <h2>Info</h2>
          </legend>

          <div className="field">
            <label htmlFor="cnpj">CNPJ</label>
            <input
              onChange={handleInputChange}
              type="text"
              name="cnpj"
              id="cnpj"
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                onChange={handleInputChange}
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                onChange={handleInputChange}
                type="password"
                name="password"
                id="password"
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Address</h2>
            <span>Is this the location of your business?</span>
          </legend>

          <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition} />
          </Map>
          {/*
          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>

              <select onChange={handleSelectUf} name="uf" id="uf">
                <option value="0">Selecione uma UF</option>
                {ufs?.map(uf => (
                  <option key={uf.nome} value={uf.sigla}>
                    {uf.sigla}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select onChange={handleSelectCity} name="city" id="city">
                <option value="0">Selecione uma cidade</option>

                {cities.map(city => (
                  <option key={city.nome} value={city.nome}>
                    {city.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
         */}
        </fieldset>

        <fieldset>
          <legend>
            <h2>What's your current situation</h2>
            {/* <span>Selecione um ou mais itens abaixo</span> */}
          </legend>

          <ul className="items-grid">
            {items.map(item => (
              <li
                key={item.id}
                onClick={() => handleSelectItem(item.id)}
                className={selectedItem === item.id ? 'selected' : ''}
              >
                {item.image_url && (
                  <img src={item.image_url} alt={item.title} />
                )}
                <span>{item.title}</span>
              </li>
            ))}
          </ul>

          <div className="field">
            <label htmlFor="forcas">Strong points</label>
            <textarea
              onChange={handleTextAreaChange}
              name="forcas"
              id="forcas"
            />
          </div>
          <div className="field">
            <label htmlFor="fraquezas">Weak points</label>
            <textarea
              onChange={handleTextAreaChange}
              name="fraquezas"
              id="fraquezas"
            />
          </div>
          <div className="field">
            <label htmlFor="oportunidades">Oportunities</label>
            <textarea
              onChange={handleTextAreaChange}
              name="oportunidades"
              id="oportunidades"
            />
          </div>
          <div className="field">
            <label htmlFor="ameacas">Oportunities</label>
            <textarea
              onChange={handleTextAreaChange}
              name="ameacas"
              id="ameacas"
            />
          </div>
        </fieldset>

        <button type="submit">Finish</button>
      </form>
    </div>
  );
};

export default RegisterBusiness;
