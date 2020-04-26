import React from 'react';
import { NavLink } from 'react-router-dom';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import logoImg from '../../../src/assets/img/bitcoin.png'


export default () => {
  return (
    <nav className="main-navbar">
      <div className="logo-container">
        <NavLink exact to="/">
          <img src={logoImg} alt={'coins'} />
          <span>MR. Bitcoin</span>
        </NavLink>
      </div>
      <BurgerMenu />
    </nav>
  );
};