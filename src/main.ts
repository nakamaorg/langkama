import { Lexer } from './frontend/lexer';
import { Parser } from './frontend/parser';
import { evaluate } from './runtime/interpreter';
import { Environment } from './runtime/environment';

import { IRuntimeVal } from './core/types/runtime-values.type';



/***
 * @description
 * The entry point to the compiler
 */
export class LangKama {

  /**
   * @description
   * Interprets LangKama source code
   *
   * @param code The Langkama source code to interpret
   */
  static interpret(code: string): IRuntimeVal {
    const lexer = new Lexer();
    const parser = new Parser();
    const env = new Environment();

    const tokens = lexer.tokenize(code);
    const program = parser.parse(tokens);
    const result = evaluate(program, env);

    return result;
  }
}