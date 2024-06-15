import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerConstructor from "../burger-constructor/burger-constructor"
import BurgerIngridients from "../burger-ingredients/burger-ingredients"
import styles from "./main-burger.module.css"

export default function MainBurger() {
  return (
    <main className={styles.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngridients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  )
}
