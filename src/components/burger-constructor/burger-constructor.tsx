import styles from "./burger-constructor.module.css"
import { Ingridient } from "../../types/types";
import ConfirmOrder from "../confirm-order/confirm-order"
import ConstructorItem from "../constructor-item/constructor-item"
import { useEffect, useState } from "react";

interface Props {
  order: Ingridient[]
}

export default function BurgerConstructor({ order }: Props) {
  const [cost, setCost] = useState(0);

  useEffect(() => {
    setCost(order.map(item => item.price).reduce((acc, sum) => { return acc += sum}, 0))
  }, [])

  return (
    <section className={`${styles.main} pt-25 pr-4 pl-4`}>
      <div className={`${styles.main__container} mb-10`}>
        {order.map(item => {
          if(item.type === "bun" && order.indexOf(item) === 0) {
            return <ConstructorItem {...item} name={`${item.name} (верх)`} position="top" isLocked key={item._id}/>
          } else if(order.indexOf(item) === order.length - 1 && item.type === "bun") {
            return <ConstructorItem {...item} name={`${item.name} (низ)`} position="bottom" isLocked key={`${item._id}bottom`}/>
          }
          return <ConstructorItem {...item} key={item._id}/>
        })}
      </div>

      <ConfirmOrder price={cost}/>
    </section>
  )
}
