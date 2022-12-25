import React, {useEffect, useState} from 'react';
import styles from './SizeFilters.module.css'
import {useDispatch} from "react-redux";
import {addSizes, removeSizes} from "../../../../../store/reducers";

export const SizeFilter = ({size}) => {
  const d = useDispatch()

  const [addFilter, setAddFilter] = useState(false)

  useEffect(() => {
    if (addFilter) {
      d(addSizes(String(size)))
    } else {
      d(removeSizes(String(size)))
    }
  }, [addFilter])


  return (
    <div
      className={!addFilter? styles.size : styles.sizeAdd}
       onClick={() =>  setAddFilter(p =>!p)}
    >
      {size}
    </div>
  );
}

