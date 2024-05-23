import styles from "./burger-constructor.module.css"
import ConfirmOrder from "../confirm-order/confirm-order"
import ConstructorItem from "../constructor-item/constructor-item"

export default function BurgerConstructor() {
  return (
    <section className={`${styles.main} pt-25 pr-4 pl-4`}>
      <div className={`${styles.main__container} mb-10`}>
        <ConstructorItem />
      </div>

      <ConfirmOrder price="100"/>
    </section>
  )
}
