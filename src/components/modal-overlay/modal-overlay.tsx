import { ReactNode, useEffect } from "react"
import styles from "./modal-overlay.module.css"

interface Props {
  children: ReactNode
  close: () => void
}

export default function ModalOverlay({ children, close }: Props) {
   useEffect(() => {
      const closeWithKey = (e: KeyboardEvent) => {
        if(e.key === "Escape"){
          close()
        }
      }
      window.addEventListener('keydown', closeWithKey)
    return () => window.removeEventListener('keydown', closeWithKey)
  },[])

  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((e.target as HTMLElement).classList.toString().includes("modal__overlay")) {
      close();
    }
  }

  return (
    <div className={styles.modal__overlay} onClick={closeModal}>
      {children}
    </div>
  )
}
