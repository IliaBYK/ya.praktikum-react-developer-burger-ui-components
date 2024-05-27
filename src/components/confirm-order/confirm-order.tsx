import { useState } from "react"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./confirm-order.module.css"
import Modal from "../modal/modal"
import diamond from "../../images/diamond.svg"
import OrderDetails from "../order-details/order-details"

interface Props {
  price: string | number
}

export default function ConfirmOrder({ price }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true)
  }

  const closePopup = () => {
    setIsOpen(false)
  }

  return (
    <>
      <footer className={styles.confirm}>
        <p className={`${styles.confirm__price} text text_type_digits-medium mr-2`}>{price}</p>
        <img src={diamond} alt="картинка валюты" className={`${styles.confirm__img} mr-10`} />
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={openPopup}
        >
          Оформить заказ
        </Button>
      </footer>
      {isOpen
        &&
        <Modal close={closePopup} title="123456" confirm={true}>
          <OrderDetails />
        </Modal>
      }
    </>
  )
}
