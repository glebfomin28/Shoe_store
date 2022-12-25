import React, {useState} from 'react';
import styles from './Filters.module.css';
import {useGetFiltersListQuery} from "../../../../store/RTKQuery";
import {FilterItem} from "../../../../components/FilterItem";
import {CategoryFilterItem} from "./CategoryFilterItem";
import {PriceFilter} from "./PriceFilter";
import {ColorFilter} from "./ColorFilter";
import {SizeFilter} from "./SizeFilter";
import {ReasonFilter} from "./ReasonFilter";
import {SeasonFilter} from "./SeasonFilter";
import {BrandFilter} from "./BrandFilter";
import {useSelector} from "react-redux";
import {FILTERS_ITEMS} from "../../../../store/reducers";

export const Filters = () => {

  const { filersObj } = useSelector(FILTERS_ITEMS)


  const {data = [], isLoading, isSuccess} = useGetFiltersListQuery()

  console.log(filersObj)

  return (
    <div className={styles.filters}>
      {isSuccess?
        <>
          <hr className={styles.filters__hr}/>
          <FilterItem
            name="Категория"
            children={data.division.map(el => <CategoryFilterItem key={el} name={el}/>)}
          />
          <FilterItem
            name="Цена"
            children={<PriceFilter/>}
          />
          <FilterItem
            name="Цвет"
            children={data.color.map(el => <ColorFilter key={el.name} color={el}/>)}
          />
          <FilterItem
            name="Размер"
            children={
              <div className={styles.filters__size}>
                {data.sizes.map(el => <SizeFilter key={el} size={el}/>)}
              </div>
            }
          />
          <FilterItem
            name="Повод"
            children={data.reason.map(el => <ReasonFilter key={el} reason={el}/>)}
          />
          <FilterItem
            name="Сезон"
            children={data.season.map(el => <SeasonFilter key={el} season={el}/>)}
          />
          <FilterItem
            name="Бренд"
            children={data.brand.map(el =>  <BrandFilter key={el} brand={el}/>)}
          />
        </> : null
      }
    </div>
  );
}

