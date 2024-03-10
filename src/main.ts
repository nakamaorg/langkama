import { Lexer } from './frontend/lexer';
import { Parser } from './frontend/parser';
import { evaluate } from './runtime/interpreter';
import { Environment } from './runtime/environment';

import { TUnsafe } from './core/types/unsafe.type';
import { ErrorCallbackFn, LifecycleCallbackFn } from '.';
import { IRuntimeVal } from './core/types/runtime-values.type';

import { Lifecycle } from './core/enums/lifecycle.enum';
import { ErrorManager } from './frontend/error-manager';



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
   */
  static interpret(code: string, onError?: ErrorCallbackFn, onLifecycle?: LifecycleCallbackFn): Promise<IRuntimeVal> {
    return new Promise((resolve, reject) => {
      const errorManager = new ErrorManager(code, onError);

      const env = new Environment();
      const lexer = new Lexer(errorManager);
      const parser = new Parser(errorManager);

      this.callLifecycleCallback(Lifecycle.Lexing, onLifecycle);
      const tokens = lexer.tokenize(code);

      this.callLifecycleCallback(Lifecycle.Parsing, onLifecycle);
      const program = parser.parse(tokens);

      this.callLifecycleCallback(Lifecycle.Interpreting, onLifecycle);
      const result = evaluate(program, env);

      if (errorManager.hasErrors()) {
        reject(errorManager.getErrors());
      } else {
        resolve(result);
      }
    });
  }
}