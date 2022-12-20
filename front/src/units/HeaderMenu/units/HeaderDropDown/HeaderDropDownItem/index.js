import React from 'react';
import styles from './HeaderDropDownItem.module.css';
import {useNavigate} from "react-router-dom";
import {deleteItem, setIdItem} from "../../../../../store/reducers";
import {useDispatch} from "react-redux";

export const HeaderDropDownItem = ({ item }) => {
  const d = useDispatch()
  const navigate = useNavigate()


  const goToOrder = () => {
    d(setIdItem(item.id))
    navigate(`/catalog/${item.id}.html`)
  }

  const onDeleteItem = (e) => {
    e.stopPropagation()
    d(deleteItem(item.id))
  }

  return (
    <div className={styles.dropDownItem} onClick={goToOrder}>
      <img
        className={styles.dropDownItem__img}
        src={item.images[0]}
        alt=''
      />
      <div>
        <div className={styles.dropDownItem__name}>{ item.name } </div>

        <div className={styles.dropDownItem__bottom}>
          <div>Размер { item.size }</div>
          <div>x { item.amount }</div>
          <div className={styles.dropDownItem__bottom__price}>{ item.fullPrice} ₽</div>
        </div>

        <div className={styles.dropDownItem__delete} onClick={onDeleteItem}>×</div>

      </div>
    </div>
  );
}

