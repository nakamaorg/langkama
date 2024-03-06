export type TValueType = 'null' | 'number';

export interface IRuntimeVal {
  type: TValueType
}

export interface INullVal extends IRuntimeVal {
  type: 'null',
  value: 'null'
}

export interface INumberVal extends IRuntimeVal {
  type: 'number',
  value: number
}