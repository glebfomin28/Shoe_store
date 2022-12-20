import React, {useEffect, useState} from 'react';
import styles from './LoadMore.module.css';


export const LoadMore = ({ setNextItems, setPrevItems, lengthItems }) => {
  const [activePage, setActivePage] = useState(1)
  const numPages = Math.ceil(lengthItems / 12)
  const arrNumPages = Array(numPages).fill().map((e, i) => i + 1)



  const handlePage = (e) => {
    const num = +e.target.textContent
    setActivePage(num)

    const prev = 12 * (num - 1)
    const next = 12 * num

    setPrevItems(prev)
    setNextItems(next)
  }

  return (
    <>
      {arrNumPages.map((el, index) =>
        <button
          key={index}
          className={el === activePage? styles.buttonActive : styles.button}
          onClick={handlePage}
        >
          {el}
        </button>
      )}
    </>
  )
}
