import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./constructor-item.module.css"
import crator from "../../images/crator.png"

//передаем первая или нет карточка, в зависимости от этого рисуем кнопку перед нет

interface Props {
  position?: "top" | "bottom"
  isLocked?: boolean
  text?: string
  price?: number
  thumbnail?: string
}

export default function ConstructorItem({
  position = "top",
  isLocked,
  text = "Краторная булка N-200i (верх)",
  price = 200,
  thumbnail = crator
  }: Props) {
  return (
    <div className={styles.container}>
      {position === undefined && <DragIcon type="primary" />}
      <ConstructorElement
        type={position}
        isLocked={isLocked}
        text={text}
        price={price}
        thumbnail={thumbnail}
        extraClass={styles.container__item}
      />
    </div>
  )
}
