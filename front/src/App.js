import React from 'react';
import {
  AboutPage,
  CatalogPage,
  ContactsPage,
  ErrorPage404,
  Footer,
  HeaderMenu,
  HomePage,
  CartPage,
  OrderPage,
} from "./units";
import styles from './App.module.css'
import { Route, Routes } from "react-router-dom";



export const App = () => {

  return (
    <div className={styles.container}>

      <HeaderMenu/>

      <div className={styles.main}>
        <Routes >
          <Route path="/" exact element={<HomePage/>} />
          <Route path="/catalog.html" element={<CatalogPage/>} />
          <Route path="//about.html" element={<AboutPage/>} />
          <Route path="/contacts.html" element={<ContactsPage/>} />
          <Route path="/catalog/:id.html" element={<OrderPage/>} />
          <Route path="/cart.html" element={<CartPage/>} />
          <Route path="*" exact element={<ErrorPage404/>} />
        </Routes>
      </div>

      <Footer/>

    </div>
  );
}
