import React, {useEffect, useState} from 'react';
import styles from './OrderPage.module.css';
import {useDispatch, useSelector} from "react-redux";
import {SELECTOR_CART_ITEMS, SELECTOR_LIKES_ITEMS, setCartList, setLikesList} from "../../../store/reducers";
import {Preloader} from "../../../components";
import {useNavigate} from "react-router-dom";
import {useGetInfoItemQuery} from "../../../store/RTKQuery";
import noLike from "../../../img/emptyFavorite.png";
import likeIcon from "../../../img/redFavorite.png";
import {Gallery} from "./Gallery";
import {Description} from "./Description";
import {onCheckSize} from "../../../utils";


export const OrderPage = () => {

  const { idItem } = useSelector(SELECTOR_CART_ITEMS)

  const {data = [], isLoading, error, isSuccess} = useGetInfoItemQuery(idItem)
  const navigate = useNavigate()

  return (
    <>
      {isLoading? <Preloader/> : error? navigate('*') :
        <div className={styles.item}>
          <Gallery images={data.images}/>
          <Description
            data={data}
            idItem={idItem}
            isSuccess={isSuccess}
          />
          {/*<div className={styles.item__row__info}>*/}
          {/*  <h4 className={styles.item__row__info__title}>{data.title}</h4>*/}

          {/*  <div*/}
          {/*    className={styles.item__row__info__manufacturer}*/}
          {/*  >*/}
          {/*    {data.manufacturer}*/}
          {/*  </div>*/}

          {/*  {itemDescription.map((el, index) => {*/}
          {/*    if (el.value !== undefined) {*/}
          {/*      return (*/}
          {/*        <div key={index} className={styles.item__row__info_description}>*/}
          {/*          <div>{el.name}</div>*/}
          {/*          <div>{el.value}</div>*/}
          {/*        </div>*/}
          {/*  )}})}*/}

          {/*  {checkSize? (*/}
          {/*    <div className={styles.item__row__actions} >*/}
          {/*      <p>Размеры в наличии:*/}
          {/*        {data.sizes.map((el,idx) =>*/}
          {/*          el.avalible? (*/}
          {/*            <span*/}
          {/*              key={idx}*/}
          {/*              className={*/}
          {/*                el.size === size*/}
          {/*                  ? styles.item__row__actions__size__active*/}
          {/*                  : styles.item__row__actions__size*/}
          {/*              }*/}
          {/*              onClick={() => changeSetSize(el.size)}*/}
          {/*            >*/}
          {/*              {el.size}*/}
          {/*            </span> ) : null*/}
          {/*        )}*/}
          {/*      </p>*/}
          {/*      <p className={styles.item__row__actions__margin}>*/}
          {/*        Количество:*/}
          {/*        <span className={styles.item__row__actions__counter}*/}
          {/*          onClick={() => setAddCart(false) }*/}
          {/*        >*/}
          {/*          <button*/}
          {/*            className={styles.item__row__actions__counter_controls}*/}
          {/*            onClick={amount > 1? () => setAmount(p => p - 1) : null}*/}
          {/*          >-</button>*/}
          {/*          <span*/}
          {/*            className={styles.item__row__actions__counter_num}*/}
          {/*          >*/}
          {/*            {amount}*/}
          {/*          </span>*/}
          {/*            <button*/}
          {/*              className={styles.item__row__actions__counter_controls}*/}
          {/*              onClick={amount < 10? () => setAmount(p => p + 1) : null}*/}
          {/*            >+</button>*/}
          {/*        </span>*/}
          {/*      </p>*/}
          {/*    </div>) : <div className={styles.item__row__noSize}>Товара нет в наличии</div>*/}
          {/*  }*/}
          {/*  <div className={styles.item__price}>*/}
          {/*    <div className={styles.item__price__new}>{amount * data.price} ₽</div>*/}
          {/*    {data.oldPrice?*/}
          {/*      <div className={styles.item__price__old}>{data.oldPrice} ₽</div>*/}
          {/*      : null*/}
          {/*    }*/}
          {/*  </div>*/}
          {/*  {!addCart? (*/}
          {/*      <button*/}
          {/*        className={*/}
          {/*          checkSize*/}
          {/*            ? styles.item__row__button*/}
          {/*            : styles.item__row__button__inactive*/}
          {/*        }*/}
          {/*        onClick={checkSize? addToCart : null}*/}
          {/*      > Добавить в корзину*/}
          {/*      </button>*/}
          {/*    ) : (*/}
          {/*      <button*/}
          {/*        className={styles.item__row__button__buy}*/}
          {/*        onClick={addToCart}*/}
          {/*      > Перейти в корзину*/}
          {/*      </button>*/}
          {/*    )*/}
          {/*  }*/}
          {/*  <img*/}
          {/*    src={!like? noLike : likeIcon}*/}
          {/*    className={styles.item__row__like}*/}
          {/*    alt='like'*/}
          {/*    onClick={addItemInLikeList}*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
      }
    </>
  );
}

