import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./confirm-order.module.css"
import diamond from "../../images/diamond.svg"

interface Props {
  price: string | number
}

export default function ConfirmOrder({ price }: Props) {
  return (
    <footer className={styles.confirm}>
      <p className={`${styles.confirm__price} text text_type_digits-medium mr-2`}>{price}</p>
      <img src={diamond} alt="картинка валюты" className={`${styles.confirm__img} mr-10`} />
      <Button htmlType="button" type="primary" size="large">
        Оформить заказ
      </Button>
    </footer>
  )
}
