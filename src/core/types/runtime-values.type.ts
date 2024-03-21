import { Type } from '../enums/type.enum';
import { TFunctionCall } from './function.type';
import type { Environment, IStatementNode } from '../..';



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

export interface IArrayVal extends IRuntimeVal {
  type: Type.Array;
  value: Array<any>;
}

export interface INativeFunctionVal extends IRuntimeVal {
  type: Type.NativeFunction;
  call: TFunctionCall;
}

export interface IFunctionVal extends IRuntimeVal {
  name: string;
  env: Environment;
  type: Type.Function;
  parameters: Array<string>;
  body: Array<IStatementNode>;
}