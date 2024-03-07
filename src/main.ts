// import { Parser } from './frontend/parser';
// import { evaluate } from './runtime/interpreter';
// import { Environment } from './runtime/environment';

import { tokenize } from "./frontend/lexer";



// const code = `
//   const birthyear = 1998.
//   let curryear = 2024.
//   let age = curryear - birthyear.

//   age
// `;

// try {
//   const parser = new Parser();
//   const env = new Environment();

//   const program = parser.parse(code);
//   const result = evaluate(program, env);

//   console.log(result);
// } catch (err) {
//   console.error(`Error: ${err}`);
// }


const code = `
a sa7 hear me out x is 14.
hear me out y is 12.
hear me out a is L.
hear me out b is W.
hear me out c is bruh.
`;

try {
  const tokens = tokenize(code);
  console.log(tokens);
} catch (err) {
  console.error(`Error: ${err}`);
}
