import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./constructor-item.module.css"
import crator from "../../images/crator.png"

//передаем первая или нет карточка, в зависимости от этого рисуем кнопку перед нет

interface Props {
  position?: "top" | "bottom" | undefined
  isLocked?: boolean
  name: string
  price: number
  image: string
}

export default function ConstructorItem({
  position,
  isLocked,
  name,
  price,
  image
  }: Props) {
  return (
    <div className={styles.container}>
      {position === undefined
        &&
        <button className={styles.container__btn}>
          <DragIcon type="primary" />  
        </button>}
      <ConstructorElement
        type={position}
        isLocked={isLocked}
        text={name}
        price={price}
        thumbnail={image}
        extraClass={styles.container__item}
      />
    </div>
  )
}
