import { IRuntimeVal } from '.';
export type TVariable = {
    name: string;
    constant: boolean;
    value: IRuntimeVal;
};
