import React, { useState} from 'react';
import styles from './OrderItem.module.css';
import {setIdItem} from "../../../../store/reducers";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";


export const OrderItem = ({ item }) => {

  const d = useDispatch()
  const navigate = useNavigate()
  const [show, setShow] = useState(false)

  const goToOrder = (id) => {
    d(setIdItem(id))
    navigate(`/catalog/${id}.html`)
  }

  return (
    <div className={styles.orders__item}  onClick={() => setShow(p => !p)}>
      <div
        className={styles.orders__item__action}
        style={{transform: `rotate(${show? -90 : 0}deg)`}}
      >▶</div>

      <div className={styles.orders__item__title}>
        <div className={styles.orders__item__title__order}>Заказ {item.id}</div>
        <div className={styles.orders__item__title__date}>{item.date}</div>
        <div className={styles.orders__item__title__price}>{item.price} ₽ </div>
      </div>

      <div
        className={styles.orders__item__names}
        style={{maxHeight: `${show? 50 * item.items.length + 50: 0}px`}}
      >
        <div className={styles.orders__item__names__block}>
          <div className={styles.orders__item__names__block__item__head}>Наименование </div>
          <div className={styles.orders__item__names__block__size__head}>Российский размер </div>
          <div className={styles.orders__item__names__block__amount__head}>Количество</div>
          <div className={styles.orders__item__names__block__price__head}>Цена</div>
        </div>
        {item.items.map((el, index) =>
          <div key={item.id + '-' + index} className={styles.orders__item__names__block}>
            <div className={styles.orders__item__names__block__item}
              onClick={(e) => goToOrder(el.id)}
            >
              {el.name}
            </div>
            <div className={styles.orders__item__names__block__size}>
              {el.size}
            </div>
            <div className={styles.orders__item__names__block__amount}>
              x{el.amount}
            </div>
            <div
              className={styles.orders__item__names__block__price}>
              {el.fullPrice} ₽
            </div>
          </div>
        )}
      </div>
    </div>

  );
}

