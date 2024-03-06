import { IRuntimeVal } from '../core/types/runtime-values.type';



export class Environment {
  private parent?: Environment;
  private variables: Map<string, IRuntimeVal>;

  constructor(parent?: Environment) {
    this.parent = parent;
    this.variables = new Map();
  }

  public declareVariable(name: string, value: IRuntimeVal): IRuntimeVal {
    if (this.variables.has(name)) {
      throw `Cannot declare variable ${name} as it's already defined`
    }

    this.variables.set(name, value);
    return value;
  }

  public assignVariable(name: string, value: IRuntimeVal): IRuntimeVal {
    if (!this.variables.has(name)) {
      throw `Variable ${name} is not defined`
    }

    const env = this.resolve(name);
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
      throw `Cannot resolve variable ${name} as it does not exist`;
    }

    return this.parent.resolve(name);
  }
}