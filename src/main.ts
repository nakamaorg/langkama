import { Lexer } from './frontend/lexer';
import { Parser } from './frontend/parser';
import { evaluate } from './runtime/interpreter';
import { Environment } from './runtime/environment';

import { TUnsafe } from './core/types/unsafe.type';
import { IRuntimeVal } from './core/types/runtime-values.type';
import { LifecycleCallbackFn } from './core/types/lifecycle-callback.type';

import { Lifecycle } from './core/enums/lifecycle.enum';



/***
 * @description
 * The entry point to the compiler
 */
export class LangKama {

  /**
   * @description
   * Calls the life cycle callback if available
   *
   * @param lifecycle The life cycle to emit
   * @param onLifecycle The life cycle callback function to call
   */
  private static callLifecycleCallback(lifecycle: Lifecycle, onLifecycle: TUnsafe<LifecycleCallbackFn>): void {
    if (onLifecycle) {
      onLifecycle(lifecycle);
    }
  }

  /**
   * @description
   * Interprets LangKama source code
   *
   * @param code The Langkama source code to interpret
   * @param environment The envrionment to read from
   * @param onLifecycle The lifecycle callback
   */
  static interpret(code: string, environment?: Environment, onLifecycle?: LifecycleCallbackFn): Promise<IRuntimeVal> {
    return new Promise((resolve, reject) => {
      try {
        const lexer = new Lexer();
        const parser = new Parser();
        const env = environment ?? new Environment();

        this.callLifecycleCallback(Lifecycle.Lexing, onLifecycle);
        const tokens = lexer.tokenize(code);

        this.callLifecycleCallback(Lifecycle.Parsing, onLifecycle);
        const program = parser.parse(tokens);

        this.callLifecycleCallback(Lifecycle.Interpreting, onLifecycle);
        const result = evaluate(program, env);

        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }
}