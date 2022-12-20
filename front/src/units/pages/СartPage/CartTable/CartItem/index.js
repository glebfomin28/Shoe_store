
import React, {useEffect} from 'react';
import styles from './СartItem.module.css';
import {useDispatch} from "react-redux";
import {
  deleteItem,
  setChangeAmountMinus,
  setChangeAmountPlus,
  setChangeFullPrice, setIdItem
} from "../../../../../store/reducers";
import {useNavigate} from "react-router-dom";


export const CartItem = ({ info, number }) => {
  console.log(info.id)
  const d = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    d(setChangeFullPrice(info.id))
  }, [info.amount])

  const goToOrder = () => {
    const id = info.id.split('-')[0]
    d(setIdItem(id))
    navigate(`/catalog/${id}.html`)
  }


  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItem__number}>{number}</div>
      <div
        className={styles.cartItem__name}
        onClick={goToOrder}
      >
        {info.name}
      </div>
      <div  className={styles.cartItem__size} >{info.size}</div>
      <div className={styles.cartItem__amount}>
        <button
          className={styles.cartItem__amount__action}
          onClick={() => d(setChangeAmountMinus(info.id))}
        >-</button>
        {info.amount}
        <button
          className={styles.cartItem__amount__action}
          onClick={() => d(setChangeAmountPlus(info.id))}
        >+</button>
      </div>
      <div className={styles.cartItem__price}>{info.fullPrice} ₽</div>
      <div
        className={styles.cartItem__delete}
        onClick={() => d(deleteItem(info.id))}
      >✕</div>
    </div>

  );
}

