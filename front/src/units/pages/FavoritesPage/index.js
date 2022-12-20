import React, {useEffect, useState} from 'react';
import styles from './favoritesPage.module.css';
import {useSelector} from "react-redux";
import {SELECTOR_LIKES_ITEMS} from "../../../store/reducers";
import {ItemShoes, LoadMore} from "../../../components";

export const FavoritesPage = () => {

  const { likesList } = useSelector(SELECTOR_LIKES_ITEMS)

  const [prevItems, setPrevItems] = useState(0)
  const [nextItems, setNextItems] = useState(12)

  const printCatalogList = likesList.map((el, index) => {
    if (index >= prevItems && index < nextItems) {
      return <ItemShoes key={el.id} info={el}/>
    }
  })

  useEffect(() => {
    if (likesList.length <= 12) {
      setNextItems(12)
      setPrevItems(0)
    }
  }, [likesList])

  return (
    <div className={styles.favorites}>
      <h4 className={styles.favorites__header}>Избранное</h4>

      <div className={styles.favorites__print}>
        {likesList.length !== 0
          ? printCatalogList
          : (
          <div
            className={styles.favorites__print__empty}
          >
            В избранном пока пусто
            <p className={styles.favorites__print__empty__grey}>
              Сохраняйте понравившиеся товары, чтобы долго не искать
            </p>
          </div>)
        }
      </div>

      {likesList.length < 13? null : (
        <LoadMore
          lengthItems={likesList.length}
          setPrevItems={setPrevItems}
          setNextItems={setNextItems}
        /> )
      }

    </div>

  );
}

