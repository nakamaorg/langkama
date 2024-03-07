import { evaluate } from '../interpreter';
import { Environment } from '../environment';
import { IRuntimeVal, MK_NULL } from '../../core/types/runtime-values.type';
import { IProgramNode, IVariableDeclarationNode } from '../../core/types/ast.type';



export function evaluateProgram(program: IProgramNode, env: Environment): IRuntimeVal {
  let lastEvaluated: IRuntimeVal = MK_NULL();

  for (const statement of program.body) {
    lastEvaluated = evaluate(statement, env);
  }

  return lastEvaluated;
}

export function evaluateVariableDeclaration(declaration: IVariableDeclarationNode, env: Environment): IRuntimeVal {
  const value = declaration.value
    ? evaluate(declaration.value, env)
    : MK_NULL();

  return env.declareVariable(declaration.identifier, value, declaration.constant);
}