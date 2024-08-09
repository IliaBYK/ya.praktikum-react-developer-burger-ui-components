import { useDrop } from "react-dnd";
import uniqid from 'uniqid';
import { Ingridient } from "../../types/types";
import styles from "./burger-constructor.module.css"
import ConfirmOrder from "../confirm-order/confirm-order"
import ConstructorItem from "../constructor-item/constructor-item"
import { useAppDispatch, useAppSelector } from "../../services/store";
import { addConstructorItem, deleteItem } from "../../services/constructor/constructorItemsSlice";

export default function BurgerConstructor() {
  const { constructorItems, bun } = useAppSelector(store => store.constructorItems)
  const dispatch = useAppDispatch()

  const handleDelete = (index: number) => {
    dispatch(deleteItem(index))
  }

  const [{isHover}, dropTarget] = useDrop({
    accept: ['bun', 'sauce', 'main'],
    drop(item: {ingridient: Ingridient, index: number}) {
      item.index === undefined && dispatch(addConstructorItem({
        index: undefined, 
        start: undefined, 
        end: undefined, 
        ingridient: item.ingridient
      }))
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
      handlerId: monitor.getHandlerId()
    })
  });

  return (
    <section className={`${styles.main}`}>
      <div 
        className={`${styles.main__container} mb-10 pt-25 pr-4 pl-4 ${isHover && styles.main__container_green}`}
        ref={dropTarget}
      >
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
          />
        }
        
          {constructorItems.map((item, index) => item.type !== "bun" 
            && 
            <ConstructorItem 
              name={item.name} 
              ingridient={item} 
              key={uniqid()} 
              handleClose={handleDelete}
              index={index}
              position={undefined}
              isLocked={false}
            />
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
          />
        }
      </div>
        {constructorItems.map(item => <p key={uniqid()}>{item.name}</p>)}
      <ConfirmOrder/>
    </section>
  )
}

