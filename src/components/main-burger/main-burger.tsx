import BurgerConstructor from "../burger-constructor/burger-constructor"
import BurgerIngridients from "../burger-ingredients/burger-ingredients"
import styles from "./main-burger.module.css"

export default function MainBurger() {
  return (
    <main className={styles.main}>
      <BurgerIngridients />
      <BurgerConstructor />
    </main>
  )
}
