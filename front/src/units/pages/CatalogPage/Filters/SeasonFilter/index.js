import React, {useEffect, useState} from 'react';
import styles from './SeasonFilters.module.css'
import {useDispatch} from "react-redux";
import {addSeason, removeSeason} from "../../../../../store/reducers";

export const SeasonFilter = ({season}) => {
  const d = useDispatch()

  const [addFilter, setAddFilter] = useState(false)

  useEffect(() => {
    if (addFilter) {
      d(addSeason(season))
    } else {
      d(removeSeason(season))
    }
  }, [addFilter])


  return (
    <div
      className={!addFilter? styles.season : styles.seasonAdd}
      onClick={() => setAddFilter(p =>!p)}
    >
      {season}
      <span className={!addFilter? styles.season__remove : styles.season__add}
      >✓</span>
    </div>
  );
}

