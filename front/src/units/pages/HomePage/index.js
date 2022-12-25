import React from 'react';
import {Bestsellers, HeaderImag} from "./units";
import styles from './styles/HomePage.module.css';

export const HomePage = () => {

  return (
    <div className={styles.home}>
      <HeaderImag/>
      <Bestsellers/>
    </div>
  );
}

