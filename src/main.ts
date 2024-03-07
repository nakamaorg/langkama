import { Parser } from './frontend/parser';
import { evaluate } from './runtime/interpreter';
import { Environment } from './runtime/environment';
import { MK_BOOL, MK_NULL, MK_NUMBER } from './core/types/runtime-values.type';



const code = `
  const birthyear = 1998.
  let curryear = 2024.
  birthyear = 2050.
  let age = curryear - birthyear.

  age
`;

try {
  const parser = new Parser();
  const env = new Environment();

  env.declareVariable('one', MK_NUMBER(1));
  env.declareVariable('ten', MK_NUMBER(10));

  env.declareVariable('null', MK_NULL(), true);
  env.declareVariable('true', MK_BOOL(true), true);
  env.declareVariable('false', MK_BOOL(false), true);

  const program = parser.parse(code);
  const result = evaluate(program, env);

  console.log(result);
} catch (err) {
  console.error(`Error: ${err}`);
}
