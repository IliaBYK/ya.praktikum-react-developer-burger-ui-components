import { ConstructorItemIgridient, Res } from "../types/types"
import { BASE_PATH, ORDER_PATH } from "../utils/constants"
import { setOrder } from "./constructor/orderCostSlice"
import { AppDispatch, useAppDispatch } from "./store"

export const getIngridients = async() => {
  try {
    const res: any = await fetch(BASE_PATH)
    const data: Res = await res.json()
    if(data && data.success) return data.data
  } catch (err) {
    console.log(err)
  };
}

export const createOrder = async(dispatch: AppDispatch, ingredients: string[]) => {
  try {
    const response = await fetch('https://norma.nomoreparties.space/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ingredients })
    });
    //позже добавлю обработку ошибок и их отображение в модальном окне
    if(ingredients.length === 0) {
      alert("Заказ пуст, соберите бургер");
      return
    }

    if (!response.ok) {
      throw new Error('Ошибка при отправки запроса на создание заказа');
    }

    const data = await response.json();
    if (data.success) {
      dispatch(setOrder({number: data.order.number, name: data.name}));
    } else {
      throw new Error('Ошибка при создании заказа', data);
    }

  } catch (error) {
    alert(error);
  }
}
