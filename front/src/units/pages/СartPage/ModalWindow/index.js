import React from 'react';
import styles from './ModalWindow.module.css';
import {useNavigate} from "react-router-dom";


export const ModalWindow = ({ setSuccess }) => {
  const navigate = useNavigate()

  const goHome = () => {
    navigate("/")
    setSuccess(false)
  }

  return (
    <>
      <div
        className={styles.modal}
        onClick={() => setSuccess(false)}
      >
        <div className={styles.modal__window}>
          <div>
            Заказ успешно оформлен!
          </div>
          <button
            className={styles.modal__window__button}
            onClick={goHome}
          >
            Перейти в главную
          </button>
        </div>
      </div>
    </>
  );
}

