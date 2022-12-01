import React from 'react';
import styles from './ErrorPage404.module.css';

export const ErrorPage404 = () => {

  return (
    <div className={styles.error}>
        <h2>Страница не найдена</h2>
        <p>
          Извините, такая страница не найдена!
        </p>
    </div>
  );
}

