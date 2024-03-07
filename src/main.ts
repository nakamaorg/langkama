import { Parser } from './frontend/parser';
import { evaluate } from './runtime/interpreter';
import { Environment } from './runtime/environment';



const code = `
  const birthyear = 1998.
  let curryear = 2024.
  let age = curryear - birthyear.

  age
`;

try {
  const parser = new Parser();
  const env = new Environment();

  const program = parser.parse(code);
  const result = evaluate(program, env);

  console.log(result);
} catch (err) {
  console.error(`Error: ${err}`);
}
