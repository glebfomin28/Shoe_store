import React from 'react';
import styles from './ItemShoes.module.css';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setIdItem} from "../../store/reducers";


export const ItemShoes = ({ info }) => {

  const d = useDispatch()
  const navigate = useNavigate()

  const goToOrder = () => {
    d(setIdItem(info.id))
    navigate(`/catalog/${info.id}.html`)
  }

  return (
    <div className={styles.item}>
      <img className={styles.item__img} src={info.images[0] || info.images[1] } alt=''/>
      <div className={styles.item__name}>{info.title}</div>
      <div className={styles.item__price}>{info.price} руб.</div>
      <button
        className={styles.item__button}
        onClick={goToOrder}
      >
        Заказать
      </button>
    </div>
  );
}

