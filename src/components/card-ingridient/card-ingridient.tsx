import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./card-ingridient.module.css"
import { useEffect, useState } from "react"
import Modal from "../modal/modal"
import IngredientDetails from "../ingredient-details/ingredient-details"
import { Ingridient } from "../../types/types"
import { useDrag } from "react-dnd"
import { useAppSelector } from "../../services/store"

interface Props {
  ingridient: Ingridient
}

export default function Card({ ingridient }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [counter, setCounter] = useState(0);

  const {calories, proteins, fat, carbohydrates, type, _id} = ingridient;

  const { constructorItems } = useAppSelector(store => store.constructorItems)

  const [, dragRef] = useDrag({
    type: type,
    item: {_id}
  })

  useEffect(() => {
    constructorItems.find(item => item._id === _id)
    ?
    constructorItems.map(item => {
      return item._id === _id && setCounter(item.qty!)
    })
    :
    setCounter(0)
  }, [constructorItems, _id])

  const openPopup = () => {
    setIsOpen(true)
  }

  const closePopup = () => {
    setIsOpen(false)
  }
  
  return (
    <>
      <div className={`${styles.card}`} onClick={openPopup} ref={dragRef}>
        <Counter count={counter} size="default" extraClass="m-1" />
        <img className={`${styles.card__img} mb-1`} src={ingridient.image} alt="Изображение ингридиента" />
        <div className={`${styles.card__price}`}>
          <span className="text text_type_digits-default mr-2">{ingridient.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-small mt-2 ${styles.card__description}`}>
          {ingridient.name}
        </p>
      </div>
      {isOpen
      &&
      <Modal close={closePopup} title="Детали ингридиента">
        <IngredientDetails
          carbohydrates={carbohydrates} 
          calories={calories} 
          proteins={proteins} 
          fat={fat} 
          image={ingridient.image}
          name={ingridient.name}
        />
      </Modal>
      }
    </>
  )
}
