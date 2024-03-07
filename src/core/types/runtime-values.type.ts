export type TValueType = 'null' | 'number' | 'boolean';

export interface IRuntimeVal {
  type: TValueType;
}

export interface INullVal extends IRuntimeVal {
  type: 'null';
  value: null;
}

export interface INumberVal extends IRuntimeVal {
  type: 'number';
  value: number;
}

export interface IBoolVal extends IRuntimeVal {
  type: 'boolean';
  value: boolean;
}

export function MK_NULL(): INullVal {
  return { type: 'null', value: null };
}

export function MK_NUMBER(num: number): INumberVal {
  return { type: 'number', value: num };
}

export function MK_BOOL(bool: boolean): IBoolVal {
  return { type: 'boolean', value: bool };
}
