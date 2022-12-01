import React, {useEffect} from 'react';
import styles from './СartTable.module.css';
import {useDispatch, useSelector} from "react-redux";
import {SELECTOR_ORDER_ITEM, setFullPrice} from "../../../store/reducers";
import {TableItem} from "./TableItem";


export const CartTable = () => {

  const { orderList, sumPrice } = useSelector(SELECTOR_ORDER_ITEM)
  const d = useDispatch()

  const printTableItem = orderList.map((el,idx) => {
      return <TableItem key={el.id} info={el} idx={idx}/>
    }

  )
  useEffect(() => {
    d(setFullPrice())
  }, [orderList])

  return (
    <>
      <table className={styles.cart__table}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Размер</th>
            <th scope="col">Кол-во</th>
            <th scope="col">Стоимость</th>
            <th scope="col">Итого</th>
            <th scope="col">Действия</th>
          </tr>
        </thead>
        <tbody>
          {printTableItem}
        <tr>
          <td colSpan="5" className="text-right">Общая стоимость</td>
          <td>{sumPrice} руб.</td>
        </tr>
        </tbody>
      </table>
    </>
  );
}

