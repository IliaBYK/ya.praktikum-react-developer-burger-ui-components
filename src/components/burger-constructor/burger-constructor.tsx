import { useDrop } from "react-dnd";
import uniqid from 'uniqid';
import update from 'immutability-helper'
import { Ingridient } from "../../types/types";
import styles from "./burger-constructor.module.css"
import ConfirmOrder from "../confirm-order/confirm-order"
import ConstructorItem from "../constructor-item/constructor-item"
import { useAppDispatch, useAppSelector } from "../../services/store";
import { useCallback, useState } from "react";
import { addConstructorItem, decreaseItem } from "../../services/constructor/constructorItemsSlice";

export default function BurgerConstructor() {
  const { constructorItems, bun } = useAppSelector(store => store.constructorItems)
  const { ingridients } = useAppSelector(store => store.ingridients)
  const dispatch = useAppDispatch()
  const [draggedElements, setDraggedElements] = useState<Ingridient[]>([]);

  const handleDrop = (item: Ingridient) => {
    const bun = draggedElements.find(item => item.type === "bun")

    if(item.type === "bun" && !bun) {
      setDraggedElements([
        ...ingridients.filter(element => element._id === item._id),
        ...draggedElements,
      ]);
    } else if(item.type === "bun" && bun) draggedElements.splice(draggedElements.indexOf(bun!), 1, item)

    else setDraggedElements([
      ...draggedElements,
      ...ingridients.filter(element => element._id === item._id)
    ]);
  };

  const handleDelete = (id: string, index: number) => {
    draggedElements.splice(index, 1)

    dispatch(decreaseItem(id))
  }

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
      setDraggedElements((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        }),
      )
    }, [])

  const [{isHover}, dropTarget] = useDrop({
    accept: ['bun', 'sauce', 'main'],
    drop(item: Ingridient) {
      handleDrop(item);
      dispatch(addConstructorItem(item))
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  return (
    <section className={`${styles.main}`}>
      <div 
        className={`${styles.main__container} mb-10 pt-25 pr-4 pl-4 ${isHover && styles.main__container_green}`} 
        ref={dropTarget}>
        {bun
          && 
          <ConstructorItem 
            ingridient={bun} 
            name={`${bun.name} (верх)`} 
            position="top" 
            isLocked 
            key={uniqid()}
            handleClose={handleDelete}
            index={0}
            /* moveCard={moveCard}
            onDropHandler={handleDrop} *//>
        }
        
        
        {draggedElements.map((item, index) => item.type !== "bun" 
          && 
          <ConstructorItem 
            name={item.name} 
            ingridient={item} 
            key={uniqid()} 
            handleClose={handleDelete}
            index={index}
            /* moveCard={moveCard} */
            position={undefined}
            isLocked={false}
            /* onDropHandler={handleDrop} *//>
        )}

        {bun
          && 
          <ConstructorItem 
            ingridient={bun} 
            name={`${bun.name} (низ)`} 
            position="bottom" 
            isLocked 
            key={uniqid()}
            handleClose={handleDelete}
            index={-1}
            /* moveCard={moveCard}
            onDropHandler={handleDrop} *//>
        }
      </div>
        <p>{JSON.stringify(constructorItems)}</p>
      <ConfirmOrder/>
    </section>
  )
}
