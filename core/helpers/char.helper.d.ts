/**
 * @description
 * Helps with single character operations and checks
 */
export declare class CharHelper {
    /**
     * @description
     * Checks if character can be skipped
     *
     * @param char The character to check
     */
    static isSkippable(char: string): boolean;
    /**
     * @description
     * Checks if character is a number
     *
     * @param char The character to check
     */
    static isNumber(char: string): boolean;
    /**
     * @description
     * Checks if character is alphanumeric
     *
     * @param char The character to check
     */
    static isAlpha(char: string): boolean;
}
