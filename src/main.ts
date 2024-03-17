import { Lexer } from './frontend/lexer';
import { Parser } from './frontend/parser';
import { Environment } from './runtime/environment';

import { Evaluator, IRuntimeVal, LangKamaError } from '.';
import { LangKamaEvent } from './core/enums/langkama-event.enum';

import { TToken } from './core/types/token.type';
import { IProgramNode } from './core/types/ast.type';
import { TOnErrorCallbackFn } from './core/types/on-error-callback.type';

import { ErrorManager } from './core/managers/error.manager';



/***
 * @description
 * The entry point to the compiler
 */
export class LangKama {

  /**
   * @description
   * The error callback function
   */
  private onErrorEventListener: TOnErrorCallbackFn;

  /**
   * @description
   * The lexer callback function
   */
  private onLexerEventListener: (code: string) => void;

  /**
   * @description
   * The success callback function
   */
  private onSuccessEventListener: (value: IRuntimeVal) => void;

  /**
   * @description
   * The parser callback function
   */
  private onParserEventListener: (tokens: Array<TToken>) => void;

  /**
   * @description
   * The interpreter callback function
   */
  private onInterpreterEventListener: (program: IProgramNode) => void;

  /**
   * @description
   * Instantiates a compiler instance for LangKama
   */
  constructor() {
    this.onErrorEventListener = () => { };
    this.onLexerEventListener = () => { };
    this.onParserEventListener = () => { };
    this.onSuccessEventListener = () => { };
    this.onInterpreterEventListener = () => { };
  }

  /**
   * @description
   * Interprets LangKama source code
   *
   * @param code The Langkama source code to interpret
   * @param environment The envrionment to read from
   */
  public interpret(code: string, environment?: Environment): LangKama {
    const errorManager = new ErrorManager(this.onErrorEventListener, code);

    try {
      const evaluator = new Evaluator();
      const lexer = new Lexer(errorManager.raise.bind(errorManager));
      const parser = new Parser(errorManager.raise.bind(errorManager));
      const env = environment ?? new Environment(null, errorManager.raise.bind(errorManager));

      this.onLexerEventListener(code);
      const tokens = lexer.tokenize(code);

      this.onParserEventListener(tokens);
      const program = parser.parse(tokens);

      this.onInterpreterEventListener(program);
      const result = evaluator.evaluate(program, env);

      if (!errorManager.hasErrors()) {
        this.onSuccessEventListener(result);
      }
    } catch (error) {
      errorManager.raise(error as LangKamaError);
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
        this.onErrorEventListener = eventListener;
        break;
      }

      case LangKamaEvent.Success: {
        this.onSuccessEventListener = eventListener;
        break;
      }

      case LangKamaEvent.Lexer: {
        this.onLexerEventListener = eventListener;
        break;
      }

      case LangKamaEvent.Parser: {
        this.onParserEventListener = eventListener;
        break;
      }

      case LangKamaEvent.Interpreter: {
        this.onInterpreterEventListener = eventListener;
        break;
      }
    }

    return this;
  }
}