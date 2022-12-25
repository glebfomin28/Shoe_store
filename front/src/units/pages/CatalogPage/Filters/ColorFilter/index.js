import React, {useEffect, useState} from 'react';
import styles from './ColorFilter.module.css';
import {useDispatch} from "react-redux";
import {addColor, removeColor} from "../../../../../store/reducers";

export const ColorFilter = ({color}) => {

  const d = useDispatch()

  const [addFilter, setAddFilter] = useState(false)

  useEffect(() => {
    if (addFilter) {
      d(addColor(color.name))
    } else {
      d(removeColor(color.name))
    }
  }, [addFilter])

  return (
    <div
      className={!addFilter? styles.body : styles.bodyActive}
      onClick={() => setAddFilter(p =>!p)}
    >
      <div className={styles.body__color} style={{backgroundColor: `${color.code}`}}></div>
      <div className={styles.body__name} >{color.name}</div>
      <span className={!addFilter? styles.body__remove : styles.body__add}
      >✓</span>
    </div>
  );
}

