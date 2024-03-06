import { Parser } from './frontend/parser';
import { evaluate } from './runtime/interpreter';
import { Environment } from './runtime/environment';
import { MK_BOOL, MK_NULL, MK_NUMBER } from './core/types/runtime-values.type';



const code = `
  ten - true
`;

try {
  const parser = new Parser();
  const env = new Environment();

  env.declareVariable('null', MK_NULL());
  env.declareVariable('one', MK_NUMBER(1));
  env.declareVariable('ten', MK_NUMBER(100));
  env.declareVariable('true', MK_BOOL(true));
  env.declareVariable('false', MK_BOOL(false));

  const program = parser.parse(code);
  const result = evaluate(program, env);

  console.log(result);
} catch (err) {
  console.error(`Error: ${err}`);
}
