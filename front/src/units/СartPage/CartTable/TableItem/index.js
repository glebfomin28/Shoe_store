import React from 'react';
import styles from './TableItem.module.css'
import {useDispatch} from "react-redux";
import {deleteItem} from "../../../../store/reducers";

export const TableItem = ({ idx, info }) => {
  const d = useDispatch()

  return (
    <tr >
      <td >{idx + 1}</td>
      <td>{info.name}</td>
      <td>{info.size}</td>
      <td>{info.amount}</td>
      <td>{info.price} руб.</td>
      <td>{info.fullPrice} руб.</td>
      <td>
        <button
          className={styles.button}
          onClick={() => d(deleteItem(info.id))}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
}

