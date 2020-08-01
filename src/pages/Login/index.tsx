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
import { useAuth } from '../../hooks/auth';

const Login: React.FC = () => {
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    password: '',
    email: '',
  });

  const history = useHistory();

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      try {
        const { email, password } = formData;

        // const data = new FormData();

        await signIn({
          email,
          password,
        });
        // toast('✅ Criado com sucesso!', toastOptions);

        history.push('/dashboard');
      } catch (err) {
        // toast.error('❌ Erro!', toastOptions);
      }
    },
    [formData, history],
  );

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

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
          Login
          {/* <br /> ponto de coleta */}
        </h1>

        {/* <Dropzone onFileUploaded={setSelectedFile} /> */}

        <fieldset>
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
            <label htmlFor="password">Senha</label>
            <input
              onChange={handleInputChange}
              type="password"
              name="password"
              id="password"
            />
          </div>
          {/* <div className="field-group">
          </div> */}
        </fieldset>

        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Login;
