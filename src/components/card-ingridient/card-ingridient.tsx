import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./card-ingridient.module.css"
import crator from "../../images/crator.png"

interface Props {
  src?: string
  counter?: number
  price?: number
  name?: string
}

export default function Card(
  {
    src = crator,
    counter = 1,
    price=20,
    name="Краторная булка N-200i" }: Props) {
  return (
    <div className={`${styles.card}`}>
      <Counter count={counter} size="default" extraClass="m-1" />
      <img className={`${styles.card__img} mb-1`} src={src} alt="Изображение ингридиента" />
      <div className={`${styles.card__price}`}>
        <span className="text text_type_digits-default mr-2">{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-small mt-2 ${styles.card__description}`}>
        {name}
      </p>
    </div>
  )
}
