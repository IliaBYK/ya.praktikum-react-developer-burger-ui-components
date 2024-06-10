export type Ingridient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface ConstructorItemIgridient extends Ingridient {
  qty?: number = 0
}

export type InitialStateIngridients =  {
    ingridients: Ingridient[];
    ingridientsRequest: boolean;
    ingridientsFailed: boolean;
}

export type InitialStateConstructor =  {
    constructorItems: ConstructorItemIgridient[];
    constructorItemsRequest: boolean;
    constructorItemsFailed: boolean;
}

export type InitialStateModalItem =  {
    modalItem: Ingridient;
}

export type InitialStateTab =  {
    currentTab: string;
}

export type InitialStateOrderNumber =  {
    orderNumber: number;
}

export interface Res extends Response {
  success: boolean
  data: Ingridient[]
}
