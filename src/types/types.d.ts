export type Ingridient = {
  _id: string;
  name: string;
  type: "bun" | "sauce" | "main";
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
  uuid?: string
}

export type InitialStateIngridients =  {
    ingridients: Ingridient[];
    ingridientsRequest: boolean;
    ingridientsFailed: boolean;
}

export type InitialStateConstructor =  {
  bun: ConstructorItemIgridient | null,
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

export type InitialStateOrderCost =  {
  orderCost: number;
  order: ConstructorItemIgridient[]
}

export interface Res extends Response {
  success: boolean
  data: Ingridient[]
}
