import { tokenize } from './frontend/lexer';

const srcCode = 'let x = 45 * (4 / 3).';

for (const token of tokenize(srcCode)) {
  console.log(token);
}