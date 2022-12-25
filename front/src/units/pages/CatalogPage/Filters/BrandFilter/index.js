import React, {useEffect, useState} from 'react';
import styles from './BrandFilters.module.css'
import {useDispatch} from "react-redux";
import {addBrand, removeBrand} from "../../../../../store/reducers";

export const BrandFilter = ({brand}) => {
  const d = useDispatch()

  const [addFilter, setAddFilter] = useState(false)

  useEffect(() => {
    if (addFilter) {
      d(addBrand(brand))
    } else {
      d(removeBrand(brand))
    }
  }, [addFilter])


  return (
    <div
      className={!addFilter? styles.brand : styles.brandAdd}
      onClick={() => setAddFilter(p =>!p)}
    >
      {brand}
      <span className={!addFilter? styles.brand__remove : styles.brand__add}
      >✓</span>
    </div>
  );
}

