import React, {useEffect} from 'react';
import {Bestsellers, Сatalog} from "./units";
import styles from './styles/HomePage.module.css';
import {useDispatch} from "react-redux";
import {setBestseller} from "../../store/reducers";
import {getBestsellerList} from "../../fetch";

export const HomePage = () => {

  const d = useDispatch()


  useEffect(() => {
    getBestsellerList(d, setBestseller)
  }, [])

  return (
    <div className={styles.home}>
      <Bestsellers/>
      <Сatalog/>
    </div>
  );
}

