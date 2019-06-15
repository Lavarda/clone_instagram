import React from 'react';
import './style.css';
import logo from '../../assets/logo.svg';
import camera from '../../assets/camera.svg';
import { Link } from 'react-router-dom';


export default function Header() {
  return (
    <header id="main-header">
      <div className="header-content">
        <Link to="/">
          <img src={logo} alt="InstaRocket"></img>
        </Link>
        <Link to="/new">
          <img src={camera} alt="EnviarPublicação"></img>
        </Link>
      </div>
    </header>
  );
}
