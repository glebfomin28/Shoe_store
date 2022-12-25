import React, {useState} from 'react';
import styles from './SimilarItems.module.css';
import {useGetCoincidenceListQuery} from "../../../../store/RTKQuery";
import {ItemShoes} from "../../../../components";


export const SimilarItems = ({ item }) => {

  const similarObj = {
    id: item.id,
    category: item.category,
    division: item.division
  }

  const similarObjString = JSON.stringify(similarObj)

  const {data = [], isSuccess} = useGetCoincidenceListQuery(similarObjString)

  const [step, setStep] = useState(0)

  const lastStep = (data.length - 4) * -285
  const goLeft = () => {
    if (step < 0) {
      setStep(p => p + 285)
    }
  }
  const goRight = () => {
    if (step > lastStep) {
      setStep(p => p - 285)
    }
  }
  return (
    <>
      {isSuccess? (
        <>
          <div className={styles.similar}>
            <h4  className={styles.similar__title}>Похожие товары:</h4>
            <div className={styles.similar__slider}
                 style={{transform: `translateX(${step}px)`}}>
              {data.map(el => <ItemShoes key={el.id} info={el}/>)}
            </div>
          </div>
          {data.length > 4?
            <>
              <button
                className={step !== 0? styles.similar__sliderLeft : styles.similar__sliderLeft__off}
                onClick={goLeft}
              >❮</button>
              <button
                className={step > lastStep? styles.similar__sliderRight : styles.similar__sliderRight__off}
                onClick={goRight}
              >❯</button>
            </> : null
          }
        </>) : null
      }
    </>
  );
}

