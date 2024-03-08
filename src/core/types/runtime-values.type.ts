import { Type } from '../enums/type.enum';



export interface IRuntimeVal {
  type: Type;
}

export interface INullVal extends IRuntimeVal {
  type: Type.Null;
  value: null;
}

export interface INumberVal extends IRuntimeVal {
  type: Type.Number;
  value: number;
}

export interface IBoolVal extends IRuntimeVal {
  type: Type.Boolean;
  value: boolean;
}

export function MK_NULL(): INullVal {
  return { type: Type.Null, value: null };
}

export function MK_NUMBER(number: number): INumberVal {
  return { type: Type.Number, value: number };
}

export function MK_BOOL(boolean: boolean): IBoolVal {
  return { type: Type.Boolean, value: boolean };
}
