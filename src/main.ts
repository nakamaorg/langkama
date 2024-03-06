import { Parser } from './frontend/parser';



const code = `
  10 + null
`;

try {
  const parser = new Parser();
  const program = parser.parse(code);

  console.log(JSON.stringify(program, null, 2));
} catch (err) {
  console.error(`Error: ${err}`);
}
