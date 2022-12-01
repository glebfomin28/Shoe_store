import React, {useEffect} from 'react';
import styles from "./CatalogTabs.module.css";
import {useDispatch, useSelector} from "react-redux";
import {SELECTOR_SHOES_LIST, setCatalogTabs, setCategories} from "../../store/reducers/shoesList";

export const CatalogTabs = () => {

  const { categories, catalogTabs } = useSelector(SELECTOR_SHOES_LIST)
  const d = useDispatch()

  const getCategoryList = () => {
    try {
      fetch("http://localhost:7070/api/categories")
        .then( (res) => res.json() )
        .then( (json) => d(setCategories(json)) )

    } catch (e) {
      return console.log(e)
    }
  }
  useEffect(() => {
    getCategoryList()
  },[])

  const printFilterCell = categories.map(el =>
    <div
      className={catalogTabs !== el.id
        ? styles.filter__item
        : styles.filter__item__active}
      key={el.id}
      onClick={() => d(setCatalogTabs(el.id))}
    >
      {el.title}
    </div>
  )

  return (
    <div className={styles.filter}>
      {printFilterCell}
    </div>
  );
}