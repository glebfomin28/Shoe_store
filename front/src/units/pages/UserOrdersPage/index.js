import React, {useEffect} from 'react';
import styles from './UserOrdersPage.module.css';
import {Preloader} from "../../../components";
import {OrderItem} from "./OrderItem";
import {useDeleteOrderListMutation, useGetOrderListQuery} from "../../../store/RTKQuery";


export const UserOrdersPage = () => {

  const {data = [], isLoading, error, isSuccess, refetch} = useGetOrderListQuery()
  const [deleteStory] = useDeleteOrderListMutation()

  const onDeleteStory = () => {
    deleteStory()
    refetch()
  }

  return (
    <div className={styles.orders}>
      {isLoading? <Preloader/> : error? <div>ERROR</div> : (
        <>
          <h4 className={styles.orders__header}>Заказы</h4>
          {data === null || data.length <= 0
            ? <div className={styles.orders__empty}>
                Список заказов пуст
                <p className={styles.orders__empty__grey}>
                  Оформите заказ в корзине и возвращайтесь!
                </p>
              </div>
            : (
              <>
              <hr/>

              {data.map((el) => <OrderItem key={el.id} item={el}/>)}
              <hr/>
              <button
                className={styles.orders__clear}
                onClick={onDeleteStory}
              >
                Очистить историю
              </button>
            </>
            )}
        </>
      )}
    </div>
  );
}

