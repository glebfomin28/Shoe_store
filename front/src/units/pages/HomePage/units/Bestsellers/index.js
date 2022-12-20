import React, {useEffect, useRef, useState} from 'react';
import styles from './Bestsllers.module.css'
import {ItemShoes, Preloader} from "../../../../../components";
import {useGetTopSalesQuery} from "../../../../../store/RTKQuery";

export const Bestsellers = () => {

  const {data = [], isLoading, error} = useGetTopSalesQuery()
  const [step, setStep] = useState(0)

  const sliderRef = useRef(null)

  useEffect(() => {
    if (step > 0) {
      setStep(-(data.length - 3) * 288)
    } else if (step < -(data.length - 3) * 288) {
      setStep(0)
    }
  }, [step])

  useEffect(() => {
    const Interval = setInterval(() =>
      goRight(), 6000)
    return () => clearInterval(Interval)
  }, [])

  const goLeft = () => {
    setStep(p => p + 285)
  }
  const goRight = () => {
    setStep(p => p - 285)
  }

  const printItemsShoesList = data.map(el =>
    <ItemShoes key={el.id} info={el}/>
  )


  return (
    <>
      {isLoading ? <Preloader/> : error ? null : (
        <>
          <div className={styles.hit}>
            <h4 className={styles.hit__title}>Хиты продаж!</h4>
            <div className={styles.hit__list} ref={sliderRef}
                 style={{transform: `translateX(${step}px)`}}
            >
              {printItemsShoesList}
            </div>
          </div>

          {data.length > 3?
            <>
              <button
                className={styles.hit__left}
                onClick={goLeft}
              >❮</button>
              <button
                className={styles.hit__right}
                onClick={goRight}
              >❯</button>
            </> : null
          }
        </>
      )}
    </>
  )
}







