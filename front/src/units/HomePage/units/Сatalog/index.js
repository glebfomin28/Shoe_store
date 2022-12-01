import React from 'react';
import styles from "./styles/Сatalog.module.css";
import { CatalogList, CatalogTabs } from "../../../../components";

export const Сatalog = () => {



  return (
    <div className={styles.catalog}>
      <h4 className={styles.catalog__title}>Каталог</h4>

      <CatalogTabs/>

      <CatalogList/>

    </div>
  );
}

