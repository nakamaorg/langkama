import { LangKamaError } from '..';
import { TOnErrorCallbackFn } from '../types/on-error-callback.type';
/**
 * @description
 * Helps with managing errors
 */
export declare class ErrorManager {
    /**
     * @description
     * The code source related to the error manager
     */
    private context;
    /**
     * @description
     * The list of errors
     */
    private errors;
    /**
     * @description
     * The error callback
     */
    private onError;
    /**
     * @description
     * Instantiates the error manager
     *
     * @param onError The error callback function to call in case an error was raised
     * @param context The code source to manage the errors for
     */
    constructor(onError: TOnErrorCallbackFn, context?: string);
    /**
     * @description
     * Sets the error callback function to call
     *
     * @param onError The error callback function
     */
    setCallback(onError: TOnErrorCallbackFn): void;
    /**
     * @description
     * Returns a list of raised errors
     */
    getErrors(): Array<LangKamaError>;
    /**
     * @description
     * Checks if any errors were raised
     */
    hasErrors(): boolean;
    /**
     * @description
     * Raises an error
     *
     * @param error The error to raise
     */
    raise(error: LangKamaError): void;
    /**
     * @description
     * Initializes the manager
     *
     * @param context The code source to manage the errors for
     */
    init(context?: string): void;
}
