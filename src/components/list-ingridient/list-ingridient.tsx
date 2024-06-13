import Card from "../card-ingridient/card-ingridient"
import styles from "./list-ingridient.module.css"
import { Ingridient } from "../../types/types"

interface Props {
  title?: string
  items: Ingridient[]
}

export default function ListIngridient({ title, items }: Props) {
  return (
    <section className={styles.cards}>
      <h2 className="text text_type_main-medium mb-6">
        {title}
      </h2>

      <div className={`${styles.cards__container} pl-4 pr-4 mb-10`}>
        {items?.map(currentIngredient => {
          return <Card
          key={currentIngredient._id}
          ingridient={currentIngredient}
          />
        })}
      </div>
    </section>
  )
}
