import { Parser } from './frontend/parser';
import { evaluate } from './runtime/interpreter';



const code = `
  0 - (10 + 2) * 2
`;

try {
  const parser = new Parser();
  const program = parser.parse(code);
  const result = evaluate(program);

  console.log(result);
} catch (err) {
  console.error(`Error: ${err}`);
}
