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

export const CatalogList = () => {

  const { catalogTabs, catalog } = useSelector(SELECTOR_SHOES_LIST)
  const { catalogValue } = useSelector(SELECTOR_SEARCH)

  const d = useDispatch()

  const getCategoryList = (URL) => {
    try {
      fetch(URL)
        .then( (res) => res.json() )
        .then( (json) => d(setCatalog(json)) )

    } catch (e) {
      return console.log(e)
    }
  }
  useEffect(() => {
    if (catalogTabs === 11) {
      getCategoryList(`http://localhost:7070/api/items`)
    } else {
      getCategoryList(`http://localhost:7070/api/items?categoryId=${catalogTabs}`)
    }

  },[catalogTabs])


  const searchCatalogItems = () => {
    try {
      fetch(`http://localhost:7070/api/items?q=${catalogValue}`)
        .then( (res) => res.json() )
        .then( (json) => {
          d(setCatalogFilter(json))
        })
    } catch (e) {
      return console.log(e)
    }
  }

  useEffect(() => {
    if (catalogValue !== '') searchCatalogItems()
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

