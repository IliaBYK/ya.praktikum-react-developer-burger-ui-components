import { Res } from "../types/types"
import BASE_PATH from "../utils/constants"

export const getIngridients = async() => {
  try {
    const res: any = await fetch(BASE_PATH)
    const data: Res = await res.json()
    if(data && data.success) return data.data
  } catch (err) {
    console.log(err)
  };
}
