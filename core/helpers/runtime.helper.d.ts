import { TPrimitive } from '../types/primitive.type';
import { TFunctionCall } from '../types/function.type';
import { IArrayVal, INativeFunctionVal, IRuntimeVal } from '../types/runtime-values.type';
import { IBooleanVal, INullVal, INumberVal, IStringVal, ISkipVal } from '..';
/**
 * @description
 * Helps with runtime values
 */
export declare class RuntimeHelper {
    /**
     * @description
     * Creates a runtime value given the primitive type of the input
     *
     * @param value The value to create the runtime value for
     */
    static createValue(value: TPrimitive): IRuntimeVal;
    /**
     * @description
     * Creates a null value
     */
    static createSkip(): ISkipVal;
    /**
     * @description
     * Creates a null value
     */
    static createNull(): INullVal;
    /**
     * @description
     * Creates a number value
     *
     * @param number The numver value
     */
    static createNumber(number: number): INumberVal;
    /**
     * @description
     * Creates a string value
     *
     * @param string The string value
     */
    static createString(string: string): IStringVal;
    /**
     * @description
     * Creates a boolean value
     *
     * @param boolean The boolean value
     */
    static createBoolean(boolean: boolean): IBooleanVal;
    /**
     * @description
     * Creates an array value
     *
     * @param items The elements of the array
     */
    static createArray(items: Array<any>): IArrayVal;
    /**
     * @description
     * Creates a function value
     *
     * @param call The function call
     */
    static createFunction(call: TFunctionCall): INativeFunctionVal;
}
