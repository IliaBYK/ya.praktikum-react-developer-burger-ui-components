import styles from "./burger-constructor.module.css"
import ConfirmOrder from "../confirm-order/confirm-order"
import ConstructorItem from "../constructor-item/constructor-item"
import bunBottom from "../../images/bun-bottom.png"
import sauce from "../../images/sauce.png"
import meet from "../../images/meet.png"

export default function BurgerConstructor() {
  return (
    <section className={`${styles.main} pt-25 pr-4 pl-4`}>
      <div className={`${styles.main__container} mb-10`}>
        <ConstructorItem position="top"isLocked={true}/>
        <ConstructorItem thumbnail={sauce}/>
        <ConstructorItem thumbnail={meet}/>
        <ConstructorItem position="bottom" thumbnail={bunBottom} isLocked={true}/>
      </div>

      <ConfirmOrder price="100"/>
    </section>
  )
}
