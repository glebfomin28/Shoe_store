import React from 'react';
import {Bestsellers, Сatalog} from "./units";
import styles from './styles/HomePage.module.css';

export const HomePage = () => {

  return (
    <div className={styles.home}>
      <Bestsellers/>
      <Сatalog/>
    </div>
  );
}

