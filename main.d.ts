import { Environment } from './runtime/environment';
import { LangKamaEvent } from './core/enums/langkama-event.enum';
/***
 * @description
 * The entry point to the compiler
 */
export declare class LangKama {
    /**
     * @description
     * The stdout callback function
     */
    private onOutEventHandler;
    /**
     * @description
     * The error callback function
     */
    private onErrorEventListener;
    /**
     * @description
     * The lexer callback function
     */
    private onLexerEventListener;
    /**
     * @description
     * The success callback function
     */
    private onSuccessEventListener;
    /**
     * @description
     * The parser callback function
     */
    private onParserEventListener;
    /**
     * @description
     * The interpreter callback function
     */
    private onInterpreterEventListener;
    /**
     * @description
     * Instantiates a compiler instance for LangKama
     */
    constructor();
    /**
     * @description
     * Interprets LangKama source code
     *
     * @param code The Langkama source code to interpret
     * @param environment The envrionment to read from
     */
    interpret(code: string, environment?: Environment): LangKama;
    /**
     * @description
     * Listens to updates regarding a specific event
     *
     * @param event The event to subscribe to
     * @param eventListener The event listener callback function
     */
    on(event: LangKamaEvent, eventListener: <T = any>(args?: T) => void): LangKama;
}
