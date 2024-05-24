import styles from "./popup-ingridient.module.css"
import closeBtn from "../../images/closeBtn.png"
import CompoundItemPopup from "../../features/compound-item-popup/compound-item-popup"

interface Props {
  isOpen: boolean
  close: () => void
  src: string
  name: string
  proteins: number
  fats: number
  carbs: number
  calories: number
}

export default function PopupIngridient({
    isOpen, 
    close,
    src,
    name,
    proteins,
    fats,
    calories,
    carbs
  }: Props) {
  return (
    <section className={`${styles.popup} ${isOpen ? styles.popup_visible : ""}`}>
      <div className={`${styles.popup__container} pt-10 pr-10 pl-10 pb-15`}>
        <header className={styles.popup__header}>
          <h1 className="text text_type_main-large">Детали ингредиента</h1>
          <button className={styles.popup__btn} onClick={close}>
            <img className={styles.popup__close} src={closeBtn} alt="кнопка закрытия попапа" />
          </button>
        </header>
        <img className={`${styles.popup__img} mb-4`} src={src} alt="Изображение ингридиента" />
        <p className={`${styles.popup__name} text text_type_main-medium mb-8`}>{name}</p>
        <div className={styles.popup__compound}>
          <CompoundItemPopup name="Калории,ккал" value={calories} />
          <CompoundItemPopup name="Белки, г" value={proteins} />
          <CompoundItemPopup name="Жиры, г" value={fats} />
          <CompoundItemPopup name="Углеводы, г" value={carbs} />
        </div>
      </div>
    </section>
  )
}
