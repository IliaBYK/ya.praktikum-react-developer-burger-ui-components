import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./constructor-item.module.css"
import { ConstructorItemIgridient } from "../../types/types"
import { useDrag } from "react-dnd"

interface Props {
  ingridient: ConstructorItemIgridient
  name: string
  position?: "top" | "bottom" | undefined
  isLocked?: boolean
  index: number
  handleClose: (id: string, index: number) => void
}

export default function ConstructorItem({
  ingridient,
  name,
  position,
  isLocked,
  index,
  handleClose
  }: Props) {
  const { price, image, _id, type } = ingridient;

  const [, dragRef] = useDrag({
    type: type !== "bun" ? type : "",
    item: {...ingridient}
  })

  return (
    <div className={styles.container} ref={dragRef}>
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
        handleClose={() => handleClose(_id, index)}
      />
    </div>
  )
}
