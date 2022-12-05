import React, {useState} from 'react';
import styles from './СartOrder.module.css';
import {
  deleteOrderList,
  SELECTOR_FINISH_ORDERING,
  SELECTOR_ORDER_ITEM,
  setAddress,
  setCheckbox,
  setPhone, setSuccess
} from "../../../store/reducers";
import {useDispatch, useSelector} from "react-redux";
import {Preloader} from "../../../components";
import {orderRegistration} from "../../../fetch";


export const CartOrder = () => {
  const d = useDispatch()
  const { sumPrice } = useSelector(SELECTOR_ORDER_ITEM)
  const { phone, address, checkbox, success } = useSelector(SELECTOR_FINISH_ORDERING)

  const [loaded, setLoaded] = useState(false)

  const jsonOrderObj = {
    "owner": {
      "phone": phone,
      "address": address,
    },
    "items": [
      {
        "id": 1,
        "price": sumPrice,
        "count": 1
      }
    ]
  }

  const sendOrder = () => {
    if (phone.trim () !== '' && address.trim () !== '' && checkbox) {
      orderRegistration(
        d,
        setSuccess,
        setPhone,
        setAddress,
        setCheckbox,
        deleteOrderList,
        setLoaded,
        jsonOrderObj
      )
    }
  }

  return (
    <div className={styles.cartOrder}>
      <h2 className={styles.cartOrder__center}>Оформить заказ</h2>
      {loaded? <Preloader/> :
        <div className={styles.cartOrder__form}>
          <form>
            <div>Телефон</div>
            <input
              className={styles.cartOrder__form__input}
              value={phone}
              onChange={(e) => d(setPhone(e.target.value))}
              type="number"
              placeholder="Ваш телефон"
            />
            <div>Адрес доставки</div>
            <input
              className={styles.cartOrder__form__input}
              value={address}
              onChange={(e) => d(setAddress(e.target.value))}
              type="text"
              placeholder="Адрес доставки"
            />
            <input
              checked={checkbox}
              onChange={() => d(setCheckbox())}
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
      {success === -1?
        <div className={styles.cartOrder__error}>
          Что-то пошло не так... Пробуйте еще раз
        </div> : null}
    </div>
  );
}

