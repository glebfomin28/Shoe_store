import React from 'react';
import styles from './Footer.module.css';
import {NavLink} from "react-router-dom";
import vkBlack from '../../img/vkBlack.png'
import vkWhite from '../../img/vkWhite.png'
import instWhite from '../../img/instWhite.png'
import instBlack from '../../img/instBlack.png'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__body}>
        <div >
          <h3>Информация</h3>
          <nav className={styles.footer__naw}>
            <NavLink className={styles.footer__naw__item} to="/">Главная</NavLink>
            <NavLink className={styles.footer__naw__item} to="/catalog.html">Каталог</NavLink>
            <NavLink className={styles.footer__naw__item} to="/about.html">О магазине</NavLink>
            <NavLink className={styles.footer__naw__item} to="/contacts.html">Контакты</NavLink>
          </nav>
        </div>
        <div className={styles.footer__pay}>
          <h3>Принимаем к оплате</h3>
          <div className={styles.footer__pay__systems}>
            <div className={styles.footer__pay__paypal}></div>
            <div className={styles.footer__pay__masterCard}></div>
            <div className={styles.footer__pay__visa}></div>
            <div className={styles.footer__pay__yandex}></div>
            <div className={styles.footer__pay__webmoney}></div>
            <div className={styles.footer__pay__qiwi}></div>
          </div>
          <div className={styles.footer__pay__text}>
            2009-2019 © BosaNoga.ru — модный интернет-магазин обуви и аксессуаров.
            Все права защищены. Доставка по всей России!
          </div>
        </div>

        <div className={styles.footer__contacts}>
          <h3>Контакты</h3>
          <a
            className={styles.footer__contacts_link}
            href="tel:+7-495-790-35-03"
          >+7 495 79 03 5 03</a>
          <span >Ежедневно: с 09-00 до 21-00</span>
          <a
            className={styles.footer__contacts_link}
            href="mailto:office@bosanoga.ru"
          >office@bosanoga.ru</a>
          <div className={styles.footer__contacts_socialNetwork}>
            <a>
              <div className={styles.footer__contacts_socialNetwork__vk}></div>
            </a>
            <a>
              <div className={styles.footer__contacts_socialNetwork__inst}></div>
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
}
