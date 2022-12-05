import React from 'react';
import styles from './styles/Bestsllers.module.css'
import {ItemShoes, Preloader} from "../../../../components";
import {useSelector} from "react-redux";
import {SELECTOR_SHOES_LIST} from "../../../../store/reducers";

export const Bestsellers = () => {
  const { bestseller } = useSelector(SELECTOR_SHOES_LIST)

  const printItemsShoesList = bestseller.map(el =>
    <ItemShoes key={el.id} info={el}/>
  )

  return (
    <div className={styles.hit}>
      <h4 className={styles.hit__title}>Хиты продаж!</h4>
      {bestseller.length !== 0?
        <div className={styles.hit__list}>
          {printItemsShoesList}
        </div>
          : <Preloader/>}
    </div>
  );
}

