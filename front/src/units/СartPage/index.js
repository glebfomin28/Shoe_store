import React, {useEffect} from 'react';
import styles from './СartPage.module.css';
import {useDispatch, useSelector} from "react-redux";
import {SELECTOR_FINISH_ORDERING, SELECTOR_ORDER_ITEM, setFullPrice, setSuccess} from "../../store/reducers";
import {CartTable} from "./CartTable";
import {CartOrder} from "./CartOrder";
import {ModalWindow} from "./ModalWindow";


export const CartPage = () => {
  const { orderList } = useSelector(SELECTOR_ORDER_ITEM)
  const { success } = useSelector(SELECTOR_FINISH_ORDERING)
  const d = useDispatch()

  useEffect(() => {
    d(setFullPrice())
  }, [orderList])

  useEffect(() => {
    console.log('')
    return () => d(setSuccess(0))
  }, [])


  return (
    <div >
      <h2 className={styles.cart__center}>Корзина</h2>
      {orderList.length !== 0?
        <>
          <CartTable/>
          <CartOrder/>
        </>
        :
        <div className={styles.cart__center}>Корзина пуста!</div>
      }
      {success === 1? <ModalWindow/> : null}
    </div>
  );
}

