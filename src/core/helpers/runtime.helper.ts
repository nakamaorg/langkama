import { IObjectVal } from '../types/runtime-values.type';
import { IBoolVal, INullVal, INumberVal, IStringVal, ISkipVal, Type } from '..';



/**
 * @description
 * Helps with runtime values
 */
export class RuntimeHelper {

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
  public static createBoolean(boolean: boolean): IBoolVal {
    return { type: Type.Boolean, value: boolean };
  }

  /**
   * @description
   * Creates an object value
   */
  public static createObject(): IObjectVal {
    return { type: Type.Object, value: {} };
  }
}