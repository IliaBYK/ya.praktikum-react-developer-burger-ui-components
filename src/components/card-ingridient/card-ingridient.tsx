import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./card-ingridient.module.css"
import { useState } from "react"
import Modal from "../modal/modal"
import IngredientDetails from "../ingredient-details/ingredient-details"
import { Ingridient } from "../../types/types"

interface Props {
  ingridient: Ingridient
  counter: number
}

export default function Card(
  {
    ingridient,
    counter
  }: Props) {

  const [isOpen, setIsOpen] = useState(false);
  const {calories, proteins, fat, carbohydrates} = ingridient;

  const openPopup = () => {
    setIsOpen(true)
  }

  const closePopup = () => {
    setIsOpen(false)
  }
  
  return (
    <>
      <div className={`${styles.card}`} onClick={openPopup}>
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
