import React from 'react';
import styles from './PriceFilters.module.css';
import 'rc-slider/assets/index.css';
import {useDispatch, useSelector} from "react-redux";
import { FILTERS_ITEMS, setMaxPrice, setMinPrice} from "../../../../../store/reducers";
export const PriceFilter = () => {
  const d = useDispatch()

  const { filersObj } = useSelector(FILTERS_ITEMS)
  const refactorPrice = () => {
    if (filersObj.minPrice >= filersObj.maxPrice) {
      d(setMaxPrice( Number(filersObj.minPrice) + 400))
    }
    if (filersObj.minPrice === '') d(setMinPrice(500))
  }
  const changeMinPrice = (e) => {
      d(setMinPrice(Number(e.target.value)))
  }

  const changeMaxPrice = (e) => {
      d(setMaxPrice(Number(e.target.value)))
  }
  const onClear = () => {
    setMinPrice(500)
    setMaxPrice(1000)
  }

  return (
    <div className={styles.price}>
      <div className={styles.price__text}>
        <p>От</p>
        <p>До</p>
      </div>
      <input
        type="text"
        className={styles.price__min}
        value={filersObj.minPrice}
        onChange={changeMinPrice}
        onBlur={refactorPrice}
      />
      <input
        type="text"
        className={styles.price__max}
        value={filersObj.maxPrice}
        onChange={changeMaxPrice}
        onBlur={refactorPrice}
      />
      <div className={styles.price__clear} onClick={onClear}>Сбросить</div>
    </div>
  );
}

