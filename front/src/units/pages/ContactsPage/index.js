import React from 'react';
import styles from './ContactsPage.module.css';

export const ContactsPage = () => {


  return (
    <div className={styles.contacts}>
      <h2 className={styles.contacts__title}>Контакты</h2>
      <p>Наш головной офис расположен в г.Москва, по адресу: Варшавское шоссе, д. 17, бизнес-центр W Plaza.</p>
      <h5 className={styles.contacts__title}>Координаты для связи:</h5>
      <p>Телефон:
        <a
          className={styles.contacts__link}
          href="tel:+7-495-790-35-03"
        >
          +7 495 79 03 5 03
        </a>
        (ежедневно: с 09-00 до 21-00)
      </p>
      <p>Email:
        <a
          className={styles.contacts__link}
          href="mailto:office@bosanoga.ru"
        >office@bosanoga.ru</a>
      </p>
    </div>
  );
}

