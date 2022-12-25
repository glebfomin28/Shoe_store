import React, {useEffect, useState} from 'react';
import styles from './ReasonFilters.module.css'
import {useDispatch} from "react-redux";
import {addReason, removeReason} from "../../../../../store/reducers";

export const ReasonFilter = ({reason}) => {
  const d = useDispatch()

  const [addFilter, setAddFilter] = useState(false)

  useEffect(() => {
    if (addFilter) {
      d(addReason(reason))
    } else {
      d(removeReason(reason))
    }
  }, [addFilter])


  return (
    <div
      className={!addFilter? styles.reason : styles.reasonAdd}
      onClick={() => setAddFilter(p =>!p)}
    >
      {reason}
      <span className={!addFilter? styles.reason__remove : styles.reason__add}
      >✓</span>
    </div>
  );
}

