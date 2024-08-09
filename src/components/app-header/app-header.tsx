import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css"

export default function AppHeader() {
  return (
    <header className={styles.appHeader}>
      <div className={styles.burgerConstructor}>
        <ul className={styles.icons}>
          <li className={styles.iconBox}>
            <BurgerIcon type="primary" />
            <p className={`${styles.text} text text_type_main-small`}>
              Конструктор
            </p>
          </li>
          <li className={styles.iconBox}>
            <ListIcon type="secondary" />
            <p className={`${styles.text} text text_type_main-default text_color_inactive`}>
              Лента заказов
            </p>
          </li>
        </ul>
        <Logo />
        <div className={`${styles.iconBox} ${styles.profile}`}>
          <ProfileIcon type="secondary" />
          <p className={`${styles.text} text text_type_main-default text_color_inactive`}>
            Личный кабинет
          </p>
        </div>
      </div>
    </header>
  )
}

//todo: в дальнейшем можно больше деструктизировать этот компонент,
//вынеся все пункты меню в отдельные компоненты
