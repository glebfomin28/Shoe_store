import React from 'react';
import styles from "./CatalogTabs.module.css";
import {useDispatch, useSelector} from "react-redux";
import {SELECTOR_SHOES_LIST, setCatalogTabs} from "../../store/reducers";
import {useGetCategoriesQuery} from "../../store/RTKQuery";
import {Preloader} from "../Preloader";

export const CatalogTabs = () => {

  const {data = [], isLoading, error} = useGetCategoriesQuery()
  const { catalogTabs } = useSelector(SELECTOR_SHOES_LIST)
  const d = useDispatch()
  const printFilterCell = data.map(el =>
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
      {isLoading?
          <Preloader/>
        : error ?
        <div>ERROR</div>
        : printFilterCell
      }
    </div>
  );
}