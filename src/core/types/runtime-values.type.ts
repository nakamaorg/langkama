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

export interface IStringVal extends IRuntimeVal {
  type: Type.String;
  value: string;
}

export interface IBoolVal extends IRuntimeVal {
  type: Type.Boolean;
  value: boolean;
}