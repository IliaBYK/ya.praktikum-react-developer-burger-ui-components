import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./card-ingridient.module.css"
import crator from "../../images/crator.png"
import PopupIngridient from "../popup-ingridient/popup-ingridient"
import { useState } from "react"

interface Props {
  image?: string
  counter?: number
  price?: number
  name?: string
  proteins: number
  fat: number
  carbohydrates: number;
  calories: number
}

export default function Card(
  {
    image = crator,
    counter = 1,
    price=20,
    name="Краторная булка N-200i",
    proteins,
    fat,
    carbohydrates,
    calories
  }: Props) {

  const [isOpen, setIsOpen] = useState(false);

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
        <img className={`${styles.card__img} mb-1`} src={image} alt="Изображение ингридиента" />
        <div className={`${styles.card__price}`}>
          <span className="text text_type_digits-default mr-2">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-small mt-2 ${styles.card__description}`}>
          {name}
        </p>
      </div>
      <PopupIngridient 
        src={image} 
        name={name} 
        proteins={proteins} 
        fats={fat} 
        carbs={carbohydrates} 
        calories={calories} 
        isOpen={isOpen} 
        close={closePopup}
      />
    </>
  )
}
