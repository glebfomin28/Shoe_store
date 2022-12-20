import React from 'react';
import styles from "./CatalogTabs.module.css";
import {useDispatch, useSelector} from "react-redux";
import {SELECTOR_SHOES_STORE_ACTIONS, setCatalogTabs} from "../../store/reducers";
import {useGetCategoriesQuery} from "../../store/RTKQuery";
import {Preloader} from "../Preloader";
import {useNavigate} from "react-router-dom";

export const CatalogTabs = () => {

  const {data = [], isLoading, error} = useGetCategoriesQuery()
  const { catalogTabs } = useSelector(SELECTOR_SHOES_STORE_ACTIONS)
  const d = useDispatch()
  const navigate = useNavigate()

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
          navigate('*')
        : printFilterCell
      }
    </div>
  );
}