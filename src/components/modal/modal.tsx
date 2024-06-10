import styles from "./modal.module.css"
import closeBtn from "../../images/closeBtn.png"
import { ReactElement, useEffect } from "react"
import ModalOverlay from "../modal-overlay/modal-overlay"
import { createPortal } from "react-dom"

interface Props {
  close: () => void
  children: ReactElement
  title: string
  confirm?: boolean
}

const modalRoot = document.getElementById("modals");

export default function Modal({
    close,
    title,
    children,
    confirm
  }: Props) {
  useEffect(() => {
      const closeWithKey = (e: KeyboardEvent) => {
        if(e.key === "Escape"){
          close()
        }
      }
      window.addEventListener('keydown', closeWithKey)
    return () => window.removeEventListener('keydown', closeWithKey)
  },[close])

  return createPortal(
    (
    <ModalOverlay close={close}>
      <section className={`${styles.modal} ${confirm ? "pt-30 pb-30" : "pt-10 pr-10 pl-10 pb-15"}`}>
        <header className={`${styles.modal__header} ${confirm && styles.modal__header_confirm}`}>
          <h1 className={confirm ? `${styles.modal__confirm} text text_type_digits-large` : "text text_type_main-large"}>{title}</h1>
          <button className={`${styles.modal__btn} ${confirm && styles.modal__btn_confirm}`} onClick={close}>
            <img className={styles.modal__close} src={closeBtn} alt="кнопка закрытия попапа" />
          </button>
        </header>
        {children}
      </section>
    </ModalOverlay>
    ), modalRoot as HTMLElement
  )
}
