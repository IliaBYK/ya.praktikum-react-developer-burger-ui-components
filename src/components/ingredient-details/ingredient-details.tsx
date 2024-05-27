import CompoundItemModal from "../../features/compound-item-modal/compound-item-modal"
import styles from "./ingredient-details.module.css"

interface Props {
  image: string
  proteins: number
  calories: number
  fat: number;
  carbohydrates: number;
  name: string
}

export default function IngredientDetails({
  image,
  proteins,
  calories,
  fat,
  carbohydrates,
  name
  }: Props) {
  return (
    <div className={styles.details}>
      <img src={image} alt="Изображение ингридиента" className={`${styles.details__img} mb-4`}/>
      <p className={`text text_type_main-medium mb-8 ${styles.details__name}`}>{name}</p>
      <div className={styles.details__compound}>
        <CompoundItemModal name={"Калории,ккал"} value={calories}/>
        <CompoundItemModal name={"Белки, г"} value={proteins}/>
        <CompoundItemModal name={"Жиры, г"} value={fat}/>
        <CompoundItemModal name={"Углеводы, г"} value={carbohydrates}/>
      </div>
    </div>
  )
}
