import { TPrimitive } from '../types/primitive.type';
import { TFunctionCall } from '../types/function.type';
import { INativeFunctionVal, IRuntimeVal } from '../types/runtime-values.type';
import { IBooleanVal, INullVal, INumberVal, IStringVal, ISkipVal, Type } from '..';



/**
 * @description
 * Helps with runtime values
 */
export class RuntimeHelper {

  public static createValue(value: TPrimitive): IRuntimeVal {
    let type: Type;

    switch (typeof value) {
      case 'number': {
        type = Type.Number;
        break;
      }

      case 'boolean': {
        type = Type.Boolean;
        break;
      }

      case 'string': {
        type = Type.String;
        break;
      }

      default: {
        type = Type.Null;
      }
    }

    return { type, value } as IRuntimeVal;
  }

  /**
   * @description
   * Creates a null value
   */
  public static createSkip(): ISkipVal {
    return { type: Type.Skip };
  }

  /**
   * @description
   * Creates a null value
   */
  public static createNull(): INullVal {
    return { type: Type.Null, value: null };
  }

  /**
   * @description
   * Creates a number value
   *
   * @param number The numver value
   */
  public static createNumber(number: number): INumberVal {
    return { type: Type.Number, value: number };
  }

  /**
   * @description
   * Creates a string value
   *
   * @param string The string value
   */
  public static createString(string: string): IStringVal {
    return { type: Type.String, value: string };
  }

  /**
   * @description
   * Creates a boolean value
   *
   * @param boolean The boolean value
   */
  public static createBoolean(boolean: boolean): IBooleanVal {
    return { type: Type.Boolean, value: boolean };
  }

  /**
   * @description
   * Creates a function value
   *
   * @param call The function call
   */
  public static createFunction(call: TFunctionCall): INativeFunctionVal {
    return { type: Type.NativeFunction, call };
  }
}