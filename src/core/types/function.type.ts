import { Environment } from '../..';
import type { IRuntimeVal } from '.';



export type TFunctionCall = (args: Array<IRuntimeVal>, env: Environment) => IRuntimeVal;