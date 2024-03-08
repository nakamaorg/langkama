import { IRuntimeVal, MK_BOOL, MK_NULL } from '../core/types/runtime-values.type';



export class Environment {
  private parent?: Environment;
  private variables: Map<string, IRuntimeVal>;
  private constants: Set<string>;

  constructor(parent?: Environment) {
    this.parent = parent;
    this.constants = new Set();
    this.variables = new Map();

    if (!parent) {
      this.declareVariable('bruh', MK_NULL(), true);
      this.declareVariable('W', MK_BOOL(true), true);
      this.declareVariable('L', MK_BOOL(false), true);
    }
  }

  public declareVariable(name: string, value: IRuntimeVal, constant: boolean = false): IRuntimeVal {
    if (this.variables.has(name)) {
      throw `Cannot declare variable ${name} as it's already defined`
    }

    this.variables.set(name, value);

    if (constant) {
      this.constants.add(name);
    }

    return value;
  }

  public assignVariable(name: string, value: IRuntimeVal): IRuntimeVal {
    if (!this.variables.has(name)) {
      throw `Variable ${name} is not defined`
    }

    const env = this.resolve(name);

    if (env.constants.has(name)) {
      throw 'Constant can\'t be reassigned';
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
      throw `Cannot resolve variable "${name}" as it does not exist`;
    }

    return this.parent.resolve(name);
  }
}