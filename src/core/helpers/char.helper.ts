import { Char } from '../enums/char.enum';



/**
 * @description
 * Helps with single character operations and checks
 */
export class CherHelper {

  /**
   * @description
   * Checks if character can be skipped
   *
   * @param char The character to check
   */
  public static isSkippable(char: string): boolean {
    return char === Char.Space || char === Char.Tabulation || char === Char.NewLine || char === Char.CarriageReturn;
  }

  /**
   * @description
   * Checks if character is a number
   *
   * @param char The character to check
   */
  public static isNumber(char: string): boolean {
    const c = char.charCodeAt(0);
    const bounds = ['0'.charCodeAt(0), '9'.charCodeAt(0)];

    return c >= bounds[0] && c <= bounds[1];
  }

  /**
   * @description
   * Checks if character is alphanumeric
   *
   * @param char The character to check
   */
  public static isAlpha(char: string): boolean {
    return char.toLowerCase() !== char.toUpperCase();
  }
}