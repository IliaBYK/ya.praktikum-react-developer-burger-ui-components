import styles from "./order-details.module.css"
import done from "../../images/done.png"
import { useAppSelector } from "../../services/store"

export default function OrderDetails() {
  const { orderName } = useAppSelector(store => store.orderCost)

  return (
    <div className={styles.order}>
      <p className="text text_type_main-medium mt-8 mb-15">{orderName}</p>
      <img src={done} alt="иконка успешного заказа" className={`${styles.order__img} mb-15`}/>
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}
