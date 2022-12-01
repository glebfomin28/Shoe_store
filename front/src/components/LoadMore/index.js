import React, {useEffect, useState} from 'react';
import styles from './LoadMore.module.css';
import {useDispatch, useSelector} from "react-redux";
import {Preloader} from "../Preloader";
import {SELECTOR_SEARCH, SELECTOR_SHOES_LIST, setAddCatalog} from "../../store/reducers";


export const LoadMore = () => {
  const d = useDispatch()
  const { catalogTabs } = useSelector(SELECTOR_SHOES_LIST)
  const { catalogValue } = useSelector(SELECTOR_SEARCH)
  const [offset, setOffset] = useState(6)
  const [hide, setHide] = useState(false)
  const [loader, setLoader] = useState(false)

  const loadMoreItems = () => {
    setLoader(true)
    try {
      fetch(
        catalogTabs === 11
          ? `http://localhost:7070/api/items?offset=${offset}`
          : `http://localhost:7070/api/items?categoryId=${catalogTabs}&offset=${offset}`
      )
        .then( (res) => res.json() )
        .then( (json) => {
          console.log(json)
          if (json.length < 6 || json.length === 0) setHide(true)
          d(setAddCatalog(json))
        })
      setLoader(false)
      setOffset(p => p + 6)
    } catch (e) {
      return console.log(e)
    }
  }

  useEffect(() => {
    setHide(false)
  }, [catalogTabs])

  return (
    <>
      {loader? <Preloader/> : null}
      {!hide?
        <button
          className={styles.button}
          onClick={loadMoreItems}
        >
          Загрузить еще
        </button> : null}
    </>
  );
}
