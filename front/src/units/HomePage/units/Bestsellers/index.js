import React, {useEffect, useRef, useState} from 'react';
import styles from './styles/Bestsllers.module.css'
import {ItemShoes, Preloader} from "../../../../components";
import {useGetTopSalesQuery} from "../../../../store/RTKQuery";

export const Bestsellers = () => {

  const {data = [], isLoading, error} = useGetTopSalesQuery()
  const [step, setStep] = useState(0)

  const sliderRef = useRef(null)

  useEffect(() => {
      if (step > 0) {
        setStep(-(data.length - 3) * 324)
      } else if (step < -(data.length - 3) * 324) {
        setStep(0)
      }
  },[step])

  useEffect(() => {
    // if (data.length <= 3) {
    //   return () => clearInterval()
    // }
    setInterval(() =>
      goRight(), 5500)

    return () => clearInterval()
  },[])
  const goLeft = () => {
    setStep(p => p + 324)
  }
  const goRight = () => {
    setStep(p => p - 324)
  }

  const printItemsShoesList = data.map(el =>
    <ItemShoes key={el.id} info={el}/>
  )

  return (
    <div className={styles.hit}>
      <h4 className={styles.hit__title}>Хиты продаж!</h4>

        {isLoading ? <Preloader/> : error ?
          <div>ERROR</div> :
          <div className={styles.hit__list} ref={sliderRef}
               style={{transform: `translateX(${step}px)`}}
          >
            {printItemsShoesList}
          </div>
        }
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
    </div>
  );
}

