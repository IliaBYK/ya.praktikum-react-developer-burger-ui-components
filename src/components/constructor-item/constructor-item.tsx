import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import type { Identifier, XYCoord } from 'dnd-core'
import styles from "./constructor-item.module.css"
import { ConstructorItemIgridient, Ingridient } from "../../types/types"
import { useDrag, useDrop } from "react-dnd"
import { useRef } from "react"
import { useAppDispatch } from "../../services/store";
import { addConstructorItem, setConstructorItem } from "../../services/constructor/constructorItemsSlice"

interface Props {
  ingridient: ConstructorItemIgridient
  name: string
  position?: "top" | "bottom" | undefined
  isLocked?: boolean
  index: number
  handleClose: (index: number) => void
  moveCard: (dragIndex: number, hoverIndex: number) => void
  onDropHandler: (item: Ingridient) => void
}

export default function ConstructorItem({
  ingridient,
  name,
  position,
  isLocked,
  index,
  handleClose,
  moveCard,
  onDropHandler
  }: Props) {
  const { price, image, uuid } = ingridient;

  const ref = useRef(null)
  const dispatch = useAppDispatch()

  /* const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
      setCards((prevCards: Item[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as Item],
          ],
        }),
      )
    }, []) */

  const [{isHover}, dropTarget] = useDrop({
    accept: ['sauce', 'main'],
    drop(item: {ingridient: Ingridient, index: number}, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = (ref.current as any).getBoundingClientRect()

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      dispatch(setConstructorItem({
        index: index, 
        start: dragIndex, 
        end: hoverIndex, 
        ingridient: item.ingridient
      }))

      item.index = hoverIndex
      //onDropHandler(item.ingridient);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
      handlerId: monitor.getHandlerId()
    })
  });
  
  const [{isDragging}, dragRef] = useDrag({
    type: ingridient?.type ?? "none",
    item: {ingridient, index},
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  const opacity = isDragging ? 0 : 1
  !position && dragRef(dropTarget(ref))

  return (
    <div 
      className={styles.container}
      style={{ opacity }}
      ref={position ? dropTarget : ref}>
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
        handleClose={() => handleClose(index)}
      />
    </div>
  )
}
