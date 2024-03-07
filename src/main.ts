import { Lexer } from './frontend/lexer';
import { Parser } from './frontend/parser';
import { evaluate } from './runtime/interpreter';
import { Environment } from './runtime/environment';



const code = `
  a sa7 hear me out birthyear is 1998. |
  hear me out curryear is 2024.
  hear me out age is curryear - birthyear.

  age
`;

try {
  const lexer = new Lexer();
  const parser = new Parser();
  const env = new Environment();

  console.log('Compiling LangKama script...');

  const tokens = lexer.tokenize(code);
  const program = parser.parse(tokens);
  const result = evaluate(program, env);

  console.log('LangKama script compiled!\n');
  console.log({ result });
} catch (err) {
  console.error(`LangKama Error:\n  ${err}`);
}