import { useDrop } from "react-dnd";
import uniqid from 'uniqid';
import { ConstructorItemIgridient } from "../../types/types";
import styles from "./burger-constructor.module.css"
import ConfirmOrder from "../confirm-order/confirm-order"
import ConstructorItem from "../constructor-item/constructor-item"
import { useAppSelector } from "../../services/store";

interface Props {
  order: ConstructorItemIgridient[]
  onDropHandler: (arg0: {_id: string}) => void
  handleDelete: (id: string) => void
}

export default function BurgerConstructor({ order, onDropHandler, handleDelete }: Props) {
  const { constructorItems } = useAppSelector(store => store.constructorItems)

  /* useEffect(() => {
    dispatch(addConstructorItem(order))
  }, [dispatch, order]) */

  const [{isHover}, dropTarget] = useDrop({
    accept: ['bun', 'sauce', 'main'],
    drop(item: {_id: string}) {
      onDropHandler(item);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  return (
    <section className={`${styles.main}`}>
      <div className={`${styles.main__container} mb-10 pt-25 pr-4 pl-4 ${isHover && styles.main__container_green}`} ref={dropTarget}>
        {constructorItems.map(item => {
          if(item.type === "bun" && order.indexOf(item) === 0) {
            return <ConstructorItem item={item} name={`${item.name} (верх)`} position="top" isLocked key={uniqid()} handleClose={handleDelete}/>
          } else if(order.indexOf(item) === order.length - 1 && item.type === "bun") {
            return <ConstructorItem item={item} name={`${item.name} (низ)`} position="bottom" isLocked key={uniqid()} handleClose={handleDelete}/>
          }
          return <ConstructorItem name={item.name} item={item} key={uniqid()} handleClose={handleDelete}/>
        })}
      </div>
        <p>{JSON.stringify(constructorItems)}</p>
      <ConfirmOrder/>
    </section>
  )
}
