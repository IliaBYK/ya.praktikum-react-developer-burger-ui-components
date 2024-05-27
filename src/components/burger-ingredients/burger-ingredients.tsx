import styles from "./burger-ingredients.module.css";
import ListIngridient from "../list-ingridient/list-ingridient";
import ingridients from "../../utils/ingridients";
import BurgerHeader from "../burger-header/burger-header";

interface Props {
  ingridient?: keyof typeof ingridients
}

//Не совсем понятно как типизировать то, чего нет на данном этапе, нужно расписать все свойства ингридиента?

export default function BurgerIngridients({ ingridient }: Props) {
  const filterItems = (array: typeof ingridients, type: string) => {
    const mainItems = array.filter((item) => item.type === type);
      return <ListIngridient title={
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
