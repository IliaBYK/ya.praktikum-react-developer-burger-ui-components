import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerConstructor from "../burger-constructor/burger-constructor"
import BurgerIngridients from "../burger-ingredients/burger-ingredients"
import styles from "./main-burger.module.css"
import { useState } from "react";
import { Ingridient } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { addConstructorItem, decreaseItem } from "../../services/constructor/constructorItemsSlice";

export default function MainBurger() {
  const { constructorItems } = useAppSelector(store => store.constructorItems)
  const { ingridients } = useAppSelector(store => store.ingridients)
  const dispatch = useAppDispatch()
  const [draggedElements, setDraggedElements] = useState<Ingridient[]>(constructorItems);

  const handleDrop = (item: Ingridient) => {
    dispatch(addConstructorItem(item))

    setDraggedElements([
      ...draggedElements,
      ...ingridients.filter(element => element._id === item._id)
    ]);
  };

  const hadleDelete = (id: string, index: number) => {
    draggedElements.splice(index)

    dispatch(decreaseItem(id))
  }

  return (
    <main className={styles.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngridients />
        <BurgerConstructor order={draggedElements} onDropHandler={handleDrop} handleDelete={hadleDelete} />
      </DndProvider>
    </main>
  )
}
