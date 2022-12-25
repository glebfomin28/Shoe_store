import React, {useEffect, useState} from 'react';
import styles from './СartPage.module.css';
import {useDispatch, useSelector} from "react-redux";
import {SELECTOR_CART_ITEMS, setFullPrice} from "../../../store/reducers";
import {CartTable} from "./CartTable";
import {CartOrder} from "./CartOrder";
import {ModalWindow} from "./ModalWindow";


export const CartPage = () => {
  const { cartList } = useSelector(SELECTOR_CART_ITEMS)
  const d = useDispatch()

  const [success, setSuccess] = useState(false)

  useEffect(() => {
    d(setFullPrice())
  }, [cartList])

  useEffect(() => {
    return () => setSuccess(false)
  }, [])

  return (
    <div className={styles.cart}>
      <h2 className={styles.cart__center}>Корзина</h2>
      {cartList.length !== 0?
        <>
          <CartTable/>
          <CartOrder setSuccess={setSuccess}/>
        </>
        : (
          <div className={styles.cart__empty}>
            Корзина пуста
            <p className={styles.cart__empty__grey}>
              Загляните на главную, чтобы выбрать товары или найдите нужное в поиске
            </p>
          </div>)
      }
      {success? <ModalWindow setSuccess={setSuccess}/> : null}
    </div>
  );
}

