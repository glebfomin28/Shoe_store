import React, {useEffect, useRef, useState} from 'react';
import styles from './UserActions.module.css';
import searchIcon from '../../../../img/search-icon.svg';
import cart from '../../../../img/cart.png';
import likes from '../../../../img/like.png';
import orders from '../../../../img/orders.svg';
import userW from "../../../../img/userW.png";
import userG from "../../../../img/userG.png";

import {useDispatch, useSelector} from "react-redux";
import {
  getSearchValue,
  SELECTOR_CART_ITEMS,
  SELECTOR_SEARCH,
  setSearchValue
} from "../../../../store/reducers";
import {useNavigate} from "react-router-dom";
import {HeaderDropDown, HeaderHelper} from "../HeaderDropDown";

export const UserActions = () => {

  const d = useDispatch()
  const navigate = useNavigate()
  const { searchValue } = useSelector(SELECTOR_SEARCH)
  const { cartList } = useSelector(SELECTOR_CART_ITEMS)

  const [actionSearch, setActionSearch] = useState(false)
  const [dropDown, setDropDown] = useState(false)
  const [changeAction, setChangeAction] = useState('user')

  const userActionRef = useRef(null)
  const cartActionRef = useRef(null)

  const onSearch = () => {
    setActionSearch(p => !p)
    if (actionSearch && searchValue.trim() !== '') {
      d(getSearchValue())
      navigate("/catalog.html")

    }
    if (!actionSearch) d(setSearchValue(''))
  }

  const handleClickUser = () => {
    if (changeAction === "cart" && dropDown) {
      return setChangeAction("user")
    } else {
      setChangeAction("user")
      setDropDown(p => !p)
    }


  }
  const handleClickCart = () => {
    if (changeAction === "user" && dropDown) {
      return setChangeAction("cart")
    } else {
      setChangeAction("cart")
      setDropDown(p => !p)
    }
  }

  return (
    <div className={styles.actions}>
      <div className={styles.actions__search}>
        {actionSearch &&
          <input
            className={styles.actions__search__input}
            type="text"
            value={searchValue}
            onChange={(e) => d(setSearchValue(e.target.value))}
            placeholder="Поиск"
          />
        }
        <img
          className={styles.actions__search__icon}
          src={searchIcon}
          alt=''
          onClick={onSearch}
        />

      </div>


      <div className={styles.actions__user}
           onClick={handleClickUser}
           ref={userActionRef}
      ></div>

      <div className={styles.actions__cart}
        onClick={handleClickCart}
           ref={cartActionRef}
      >
        {cartList.length !== 0
          ?<div className={styles.actions__cart__count}>{cartList.length}</div>
          : null
        }
    </div>

    <HeaderDropDown
      dropDown={dropDown}
      setDropDown={setDropDown}
      changeAction={changeAction}
      cartActionRef={cartActionRef}
      userActionRef={userActionRef}
    />
  </div>
  );
}

