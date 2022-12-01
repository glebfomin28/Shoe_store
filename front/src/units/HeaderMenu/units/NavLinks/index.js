import React from 'react';
import styles from './NavLinks.module.css';
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {SELECTOR_SHOES_LIST} from "../../../../store/reducers";

export const NavLinks = () => {
  const { navLinks } = useSelector(SELECTOR_SHOES_LIST)

  return (
    <nav className={styles.naw}>
      {navLinks.map((el, i) =>
        <NavLink
          key={i}
          to={el.to}
          className={({isActive}) =>
            (!isActive ? styles.naw__item : styles.naw__item__active)
          }
        >{el.name}</NavLink>
      )}
    </nav>
  );
}

