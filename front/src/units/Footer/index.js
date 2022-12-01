import React from 'react';
import styles from './styles/Footer.module.css';
import {NavLink} from "react-router-dom";

export const Footer = () => {
  return (
        <footer className={styles.footer}>
          <div>
              <h3>Информация</h3>
              <nav className={styles.footer__naw}>
                <NavLink className={styles.footer__naw__item} to="/">Главная</NavLink>
                <NavLink className={styles.footer__naw__item} to="/catalog.html">Каталог</NavLink>
                <NavLink className={styles.footer__naw__item} to="/about.html">О магазине</NavLink>
                <NavLink className={styles.footer__naw__item} to="/contacts.html">Контакты</NavLink>
              </nav>
          </div>
          <div className={styles.footer__pay}>
              <h3>Принимаем к оплате:</h3>
              <div className={styles.footer__pay__systems}>
                <div className={styles.footer__pay__paypal}></div>
                <div className={styles.footer__pay__masterCard}></div>
                <div className={styles.footer__pay__visa}></div>
                <div className={styles.footer__pay__yandex}></div>
                <div className={styles.footer__pay__webmoney}></div>
                <div className={styles.footer__pay__qiwi}></div>
              </div>
              <div>2009-2019 © BosaNoga.ru — модный интернет-магазин обуви и аксессуаров.</div>
              <div>Все права защищены.</div>
              <div> Доставка по всей России!</div>
          </div>

          <div className={styles.footer__contacts}>
            <h3>Контакты:</h3>
            <a  href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a>
            <span >Ежедневно: с 09-00 до 21-00</span>
            <a  href="mailto:office@bosanoga.ru">office@bosanoga.ru</a>
            <div >
              <div ></div>
              <div ></div>
            </div>
          </div>
        </footer>
  );
}
