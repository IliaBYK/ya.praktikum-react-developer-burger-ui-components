import BurgerConstructor from "../burger-constructor/burger-constructor"
import BurgerIngridients from "../burger-ingredients/burger-ingredients"
import styles from "./main-burger.module.css"

interface Props {
  data: never[]
}

export default function MainBurger({ data }: Props) {
  return (
    <main className={styles.main}>
      <BurgerIngridients data={data} />
      <BurgerConstructor data={data} />
    </main>
  )
}
