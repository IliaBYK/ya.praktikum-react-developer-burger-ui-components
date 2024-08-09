import styles from "./burger-ingredients.module.css";
import ListIngridient from "../list-ingridient/list-ingridient";
import BurgerHeader from "../burger-header/burger-header";
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchIngridients } from "../../services/ingridients/ingridientsSlice";

export default function BurgerIngridients() {
  const dispatch = useAppDispatch();

  const { ingridients } = useAppSelector(store => store.ingridients);

  useEffect(() => {
    dispatch(fetchIngridients())
  }, [dispatch]);

  const filterItems = (array, type) => {
    const mainItems = array.filter((item) => item.type === type);
      return <ListIngridient 
        title={
          type === "main"
          ? "Начинки"
          : type === "bun" ? "Булки" : "Соусы"
        } 
        items={mainItems}
      />
    }

  return (
    <section className={styles.burger}>
      <BurgerHeader />

      <section className={styles.burger__left}>
        {filterItems(ingridients, "bun")}
        {filterItems(ingridients, "sauce")}
        {filterItems(ingridients, "main")}
      </section>
    </section>
  )
}
