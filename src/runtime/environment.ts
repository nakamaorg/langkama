import { ConstantReassignmentError, VariableDefinedError, VariableNotDefinedError } from '..';

import { ErrorManager } from '../core/managers/error.manager';

import { TNullable } from '../core/types/nullable.type';
import { TOnErrorCallbackFn } from '../core/types/on-error-callback.type';
import { IRuntimeVal, MK_BOOL, MK_NULL } from '../core/types/runtime-values.type';



export class Environment {
  private constants: Set<string>;
  public errorManager?: ErrorManager;
  private parent: TNullable<Environment>;
  private variables: Map<string, IRuntimeVal>;

  constructor(parent: TNullable<Environment>, onError?: TOnErrorCallbackFn) {
    this.parent = parent;
    this.constants = new Set();
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

  public setErrorCallback(onError: TOnErrorCallbackFn): void {
    if (this.errorManager) {
      this.errorManager?.setCallback(onError);
    } else {
      this.errorManager = new ErrorManager(onError);
    }
  }

  public declareVariable(name: string, value: IRuntimeVal, constant: boolean = false): IRuntimeVal {
    if (this.variables.has(name)) {
      this.errorManager?.raise(new VariableDefinedError(name));
    }

    this.variables.set(name, value);

    if (constant) {
      this.constants.add(name);
    }

    return value;
  }

  public assignVariable(name: string, value: IRuntimeVal): IRuntimeVal {
    if (!this.variables.has(name)) {
      this.errorManager?.raise(new VariableNotDefinedError(name));
    }

    const env = this.resolve(name);

    if (env.constants.has(name)) {
      this.errorManager?.raise(new ConstantReassignmentError(name));
    }

    env.variables.set(name, value);

    return value;
  }

  public getValue(name: string): IRuntimeVal {
    const env = this.resolve(name);
    return env.variables.get(name) as IRuntimeVal;
  }

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