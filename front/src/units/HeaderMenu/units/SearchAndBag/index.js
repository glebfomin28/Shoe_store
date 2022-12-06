import React, {useEffect, useState} from 'react';
import styles from './SearchAndBag.module.css';
import searchIcon from "../../../../img/search-icon.svg";
import bag from "../../../../img/bag.png";
import {useDispatch, useSelector} from "react-redux";
import {
  getSearchValue,
  SELECTOR_ORDER_ITEM,
  SELECTOR_SEARCH, setCartNum,
  setSearchValue
} from "../../../../store/reducers";
import {useNavigate} from "react-router-dom";

export const SearchAndBag = () => {

  const { searchValue } = useSelector(SELECTOR_SEARCH)
  const { cartNum, orderList } = useSelector(SELECTOR_ORDER_ITEM)
  const d = useDispatch()
  const navigate = useNavigate()

  const [actionSearch, setActionSearch] = useState(false)

  const onSearch = () => {
    setActionSearch(p => !p)
    if (actionSearch && searchValue.trim() !== '') {
      d(getSearchValue())
      navigate("/catalog.html")

    }
    if (!actionSearch) d(setSearchValue(''))
  }

  useEffect(() => {
    d(setCartNum(orderList.length))
  }, [orderList])

  return (
    <div className={styles.actions}>

      {actionSearch &&
        <input
          className={styles.actions__search}
          type="text"
          value={searchValue}
          onChange={(e) => d(setSearchValue(e.target.value))}
          placeholder="Поиск"
        />
      }

      <img
        className={styles.actions__searchIcon}
        src={searchIcon}
        alt=''
        onClick={onSearch}
      />

      <div className={styles.actions__bag}>
        <img
          className={styles.actions__bag__icon}
          onClick={() => navigate("/cart.html")}
          src={bag}
          alt=''
        />
        {cartNum !== 0
          ?<div className={styles.actions__bag__count}>{cartNum}</div>
          : null
        }
      </div>

    </div>
  );
}

