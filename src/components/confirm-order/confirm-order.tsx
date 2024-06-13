import { useMemo, useState } from "react"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./confirm-order.module.css"
import Modal from "../modal/modal"
import diamond from "../../images/diamond.svg"
import OrderDetails from "../order-details/order-details"
import { useAppSelector } from "../../services/store"

export default function ConfirmOrder() {
  const [isOpen, setIsOpen] = useState(false);
  const [cost, setCost] = useState(0)

  const { constructorItems } = useAppSelector(store => store.constructorItems)

  useMemo(() => {
    setCost(constructorItems.reduce((acc, item) => acc += item.price * item.qty!, 0))
  }, [constructorItems])

  const openPopup = () => {
    setIsOpen(true)
  }

  const closePopup = () => {
    setIsOpen(false)
  }

  return (
    <>
      <footer className={styles.confirm}>
        <p className={`${styles.confirm__price} text text_type_digits-medium mr-2`}>{cost}</p>
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
