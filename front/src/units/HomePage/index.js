import React, {useEffect} from 'react';
import {Bestsellers, Сatalog} from "./units";
import styles from './styles/HomePage.module.css';
import {useDispatch} from "react-redux";
import {setBestseller} from "../../store/reducers";

export const HomePage = () => {

  const d = useDispatch()

  const getBestsellerList = () => {
    try {
      fetch("http://localhost:7070/api/top-sales")
        .then( (res) => res.json() )
        .then( (json) => d(setBestseller(json)) )
    } catch (e) {
      return console.log(e)
    }
  }

  useEffect(() => {
    getBestsellerList()
  }, [])

  return (
    <div className={styles.home}>
      <Bestsellers/>
      <Сatalog/>
    </div>
  );
}

