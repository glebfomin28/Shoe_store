import React, { useState } from 'react';
import styles from './Gallery.module.css';
import upIcon  from '../../../../img/up.png'
import downIcon from '../../../../img/down.png'


export const Gallery = ({images}) => {

  const [activeImag, setActiveImag] = useState(0)
  const [move, setMove] = useState(0)
  const maxMove = (images.length - 4) * -100

  const handleClickUp = () => {
    if (move < 0)
      setMove(p => p + 100)
  }

  const handleClickDown = () => {
    if (move > maxMove)
      setMove(p => p - 100)
  }
  return (
    <div className={styles.gallery}>
      <div className={styles.gallery__window}>
        <div className={styles.gallery__slider}
             style={{transform: `translateY(${move}px)`}}
        >
          {images.map((el, index) =>
            <img
              key={el}
              className={
                activeImag !== index?
                  styles.gallery__slider__item :
                  styles.gallery__slider__item__active
              }
              src={el}
              onClick={() => setActiveImag(index)}
              alt=''
            />)}
        </div>
      </div>
      <img
        src={images[activeImag]}
        className={styles.gallery__imgActive} alt=""
      />

      {images.length > 1?
        <>
          <img src={upIcon}
            className={move !== 0?
              styles.gallery__slider__up : styles.gallery__slider__off}
             alt="up"
            onClick={handleClickUp}
          />
          <img src={downIcon}
            className={move !== maxMove && images.length >= 4?
              styles.gallery__slider__down : styles.gallery__slider__off }
            alt="down"
            onClick={handleClickDown }
          />
        </> : null
      }
    </div>
  );
}

