import React from 'react';
import styles from './Preloader.module.css';


export const Preloader = () => {

  return (
    <div className={styles.preloader}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

