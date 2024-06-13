import { useDrop } from "react-dnd";
import uniqid from 'uniqid';
import { ConstructorItemIgridient, Ingridient } from "../../types/types";
import styles from "./burger-constructor.module.css"
import ConfirmOrder from "../confirm-order/confirm-order"
import ConstructorItem from "../constructor-item/constructor-item"
import { useAppSelector } from "../../services/store";

interface Props {
  order: ConstructorItemIgridient[]
  onDropHandler: (arg0: Ingridient) => void
  handleDelete: (id: string, index: number) => void
}

export default function BurgerConstructor({ order, onDropHandler, handleDelete }: Props) {
  const { constructorItems } = useAppSelector(store => store.constructorItems)

  /* useEffect(() => {
    dispatch(addConstructorItem(order))
  }, [dispatch, order]) */

  const [{isHover}, dropTarget] = useDrop({
    accept: ['bun', 'sauce', 'main'],
    drop(item: Ingridient) {
      onDropHandler(item);
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
        {order.map((item, index) => {
          if(item.type === "bun" && order.indexOf(item) === 0) {
            return <ConstructorItem 
              ingridient={item} 
              name={`${item.name} (верх)`} 
              position="top" 
              isLocked 
              key={uniqid()}
              handleClose={handleDelete}
              index={index}/>
          } else if(constructorItems.indexOf(item) === constructorItems.length - 1 && item.type === "bun") {
            return <ConstructorItem 
              ingridient={item} 
              name={`${item.name} (низ)`} 
              position="bottom" 
              isLocked 
              key={uniqid()} 
              handleClose={handleDelete}
              index={index}/>
          }
          return <ConstructorItem 
            name={item.name} 
            ingridient={item} 
            key={uniqid()} 
            handleClose={handleDelete}
            index={index}/>
        })}
      </div>
        {/* <p>{JSON.stringify(constructorItems)}</p> */}
      <ConfirmOrder/>
    </section>
  )
}
