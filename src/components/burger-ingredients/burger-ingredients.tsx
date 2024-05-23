import styles from "./burger-ingredients.module.css";
import ListIngridient from "../list-ingridient/list-ingridient";
import ingridients from "../../utils/ingridients";
import BurgerHeader from "../burger-header/burger-header";

export default function BurgerIngridients() {
  const filterItems = (array: typeof ingridients, type: string) => {
    const mainItems = array.filter(item => item.type === type);
      return <ListIngridient title={
          type === "main"
          ? "Начинки"
          : type === "bun" ? "Булки" : "Соусы"
        } 
        items={mainItems}
      />
    }

  return (
    <main className={styles.burger}>
      <BurgerHeader />

      <section className={styles.burger__left}>
        {filterItems(ingridients, "bun")}
        {filterItems(ingridients, "sauce")}
        {filterItems(ingridients, "main")}
      </section>
    </main>
  )
}
