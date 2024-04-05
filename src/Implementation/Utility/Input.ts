import { type IData } from "../../Design/IData.js";
import { type ISource } from "../../Design/ISource.js";
import { type Vector } from "./Vector.js";


export type Argument<T,N extends number> = Vector<T | IData<T>,N> | IData<Vector<T,N>> | IData<Vector<T,0>>

export type Input<T,N extends number> = ISource<T,N> | Argument<T,N>