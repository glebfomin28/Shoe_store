import React, {useEffect} from 'react';
import styles from './ErrorPage404.module.css';
import {useNavigate} from "react-router-dom";

export const ErrorPage404 = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const Timeout = setTimeout(function(){
      // window.location.reload();
      navigate('/')
      console.log(404)
    }, 5000);
    return ()=> clearTimeout(Timeout)
  },[])

  return (
    <div className={styles.error}>
        <h2>Страница не найдена</h2>
        <p>
          Извините, такая страница не найдена!
        </p>
        <p>
          Через 5 секунд будет повторное подключение
        </p>
    </div>
  );
}

