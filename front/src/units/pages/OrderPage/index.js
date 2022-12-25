import React from 'react';
import styles from './OrderPage.module.css';
import { useSelector} from "react-redux";
import {SELECTOR_CART_ITEMS} from "../../../store/reducers";
import {Preloader} from "../../../components";
import {useNavigate} from "react-router-dom";
import {useGetInfoItemQuery} from "../../../store/RTKQuery";
import {Gallery} from "./Gallery";
import {Description} from "./Description";
import {SimilarItems} from "./SimilarItems";


export const OrderPage = () => {

  const { idItem } = useSelector(SELECTOR_CART_ITEMS)

  const {data = [], isLoading, error, isSuccess} = useGetInfoItemQuery(idItem)
  const navigate = useNavigate()

  return (
    <>
      {isLoading? <Preloader/> : error? navigate('*') :
        <>
          <div className={styles.item}>
            <Gallery images={data.images}/>
            <Description
              data={data}
              idItem={idItem}
              isSuccess={isSuccess}
            />
          </div>
          <SimilarItems item={data}/>
        </>
      }
    </>
  );
}

