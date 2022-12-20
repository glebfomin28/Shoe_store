import React from 'react';
import styles from './styles/HeaderMenu.module.css';
import headerLogo from '../../img/header-logo.png';
import {useNavigate} from "react-router-dom";
import {HeaderImag, NavLinks, UserActions} from "./units";

export const HeaderMenu = () => {

  const navigate = useNavigate()

  return (
  <>
    <div className={styles.header}>
      <div className={styles.header__center}>
        <img
          className={styles.header__logo}
          src={headerLogo}
          alt="Bosa Noga"
          onClick={() => navigate("/")}
        />
        <div className={styles.header__row}>
          <NavLinks/>
          <UserActions/>
        </div>

      </div>
    </div>
    <HeaderImag/>
  </>
  );
}

