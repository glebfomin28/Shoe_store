import React, {useEffect, useState} from 'react';
import styles from './OrderPage.module.css';
import {useDispatch, useSelector} from "react-redux";
import {SELECTOR_ORDER_ITEM, setCartNum, setInfoItem, setOrderList} from "../../store/reducers";
import {Preloader} from "../../components";
import {useNavigate} from "react-router-dom";


export const OrderPage = () => {

  const { idItem, infoItem, orderList } = useSelector(SELECTOR_ORDER_ITEM)
  const d = useDispatch()
  const navigate = useNavigate()

  const [loader, setLoader] = useState(true)
  const [amount, setAmount] = useState(1)
  const [size, setSize] = useState(null)
  const [checkSize, setCheckSize] = useState(false)

  const getInfoItem = () => {
    try {
      fetch(`http://localhost:7070/api/items/${idItem}`)
        .then( (res) => res.json() )
        .then( (json) => {
          onCheckSize(json)
          return d(setInfoItem(json))
        } )
      setLoader(false)
    } catch (e) {
      return console.log(e)
    }
  }

  const onCheckSize = (arr) => {
    for (let i = 0; i < arr.sizes.length; i++) {
      if (arr.sizes[i].avalible) {
        setCheckSize(true)
      }
    }
  }


  useEffect(() => {
    getInfoItem()
  }, [idItem])
  console.log(orderList)

  const addToCart = () => {
    if (size !== null) {
      d(setOrderList(
        {
          id: infoItem.id,
          name: infoItem.title,
          size: size,
          amount: amount,
          price: infoItem.price,
          fullPrice: amount * infoItem.price,
        }
      ))
      navigate("/cart.html")
    }
  }

  return (
    <>
      {loader? <Preloader/> :
        <div className={styles.item}>
          <h2 className={styles.item__title}>{infoItem.title}</h2>
          <div className={styles.item__row}>

            <div >
              <img
                src={infoItem.images[0]}
                className={styles.item__row__img} alt=""/>
            </div>

            <div >
              <table className={styles.item__row__table}>
                <tbody>
                <tr>
                  <td>Артикул</td>
                  <td>{infoItem.sku}</td>
                </tr>
                <tr>
                  <td>Производитель</td>
                  <td>{infoItem.manufacturer}</td>
                </tr>
                <tr>
                  <td>Цвет</td>
                  <td>{infoItem.color}</td>
                </tr>
                <tr>
                  <td>Материалы</td>
                  <td>{infoItem.material}</td>
                </tr>
                <tr>
                  <td>Сезон</td>
                  <td>{infoItem.season}</td>
                </tr>
                <tr>
                  <td>Повод</td>
                  <td>{infoItem.reason}</td>
                </tr>
                </tbody>
              </table>

              {checkSize?
                <>
                  <div className={styles.item__row__actions} >
                    <p>Размеры в наличии:
                      {infoItem.sizes.map((el,idx) =>
                        <span
                          key={idx}
                          className={
                            el.size === size
                              ? styles.item__row__actions__size__active
                              : styles.item__row__actions__size
                          }
                          onClick={() => setSize(el.size)}
                        >
                          {el.avalible? el.size : null}
                      </span>
                      )}
                    </p>
                    <p>
                      Количество:
                      <span className={styles.item__row__actions__counter}>
                        <button
                          className={styles.item__row__actions__counter_controls}
                          onClick={amount > 1? () => setAmount(p => p - 1) : null}
                        >
                          -
                        </button>
                        <span
                          className={styles.item__row__actions__counter_num}
                        >
                          {amount}
                        </span>
                          <button
                            className={styles.item__row__actions__counter_controls}
                            onClick={amount < 10? () => setAmount(p => p + 1) : null}
                          >
                            +
                          </button>
                      </span>
                    </p>
                  </div>
                  <button
                    className={
                      size !== null
                        ? styles.item__row__button
                        : styles.item__row__button__inactive
                    }
                    onClick={addToCart}
                  >
                    В корзину
                  </button>
                </> : null
              }
            </div>
          </div>
        </div>
      }
    </>
  );
}

