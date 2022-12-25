import React, {useState} from 'react';
import styles from './FilterItem.module.css';
import upIcon from '../../img/up.png'

export const FilterItem = ({children, name}) => {

  const [drop, setDrop] = useState(true)

  return (
    <>
      <div className={styles.body} onClick={() => setDrop(p => !p)}>
        <div className={styles.body__title}>{name}</div>
        <img src={upIcon} alt=""  className={styles.body__icon}
             style={drop? {transform: 'rotateX(180deg)'} : null}
        />
      </div>
      <div className={styles.body__actions }
           style={drop? {maxHeight: 0}: null}
      >
        {children}
      </div>
      <hr className={styles.body__hr}/>
    </>

  );
}

