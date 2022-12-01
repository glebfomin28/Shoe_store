import React from 'react';
import styles from './ModalWindow.module.css';
import {useNavigate} from "react-router-dom";
import {setSuccess} from "../../../store/reducers";
import {useDispatch} from "react-redux";


export const ModalWindow = () => {
  const navigate = useNavigate()
  const d = useDispatch()

  const goHome = () => {
    navigate("/")
    d(setSuccess(0))
  }

  return (
    <>
      <div
        className={styles.modal}
        onClick={() => d(setSuccess(0))}
      >
        <div className={styles.modal__window}>
          <div>Благодарим за покупку!</div>
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

