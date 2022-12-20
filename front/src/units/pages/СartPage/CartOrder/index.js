import React, {useEffect, useState} from 'react';
import styles from './СartOrder.module.css';
import {deleteCartList, SELECTOR_CART_ITEMS, setOrderList} from "../../../../store/reducers";
import {useDispatch, useSelector} from "react-redux";
import {Preloader} from "../../../../components";
import {useAddOrderMutation} from "../../../../store/RTKQuery";


export const CartOrder = ({ setSuccess }) => {
  const d = useDispatch()
  const { sumPrice, cartList } = useSelector(SELECTOR_CART_ITEMS)

  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [checkbox, setCheckbox] = useState(false)

  const [addOrder, {isLoading, isError, isSuccess }] = useAddOrderMutation()
  const dateOrder = `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`
  const jsonOrderObj = {
    "owner": {
      "phone": phone,
      "address": address,
    },
    "items": cartList,
    "price": sumPrice,
    "date": dateOrder
  }
  const sendOrder = async () => {
    if (phone.trim () !== '' && address.trim () !== '' && checkbox) {
      await addOrder(jsonOrderObj).unwrap()
        setPhone('')
        setAddress('')
        setCheckbox(false)
      }
  }

  useEffect(() => {
    if (isSuccess) {
      setSuccess(true)
      d(deleteCartList())
    }
  },[isSuccess])


  return (
    <div className={styles.cartOrder}>
      <h2 className={styles.cartOrder__center}>Оформить заказ</h2>
      {isLoading? <Preloader/> :

       <div className={styles.cartOrder__form}>
        <form>
          <div>Телефон</div>
          <input
            className={styles.cartOrder__form__input}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="number"
            placeholder="Ваш телефон"
          />
          <div>Адрес доставки</div>
          <input
            className={styles.cartOrder__form__input}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            placeholder="Адрес доставки"
          />
          <input
            checked={checkbox}
            onChange={() => setCheckbox(p => !p)}
            type="checkbox"
          /> Согласен с правилами доставки
        </form>
        <button
          className={styles.cartOrder__form__button}
          onClick={sendOrder}
        >
          Оформить
        </button>
      </div>
      }
      {isError?
      <div className={styles.cartOrder__error}>
        Что-то пошло не так... Пробуйте еще раз или повторить попытку позже.
      </div> : null}
    </div>
  );
}

