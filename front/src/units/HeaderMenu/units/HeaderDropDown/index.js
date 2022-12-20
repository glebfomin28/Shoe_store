import React, {useEffect, useRef} from 'react';
import styles from './HeaderDropDown.module.css';
import heartW from "../../../../img/heardW.png";
import orders from "../../../../img/container.png";
import {useDispatch, useSelector} from "react-redux";
import {SELECTOR_CART_ITEMS, setFullPrice} from "../../../../store/reducers";
import {HeaderDropDownItem} from "./HeaderDropDownItem";
import {useTooltip} from "../../../../hooks";
import {useNavigate} from "react-router-dom";

export const HeaderDropDown = (
  {
    dropDown,
    setDropDown,
    changeAction,
    cartActionRef,
    userActionRef
  }) => {


  const d = useDispatch()
  const { cartList, sumPrice } = useSelector(SELECTOR_CART_ITEMS)
  const navigate = useNavigate()
  const tooltipRef = useRef(null)


  useTooltip(tooltipRef, setDropDown, cartActionRef, userActionRef)

  useEffect(() => {
    d(setFullPrice())
  }, [cartList])

  const goToOrdersPage = () => {
    setDropDown(false)
    navigate('/orders.html')
  }

  const goToFavoritesPage = () => {
    setDropDown(false)
    navigate('/favorites.html')
  }

  const goToCartPage = () => {
    setDropDown(false)
    navigate('/cart.html')
  }

  return (
    <div className={dropDown? styles.dropDown : styles.dropDownOff} ref={tooltipRef}>
      <div className={styles.dropDown__block}>

        {changeAction === "user"? (
          <>
            <div className={styles.dropDown__block__option} onClick={goToOrdersPage}>
              <img className={styles.dropDown__block__option__icon} src={orders} alt='' />
              <div className={styles.dropDown__block__option__title}>Заказы</div>
            </div>
            <div className={styles.dropDown__block__option}  onClick={goToFavoritesPage}>
              <img className={styles.dropDown__block__option__icon} src={heartW} alt=''/>
              <div className={styles.dropDown__block__option__title}>Избранное</div>
            </div>
            <span className={styles.helper__block__user}></span>
          </>
          ) : (
          <>
            {cartList.length === 0? (
              <div className={styles.helper__block__empty}>
                В корзине пока ничего нет. Не знаете, с чего начать? Загляните к нам в каталог!
              </div>) : (
              <>{cartList.map((el) =>
                  <HeaderDropDownItem key={ el.id + Math.random()*100 } item={el}/>)}
              </>)
            }
            <span className={styles.helper__block__cart}></span>
          </>)
        }
      </div>
      {cartList.length !== 0 && changeAction === "cart"? (
        <div className={styles.dropDown__bottom}>
          <button
            className={styles.dropDown__bottom__button}
            onClick={goToCartPage}
          >Оформить заказ</button>
          <div className={styles.dropDown__bottom__fullPrice}>Итого: {sumPrice} ₽</div>
        </div>
      ) : null}

    </div>

  );
}

