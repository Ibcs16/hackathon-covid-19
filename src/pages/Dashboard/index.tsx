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
import { FiArrowLeft, FiLogOut } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { toast } from 'react-toastify';
import api from '../../services/api';
import ibge from '../../services/ibge';

import Dropzone from '../../components/Dropzone';

import './styles.css';

import {
  Content,
  BusinessInfo,
  Business,
  CanHelpContainer,
  CanHelpCard,
} from './styles';

import logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  const history = useHistory();

  useEffect(() => {
    api
      .get('consultacnpj', {
        data: {
          cnpj: '36526752000138',
        },
      })
      .then(res => console.log(res));
  }, []);

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="businessPeak" />

        <Link to="/" onClick={() => signOut()}>
          <FiLogOut />
          Logout
        </Link>
      </header>
      <Content>
        <section>
          <h2>Your information</h2>

          <Business>
            <BusinessInfo>
              <img
                src="https://avatars0.githubusercontent.com/u/18746683?s=460&u=79ec5c9e17593c1b665d258569ea6564d28bd7f2&v=4"
                alt="Empresa"
              />
              <div>
                <strong>Name - CNPJ</strong>
                <span> Other infos</span>
              </div>
            </BusinessInfo>
          </Business>
        </section>
        <section>
          <h2>Products trending in your area</h2>
          <ul>
            <li>- Shoes</li>
            <li>- Delivery</li>
            <li>- Mask for protecting against covid-19</li>
          </ul>
        </section>

        <section>
          <h2>Tips for your business</h2>
          <ul>
            <li>
              - Try creating a youtube chanel to engage with your costumer
            </li>
            <li>- You should start selling online throught on facebook</li>
            <li>
              - Sell only to locals, that way you can guarantee delivered in
              time
            </li>
          </ul>
        </section>
        <section>
          <h2>People that could help you</h2>
          <CanHelpContainer>
            <CanHelpCard>
              <img
                src="https://randomuser.me/api/portraits/men/97.jpg"
                alt="Empresa"
              />
              <strong>Jhon Stewart</strong>
              <span>Tech</span>
              <span>37 998742175</span>
              <span>email@mail.com</span>
              <button type="button">Contact</button>
            </CanHelpCard>
          </CanHelpContainer>
        </section>
      </Content>
    </div>
  );
};

export default Dashboard;
