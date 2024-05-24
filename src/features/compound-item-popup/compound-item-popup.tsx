import styles from "./compound-item-popup.module.css"

interface Props {
  name: string
  value: string | number
}

export default function CompoundItemPopup({ name, value }: Props) {
  return (
    <div className={styles.item}>
      <p className={`${styles.item__name} text text_type_main-default text_color_inactive`}>{name}</p>
      <span className={`${styles.item__value} text text_type_digits-default text_color_inactive`}>{value}</span>
    </div>
  )
}
