import React, {useEffect, useState} from 'react';
import styles from './ItemShoes.module.css';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {SELECTOR_LIKES_ITEMS, setIdItem, setLikesList} from "../../store/reducers";
import noLike from '../../img/emptyFavorite.png';
import likeIcon from '../../img/redFavorite.png';
import addInCart from '../../img/addCartWhite.png';

export const ItemShoes = ({ info }) => {

  const d = useDispatch()
  const { likesList } = useSelector(SELECTOR_LIKES_ITEMS)
  const navigate = useNavigate()

  const [niceImg, setNiceImg] = useState(true)

  const [like, setLike] = useState(false)

  useEffect(() => {
    const findItem = likesList.map(el => el.id).indexOf(info.id);
    if (findItem !== -1) setLike(true)
    else setLike(false)
  }, [])

  const goToOrder = () => {
    d(setIdItem(info.id))
    navigate(`/catalog/${info.id}.html`)
  }

  const checkImag = () => {
    setNiceImg(false)
  }

  const addItemInLikeList = () => {
    d(setLikesList(info))
    setLike(p => !p)
  }
  return (
    <>
      {niceImg?
        <div className={styles.item}>
          <div className={styles.item__imgBlock}>
            <img
              className={styles.item__img}
              src={info.images[0]}
              alt=''
              onError={checkImag}
            />
          </div>
          <div className={styles.item__info}>
            <div className={styles.item__name}>{info.title}</div>
            {info.oldPrice? <div className={styles.item__oldPrice}>{info.oldPrice} ₽</div> : null}
            <div
              className={styles.item__button}
              onClick={goToOrder}
            >
              {info.price} ₽
              <img
                src={addInCart}
                className={styles.item__button__icon}
                alt=''
              />
            </div>

            <img
              src={!like? noLike : likeIcon}
              className={styles.item__info__like}
              alt='like'
              onClick={addItemInLikeList}
            />

          </div>
        </div> : null
      }
    </>
  );
}

