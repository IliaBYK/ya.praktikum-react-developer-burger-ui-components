import Card from "../card-ingridient/card-ingridient"
import styles from "./list-ingridient.module.css"
import ingridients from "../../utils/ingridients"

interface Props {
  title?: string
  items: typeof ingridients
}

export default function ListIngridient({ title, items }: Props) {
  return (
    <section className={styles.cards}>
      <h2 className="text text_type_main-medium mb-6">
        {title}
      </h2>

      <div className={`${styles.cards__container} pl-4 pr-4 mb-10`}>
        {items?.map(item => {
          return <Card
            src={item.image}
            counter={1}
            price={item.price}
            name={item.name}
            key={item._id}
          />
        })}
      </div>
    </section>
  )
}
