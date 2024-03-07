import { Type } from '../enums/type.enum';



export interface IRuntimeVal {
  type: Type;
}

export interface INullVal extends IRuntimeVal {
  type: Type.null;
  value: null;
}

export interface INumberVal extends IRuntimeVal {
  type: Type.number;
  value: number;
}

export interface IBoolVal extends IRuntimeVal {
  type: Type.boolean;
  value: boolean;
}

export function MK_NULL(): INullVal {
  return { type: Type.null, value: null };
}

export function MK_NUMBER(num: number): INumberVal {
  return { type: Type.number, value: num };
}

export function MK_BOOL(bool: boolean): IBoolVal {
  return { type: Type.boolean, value: bool };
}
