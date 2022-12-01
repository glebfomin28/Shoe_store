import React from 'react';
import styles from './HeaderImag.module.css';
import hat from '../../../../img/banner.jpg';

export const HeaderImag = () => {
  return (
    <div className={styles.banner}>
      <img className={styles.banner__img} src={hat} alt=''/>
      <div className={styles.banner__header}>К весне готовы!</div>
    </div>
  );
}

