import React, {useEffect, useState} from 'react';
import styles from './Description.module.css';
import noLike from "../../../../img/emptyFavorite.png";
import likeIcon from "../../../../img/redFavorite.png";
import {useDispatch, useSelector} from "react-redux";
import {
  SELECTOR_LIKES_ITEMS,
  setCartList,
  setLikesList
} from "../../../../store/reducers";
import {useNavigate} from "react-router-dom";
import {onCheckSize} from "../../../../utils";



export const Description = ({data, idItem, isSuccess}) => {

  const { likesList } = useSelector(SELECTOR_LIKES_ITEMS)
  const d = useDispatch()
  const navigate = useNavigate()

  const [amount, setAmount] = useState(1)
  const [size, setSize] = useState(null)
  const [checkSize, setCheckSize] = useState(false)
  const [indexImg, setIndexImg] = useState(0)
  const [like, setLike] = useState(false)
  const [addCart, setAddCart] = useState(false)


  useEffect(() => {
    const findItem = likesList.map(el => el.id).indexOf(idItem);
    if (findItem !== -1) setLike(true)
    else setLike(false)
  }, [])

  useEffect(() => {
    setAmount(1)
  }, [size])

  useEffect(() => {
    if (isSuccess) {
      onCheckSize(data, setSize, setCheckSize)
    }
  }, [idItem, data])


  const addToCart = () => {
    if (size !== null && !addCart) {
      d(setCartList(
        {
          id: data.id + '-' + size,
          name: data.title,
          size: size,
          amount: amount,
          price: data.price,
          fullPrice: amount * data.price,
          images: data.images
        }
      ))
      setAddCart(true)
    } else {
      setAddCart(false)
      navigate('/cart.html')
    }}

  const changeSetSize = (size) => {
    setSize(size)
    setAddCart(false)
  }

  const handleClickLeft = () => {
    if (indexImg === 0) {
      setIndexImg(data.images.length - 1)
    } else  setIndexImg(p => p - 1)
  }

  const handleClickRight = () => {
    if (indexImg === data.images.length - 1) {
      setIndexImg(0)
    } else  setIndexImg(p => p + 1)
  }

  const addItemInLikeList = () => {
    d(setLikesList(data))
    setLike(p => !p)
  }

  const itemDescription = [
    {name:"Сезон", value: data.season},
    {name:"Пол", value: data.sex},
    {name:"Бренд", value: data.manufacturer},
    {name:"Цвет", value: data.color},
    {name:"Категория", value: data.reason},
    {name:"Длина каблука", value: data.heelSize},
  ]


  return (
    <div className={styles.description}>
      <h4 className={styles.description__title}>{data.title}</h4>

      <div
        className={styles.description__manufacturer}
      >
        {data.manufacturer}
      </div>

      {itemDescription.map((el, index) => {
        if (el.value !== undefined) {
          return (
            <div key={index} className={styles.description__item}>
              <div>{el.name}</div>
              <div>{el.value}</div>
            </div>
          )}})
      }

      {checkSize? (
        <div className={styles.item__row__actions} >
          <p>Размеры в наличии:
            {data.sizes.map((el,idx) =>
              el.avalible? (
                <span
                  key={idx}
                  className={
                    el.size === size
                      ? styles.item__row__actions__size__active
                      : styles.item__row__actions__size
                  }
                  onClick={() => changeSetSize(el.size)}
                >
                        {el.size}
                      </span> ) : null
            )}
          </p>
          <p className={styles.item__row__actions__margin}>
            Количество:
            <span className={styles.item__row__actions__counter}
                  onClick={() => setAddCart(false) }
            >
                    <button
                      className={styles.item__row__actions__counter_controls}
                      onClick={amount > 1? () => setAmount(p => p - 1) : null}
                    >-</button>
                    <span
                      className={styles.item__row__actions__counter_num}
                    >
                      {amount}
                    </span>
                      <button
                        className={styles.item__row__actions__counter_controls}
                        onClick={amount < 10? () => setAmount(p => p + 1) : null}
                      >+</button>
                  </span>
          </p>
        </div>) : <div className={styles.item__row__noSize}>Товара нет в наличии</div>
      }
      <div className={styles.item__price}>
        <div className={styles.item__price__new}>{amount * data.price} ₽</div>
        {data.oldPrice?
          <div className={styles.item__price__old}>{data.oldPrice} ₽</div>
          : null
        }
      </div>
      {!addCart? (
        <button
          className={
            checkSize
              ? styles.item__row__button
              : styles.item__row__button__inactive
          }
          onClick={checkSize? addToCart : null}
        > Добавить в корзину
        </button>
      ) : (
        <button
          className={styles.item__row__button__buy}
          onClick={addToCart}
        > Перейти в корзину
        </button>
      )
      }
      <img
        src={!like? noLike : likeIcon}
        className={styles.item__row__like}
        alt='like'
        onClick={addItemInLikeList}
      />
    </div>
  );
}

