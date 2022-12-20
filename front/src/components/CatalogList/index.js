import React, {useEffect, useState} from 'react';
import styles from "./CatalogList.module.css";
import {ItemShoes} from "../ItemShoes";
import {Preloader} from "../Preloader";
import {useSelector} from "react-redux";
import {
  SELECTOR_SEARCH,
  SELECTOR_SHOES_STORE_ACTIONS,
} from "../../store/reducers";
import {searchCatalogItems} from "../../fetch";
import {useGetCatalogListQuery} from "../../store/RTKQuery";
import {LoadMore} from "../LoadMore";
import {useNavigate} from "react-router-dom";

export const CatalogList = () => {

  const { catalogTabs } = useSelector(SELECTOR_SHOES_STORE_ACTIONS)
  const { catalogValue } = useSelector(SELECTOR_SEARCH)
  const navigate = useNavigate()

  const { data = [], isLoading, error } = useGetCatalogListQuery(catalogTabs)
  const [catalogData, setCatalogData] = useState([])

  const numPages = Math.ceil(data.length / 12)

  const [prevItems, setPrevItems] = useState(0)
  const [nextItems, setNextItems] = useState(12)

  useEffect(() => {
    const Debounce = setTimeout(() => {
      if(catalogValue !== '') {
        searchCatalogItems(catalogValue, catalogTabs, setCatalogData)
      }
    }, 300)

    if(catalogValue !== '') {
      setPrevItems(0)
      setNextItems(data.length)
    } else {
      setPrevItems(0)
      setNextItems(12)
    }

    return () => clearTimeout(Debounce)
  }, [catalogValue, catalogTabs])

  const printCatalogList = data.map((el, index) => {
    if (index >= prevItems && index < nextItems) {
      return <ItemShoes key={el.id} info={el}/>
    }
  })

  const printCatalogListSearch = catalogData.map(el =>
      <ItemShoes key={el.id} info={el}/>
  )

  return (
    <>
      {isLoading ? <Preloader/> : error ? navigate('*') : (
          <div className={styles.catalog}>
            {catalogValue === '' ? printCatalogList : printCatalogListSearch}
          </div>
      )}

      {catalogData.length === 0 && catalogValue !== ''
        ? <div>Ничего не найдено</div> : null }

      {data.length < 13 || catalogValue !== ''
        ? null
        : <LoadMore
            lengthItems={data.length}
            setPrevItems={setPrevItems}
            setNextItems={setNextItems}
          />}
    </>

  );
}

