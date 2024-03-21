import { ConstantReassignmentError, TOnStdOutCallbackFn, VariableDefinedError, VariableNotDefinedError } from '..';

import { ErrorManager } from '../core/managers/error.manager';
import { RuntimeHelper } from '../core/helpers/runtime.helper';

import { TNullable } from '../core/types/nullable.type';
import { TVariable } from '../core/types/variable.type';
import { IRuntimeVal, IStringVal } from '../core/types/runtime-values.type';
import { TOnErrorCallbackFn } from '../core/types/on-error-callback.type';



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
 * The stdout callback function
 */
  private onStdoutEventHandler!: TOnStdOutCallbackFn;

  /**
   * @description
   * Initializes the global scope
   */
  private setupScope(): void {
    this.declareVariable('bruh', RuntimeHelper.createNull(), true);
    this.declareVariable('W', RuntimeHelper.createBoolean(true), true);
    this.declareVariable('L', RuntimeHelper.createBoolean(false), true);

    this.declareVariable('loncina', RuntimeHelper.createFunction(args => {
      const values = args.filter(e => 'value' in e).map(e => (e as IStringVal).value);
      this.onStdoutEventHandler(values.join(' '));

      return RuntimeHelper.createNull();
    }), true);

    this.declareVariable('bait', RuntimeHelper.createFunction(args => {
      const value = (args[0] as IStringVal).value ?? 'bruh';
      return RuntimeHelper.createString(value.toString());
    }), true);
  }

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
      this.setupScope();
    }
  }

  /**
   * @description
   * Sets the callback function for the stdout stream
   *
   * @param onStdout The stdout callback function
   */
  public setStdoutCallback(onStdout: TOnStdOutCallbackFn): void {
    this.onStdoutEventHandler = onStdout;
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