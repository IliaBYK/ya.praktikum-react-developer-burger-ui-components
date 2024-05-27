import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./card-ingridient.module.css"
import { useState } from "react"
import Modal from "../modal/modal"
import IngredientDetails from "../ingredient-details/ingredient-details"

interface Props {
  counter: number
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export default function Card(
  {
    counter,
    image,
    price,
    name,
    proteins,
    fat,
    carbohydrates,
    calories
  }: Props) {

  const [isOpen, setIsOpen] = useState(false);
  const details = [calories, proteins, fat, carbohydrates];

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
      {isOpen
      &&
      <Modal close={closePopup} title="Детали ингридиента">
        <IngredientDetails
          carbohydrates={carbohydrates} 
          calories={calories} 
          proteins={proteins} 
          fat={fat} 
          image={image}
          name={name}
        />
      </Modal>
      }
    </>
  )
}
