import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './styles.css';

const Home: React.FC = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="Ecoleta" />

          <Link to="/login">
            <FiLogIn size={24} />
            Login
          </Link>
        </header>

        <main>
          <h1>Helping your business reach its peak</h1>
          <p>
            We are a specialized recommendation platform to estimulate your
            business engagement, visibility and innovation, specially during
            covid-19 post-pandemic impacts.
          </p>

          <Link to="/register">
            <span>
              <FiLogIn />
            </span>
            <strong>Check us out</strong>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Home;
