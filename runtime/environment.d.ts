import { TOnStdOutCallbackFn } from '..';
import { ErrorManager } from '../core/managers/error.manager';
import { TNullable } from '../core/types/nullable.type';
import { TVariable } from '../core/types/variable.type';
import { IRuntimeVal } from '../core/types/runtime-values.type';
import { TOnErrorCallbackFn } from '../core/types/on-error-callback.type';
/**
 * @description
 * Scope
 */
export declare class Environment {
    /**
     * @description
     * The error manager
     */
    errorManager?: ErrorManager;
    /**
     * @description
     * The parent scope
     */
    private parent;
    /**
     * @description
     * The list of variables
     */
    private variables;
    /**
   * @description
   * The stdout callback function
   */
    private onStdoutEventHandler;
    /**
     * @description
     * Initializes the global scope
     */
    private setupScope;
    /**
     * @description
     * Instantiates a scope instance
     *
     * @param parent the parent scope
     * @param onError The error callback function
     */
    constructor(parent: TNullable<Environment>, onError?: TOnErrorCallbackFn);
    /**
     * @description
     * Sets the callback function for the stdout stream
     *
     * @param onStdout The stdout callback function
     */
    setStdoutCallback(onStdout: TOnStdOutCallbackFn): void;
    /**
     * @description
     * Sets the callback function for the error manager
     *
     * @param onError The error callback function
     */
    setErrorCallback(onError: TOnErrorCallbackFn): void;
    /**
     * @description
     * Creates a new variable
     *
     * @param name The name of the variable
     * @param value The value of the variable
     * @param constant Whether the variable is a constant or not
     */
    declareVariable(name: string, value: IRuntimeVal, constant?: boolean): IRuntimeVal;
    /**
     * @description
     * Assigns a value to a variable
     *
     * @param name The name of the variable
     * @param value The value to assign
     */
    assignVariable(name: string, value: IRuntimeVal): IRuntimeVal;
    /**
     * @description
     * Retrieves the value of a variable
     *
     * @param name The name of the variable
     */
    getValue(name: string): TVariable;
    /**
     * @description
     * Resolves the scope of the variable
     *
     * @param name The name if the variable
     */
    resolve(name: string): Environment;
}
