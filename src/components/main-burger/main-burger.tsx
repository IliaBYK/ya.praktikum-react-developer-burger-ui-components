import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerConstructor from "../burger-constructor/burger-constructor"
import BurgerIngridients from "../burger-ingredients/burger-ingredients"
import styles from "./main-burger.module.css"
/* import { useState } from "react";
import { ConstructorItemIgridient, Ingridient } from "../../types/types"; */
import { useAppDispatch, useAppSelector } from "../../services/store";
import { addConstructorItem, decreaseItem, deleteItem } from "../../services/constructor/constructorItemsSlice";

export default function MainBurger() {
  const { ingridients } = useAppSelector(store => store.ingridients)
  const { constructorItems } = useAppSelector(store => store.constructorItems)
  const dispatch = useAppDispatch()
  // const [draggedElements, setDraggedElements] = useState<ConstructorItemIgridient[]>([]);

  const handleDrop = (item: {_id: string}) => {
    dispatch(addConstructorItem(ingridients.find(it => it._id === item._id)))
  };

  const hadleDelete = (id: string) => {
    if(constructorItems.find(item => item._id === id)?.qty! > 1) dispatch(decreaseItem(id))
    else {
      dispatch(decreaseItem(id));
      dispatch(deleteItem(id))
    }
  }

  return (
    <main className={styles.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngridients />
        <BurgerConstructor order={constructorItems} onDropHandler={handleDrop} handleDelete={hadleDelete} />
      </DndProvider>
    </main>
  )
}
