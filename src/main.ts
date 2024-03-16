import { Lexer } from './frontend/lexer';
import { Parser } from './frontend/parser';
import { evaluate } from './runtime/interpreter';
import { Environment } from './runtime/environment';

import { IRuntimeVal, LangKamaError } from '.';
import { LangKamaEvent } from './core/enums/langkama-event.enum';

import { TToken } from './core/types/token.type';
import { IProgramNode } from './core/types/ast.type';

import { ErrorManager } from './core/managers/error.manager';



/***
 * @description
 * The entry point to the compiler
 */
export class LangKama {

  private onLexerEvent: (code: string) => void;
  private onSuccessEvent: (value: IRuntimeVal) => void;
  private onParserEvent: (tokens: Array<TToken>) => void;
  private onInterpreterEvent: (program: IProgramNode) => void;

  /**
   * @description
   * The error manager
   */
  private errorManager: ErrorManager;

  constructor() {
    this.onLexerEvent = () => { };
    this.onParserEvent = () => { };
    this.onSuccessEvent = () => { };
    this.onInterpreterEvent = () => { };

    this.errorManager = new ErrorManager();
  }

  /**
   * @description
   * Interprets LangKama source code
   *
   * @param code The Langkama source code to interpret
   * @param environment The envrionment to read from
   */
  public interpret(code: string, environment?: Environment): LangKama {
    try {
      const lexer = new Lexer(this.errorManager.raise.bind(this.errorManager));
      const parser = new Parser(this.errorManager.raise.bind(this.errorManager));
      const env = environment ?? new Environment();

      this.onLexerEvent(code);
      const tokens = lexer.tokenize(code);

      this.onParserEvent(tokens);
      const program = parser.parse(tokens);

      this.onInterpreterEvent(program);
      const result = evaluate(program, env);

      this.onSuccessEvent(result);
    } catch (error) {
      this.errorManager.raise(error as LangKamaError);
    } finally {
      return this;
    }
  }

  /**
   * @description
   * Listens to updates regarding a specific event
   *
   * @param event The event to subscribe to
   * @param eventListener The event listener callback function
   */
  public on(event: LangKamaEvent, eventListener: () => void): LangKama {
    switch (event) {
      case LangKamaEvent.Error: {
        this.errorManager.setCallback(eventListener);
        break;
      }

      case LangKamaEvent.Success: {
        this.onSuccessEvent = eventListener;
        break;
      }

      case LangKamaEvent.Lexer: {
        this.onLexerEvent = eventListener;
        break;
      }

      case LangKamaEvent.Parser: {
        this.onParserEvent = eventListener;
        break;
      }

      case LangKamaEvent.Interpreter: {
        this.onInterpreterEvent = eventListener;
        break;
      }
    }

    return this;
  }
}