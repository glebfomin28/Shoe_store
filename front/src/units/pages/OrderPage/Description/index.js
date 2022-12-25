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
      setSize(null)
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

  const addItemInLikeList = () => {
    d(setLikesList(data))
    setLike(p => !p)
  }

  const itemDescription = [
    {name:"Сезон", value: data.season.join(", ")},
    {name:"Пол", value: data.sex},
    {name:"Бренд", value: data.manufacturer},
    {name:"Цвет", value: data.color.join(", ")},
    {name:"Категория", value: data.division.join(", ")},
    {name:"Повод", value: data.reason.join(", ")},
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

      { checkSize && size !== null ? (
        <div className={styles.description__action} >
          <p>Размеры в наличии:
            {data.sizes.map((el,idx) =>
              el.avalible? (
                <span
                  key={idx}
                  className={
                    el.size === size
                      ? styles.description__action__size__active
                      : styles.description__action__size
                  }
                  onClick={() => changeSetSize(el.size)}
                >
                        {el.size}
                      </span> ) : null
            )}
          </p>
          <p className={styles.description__action__amount}>
            Количество:
            <span className={styles.description__action__amount__counter}
                  onClick={() => setAddCart(false) }
            >
              <button
                className={styles.description__action__amount__counter__controls}
                onClick={amount > 1? () => setAmount(p => p - 1) : null}
              >-</button>
              <span
                className={styles.description__action__amount__counter__num}
              >
                {amount}
              </span>
              <button
                className={styles.description__action__amount__counter__controls}
                onClick={amount < 10? () => setAmount(p => p + 1) : null}
              >+</button>
            </span>
          </p>
        </div>
        ) : (
        <div className={styles.description__action__noSize}>Товара нет в наличии</div>)
      }
      <div className={styles.description__price}>
        <div className={styles.description__price__new}>{amount * data.price} ₽</div>
        {data.oldPrice?
          <div className={styles.description__price__old}>{data.oldPrice} ₽</div>
          : null
        }
      </div>
      {!addCart? (
        <button
          className={
            checkSize && size !== null
              ? styles.description__button
              : styles.description__button__inactive
          }
          onClick={checkSize? addToCart : null}
        > Добавить в корзину
        </button>
      ) : (
        <button
          className={styles.description__button__buy}
          onClick={addToCart}
        > Перейти в корзину
        </button>
      )
      }
      <img
        src={!like? noLike : likeIcon}
        className={styles.description__like}
        alt='like'
        onClick={addItemInLikeList}
      />
    </div>
  );
}

