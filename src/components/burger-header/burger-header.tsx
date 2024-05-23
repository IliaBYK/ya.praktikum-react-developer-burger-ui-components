import { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-header.module.css";

export default function BurgerHeader() {
  const [current, setCurrent] = useState('Булки');

  return (
    <div className={styles.header}>
      <h1 className={`mt-10 mb-5 text text_type_main-large`}>
        Соберите бургер
      </h1>

      <ul className={`${styles.header__menu} mb-10`}>
        <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>Булки</Tab>
        <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>Соусы</Tab>
        <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>Начинки</Tab>
      </ul>
    </div>
  )
}
