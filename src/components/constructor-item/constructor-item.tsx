import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./constructor-item.module.css"
import { ConstructorItemIgridient } from "../../types/types"

interface Props {
  item: ConstructorItemIgridient
  name: string
  position?: "top" | "bottom" | undefined
  isLocked?: boolean
  handleClose: (id: string) => void
}

export default function ConstructorItem({
  item,
  name,
  position,
  isLocked,
  handleClose
  }: Props) {
  const { price, image, _id } = item; 

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
        handleClose={() => handleClose(_id)}
      />
    </div>
  )
}
