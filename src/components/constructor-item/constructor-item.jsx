import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./constructor-item.module.css"
//import { ConstructorItemIgridient } from "../../types/types"
import { useDrag, useDrop } from "react-dnd"
import { useRef } from "react"
import { useAppDispatch } from "../../services/store";
import { addConstructorItem } from "../../services/constructor/constructorItemsSlice";

/* interface Props {
  ingridient: ConstructorItemIgridient
  name: string
  position?: "top" | "bottom" | undefined
  isLocked?: boolean
  index: number
  handleClose: (id: string, index: number) => void
} */

export default function ConstructorItem({
  ingridient,
  name,
  position,
  isLocked,
  index,
  handleClose,
  moveCard,
  onDropHandler
  }/* : Props */) {
  const { price, image, _id } = ingridient;
  const dispatch = useAppDispatch()

  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: ["main", "sauce"],
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item, monitor) {
      if (!ref.current) {
        return
      }
      //dispatch(addConstructorItem(item))
      onDropHandler(item)
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })
  const [/* { isDragging } */, drag] = useDrag({
    type: "main" || "sauce",
    item: () => {
      return { _id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  //const opacity = isDragging ? 0 : 1
  !position && drag(drop(ref))

  return (
    <div 
      className={styles.container} 
      ref={position? drop : ref}>
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
