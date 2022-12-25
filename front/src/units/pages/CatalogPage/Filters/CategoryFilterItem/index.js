import React, {useEffect, useState} from 'react';
import styles from './CategoryFilterItem.module.css';
import {useDispatch} from "react-redux";
import {addDivision, removeDivision} from "../../../../../store/reducers";

export const CategoryFilterItem = ({name}) => {
  const d = useDispatch()

  const [addFilter, setAddFilter] = useState(false)

  useEffect(() => {
    if (addFilter) {
      d(addDivision(name))
    } else {
      d(removeDivision(name))
    }
  }, [addFilter])

  return (
    <div className={!addFilter? styles.category : styles.categoryActive} onClick={() => setAddFilter(p => !p)}>
      {name}
      <span className={!addFilter? styles.category__remove : styles.category__add}
      >✓</span>
    </div>
  );
}

