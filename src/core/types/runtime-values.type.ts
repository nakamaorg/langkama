import { Type } from '../enums/type.enum';
import { TFunctionCall } from './function.type';



export interface IRuntimeVal {
  type: Type;
}

export interface ISkipVal extends IRuntimeVal {
  type: Type.Skip;
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

export interface IBooleanVal extends IRuntimeVal {
  type: Type.Boolean;
  value: boolean;
}

export interface IObjectVal extends IRuntimeVal {
  type: Type.Object;
  value: Record<string, IRuntimeVal>;
}

export interface IFunctionVal extends IRuntimeVal {
  type: Type.Function;
  call: TFunctionCall;
}