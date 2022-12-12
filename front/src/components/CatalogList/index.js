import React, {useEffect, useState} from 'react';
import styles from "./CatalogList.module.css";
import {ItemShoes} from "../ItemShoes";
import {Preloader} from "../Preloader";
import {useSelector} from "react-redux";
import {
  SELECTOR_SEARCH,
  SELECTOR_SHOES_LIST,
} from "../../store/reducers";
import {searchCatalogItems} from "../../fetch";
import {useGetCatalogListQuery} from "../../store/RTKQuery";
import {LoadMore} from "../LoadMore";

export const CatalogList = () => {

  const { catalogTabs } = useSelector(SELECTOR_SHOES_LIST)
  const { catalogValue } = useSelector(SELECTOR_SEARCH)

  const {data = [], isLoading, error} = useGetCatalogListQuery(catalogTabs)

  const [catalogData, setCatalogData] = useState([])

  useEffect(() => {
    const Debounce = setTimeout(() => {
      if(catalogValue !== '') {
        searchCatalogItems(catalogValue, catalogTabs, setCatalogData)
      }
    }, 300)
    return () => clearTimeout(Debounce)
  }, [catalogValue, catalogTabs])

  const printCatalogList = data.map(el =>
    <ItemShoes key={el.id} info={el}/>
  )

  const printCatalogListSearch = catalogData.map(el =>
      <ItemShoes key={el.id} info={el}/>
  )

  return (
    <>
      {isLoading ? (
          <Preloader/>
        ) : error ? (
            <div>ERROR</div>
        ) : (
          <div className={styles.catalog}>
            {catalogValue === '' ? printCatalogList : printCatalogListSearch}
          </div>
      )}

      {catalogData.length === 0 && catalogValue !== '' ? (
          <div>Ничего не найдено</div>
        ) : data.length < 6 || catalogData.length < 6? null : <LoadMore/>}

    </>

  );
}

