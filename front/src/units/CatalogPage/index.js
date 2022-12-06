import React, {useEffect} from 'react';
import styles from './Catalog.module.css';
import {CatalogList, CatalogTabs} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {cleaningValues, SELECTOR_SEARCH, setCatalogValue} from "../../store/reducers";

export const CatalogPage = () => {
  const { catalogValue } = useSelector(SELECTOR_SEARCH)
  const d = useDispatch()

  useEffect(() => {
    return () => d(cleaningValues())
  },[])


  return (
    <div className={styles.catalog}>
      <h4 className={styles.catalog__title}>Каталог</h4>

      <input
        className={styles.catalog__input}
        type="text"
        value={catalogValue}
        onChange={(e) => d(setCatalogValue(e.target.value))}
        placeholder="Поиск"

      />

      <CatalogTabs/>

      <CatalogList/>
    </div>
  );
}

