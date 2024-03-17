import { ConstantReassignmentError, VariableDefinedError, VariableNotDefinedError } from '..';

import { ErrorManager } from '../core/managers/error.manager';

import { TNullable } from '../core/types/nullable.type';
import { TVariable } from '../core/types/variable.type';
import { TOnErrorCallbackFn } from '../core/types/on-error-callback.type';
import { IRuntimeVal, MK_BOOL, MK_NULL } from '../core/types/runtime-values.type';



/**
 * @description
 * Scope
 */
export class Environment {

  /**
   * @description
   * The error manager
   */
  public errorManager?: ErrorManager;

  /**
   * @description
   * The parent scope
   */
  private parent: TNullable<Environment>;

  /**
   * @description
   * The list of variables
   */
  private variables: Map<string, TVariable>;

  /**
   * @description
   * Instantiates a scope instance
   *
   * @param parent the parent scope
   * @param onError The error callback function
   */
  constructor(parent: TNullable<Environment>, onError?: TOnErrorCallbackFn) {
    this.parent = parent;
    this.variables = new Map();

    if (onError) {
      this.errorManager = new ErrorManager(onError);
    }

    if (!parent) {
      this.declareVariable('bruh', MK_NULL(), true);
      this.declareVariable('W', MK_BOOL(true), true);
      this.declareVariable('L', MK_BOOL(false), true);
    }
  }

  /**
   * @description
   * Sets the callback function for the error manager
   *
   * @param onError The error callback function
   */
  public setErrorCallback(onError: TOnErrorCallbackFn): void {
    if (this.errorManager) {
      this.errorManager?.setCallback(onError);
    } else {
      this.errorManager = new ErrorManager(onError);
    }
  }

  /**
   * @description
   * Creates a new variable
   *
   * @param name The name of the variable
   * @param value The value of the variable
   * @param constant Whether the variable is a constant or not
   */
  public declareVariable(name: string, value: IRuntimeVal, constant: boolean = false): IRuntimeVal {
    if (this.variables.has(name)) {
      this.errorManager?.raise(new VariableDefinedError(name));
    }

    this.variables.set(name, { name, constant, value });
    return value;
  }

  /**
   * @description
   * Assigns a value to a variable
   *
   * @param name The name of the variable
   * @param value The value to assign
   */
  public assignVariable(name: string, value: IRuntimeVal): IRuntimeVal {
    if (!this.variables.has(name)) {
      this.errorManager?.raise(new VariableNotDefinedError(name));
    }

    const env = this.resolve(name);
    const val = env.getValue(name);

    if (val?.constant) {
      this.errorManager?.raise(new ConstantReassignmentError(name));
    }

    env.variables.set(name, { ...val, value });
    return value;
  }

  /**
   * @description
   * Retrieves the value of a variable
   *
   * @param name The name of the variable
   */
  public getValue(name: string): TVariable {
    const env = this.resolve(name);
    return env.variables.get(name) as TVariable;
  }

  /**
   * @description
   * Resolves the scope of the variable
   *
   * @param name The name if the variable
   */
  public resolve(name: string): Environment {
    if (this.variables.has(name)) {
      return this;
    }

    if (!this.parent) {
      this.errorManager?.raise(new VariableNotDefinedError(name));
      return this;
    }

    return this.parent.resolve(name);
  }
}