import React, {useEffect} from 'react';
import styles from './СartTable.module.css';
import {useDispatch, useSelector} from "react-redux";
import {SELECTOR_CART_ITEMS, setFullPrice} from "../../../../store/reducers";
import {CartItem} from "./CartItem";


export const CartTable = () => {

  const { cartList, sumPrice } = useSelector(SELECTOR_CART_ITEMS)
  // const d = useDispatch()

  // useEffect(() => {
  //   d(setFullPrice())
  // }, [cartList])


  const printCartItem = cartList.map((el,index) => {
      return <CartItem key={el.id + Math.random()*100} info={el} number={index + 1}/>
  })

  console.log(cartList)

  return (
    <div className={styles.cart}>
      <h4>Ваш заказ</h4>
      <hr/>
      {printCartItem}
      <hr/>
      <div className={styles.cart__sumPrice}>
        <div className={styles.cart__sumPrice__text}> Итого:</div>
        <div className={styles.cart__sumPrice__price}>{sumPrice} ₽</div>
      </div>
    </div>
  );
}

