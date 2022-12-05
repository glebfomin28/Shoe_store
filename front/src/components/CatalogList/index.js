import React, { useEffect } from 'react';
import styles from "./CatalogList.module.css";
import {ItemShoes} from "../ItemShoes";
import {Preloader} from "../Preloader";
import {useDispatch, useSelector} from "react-redux";
import {LoadMore} from "../LoadMore";
import {
  SELECTOR_SEARCH,
  SELECTOR_SHOES_LIST,
  setCatalog,
  setCatalogFilter
} from "../../store/reducers";
import {getCatalogList, searchCatalogItems} from "../../fetch";

export const CatalogList = () => {

  const { catalogTabs, catalog } = useSelector(SELECTOR_SHOES_LIST)
  const { catalogValue } = useSelector(SELECTOR_SEARCH)

  const d = useDispatch()

  useEffect(() => {
    if (catalogValue === '') {
      if (catalogTabs === 11) {
        getCatalogList(d, setCatalog, `http://localhost:7070/api/items`)
      } else {
        getCatalogList(d, setCatalog,`http://localhost:7070/api/items?categoryId=${catalogTabs}`)
      }
    }

  },[catalogTabs])

  useEffect(() => {
    const Debounce = setTimeout(() => {
      searchCatalogItems(d, setCatalogFilter, catalogValue)
    }, 450)

    return () => clearTimeout(Debounce)
  }, [catalogValue, catalogTabs])


  const printCatalogList = catalog.map(el =>
    <ItemShoes key={el.id} info={el}/>
  )

  return (
    <>
      <div className={styles.catalog}>
        {catalog.length === 0
          ? <Preloader/>
          : <>{printCatalogList}</>
        }
      </div>
      {catalog.length === 0? null : <LoadMore/>}
    </>

  );
}

