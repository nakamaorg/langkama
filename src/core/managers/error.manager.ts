import { LangKamaError } from '..';
import { TOnErrorCallbackFn } from '../types/on-error-callback.type';



/**
 * @description
 * Helps with managing errors
 */
export class ErrorManager {

  /**
   * @description
   * The code source related to the error manager
   */
  private context!: string;

  /**
   * @description
   * The list of errors
   */
  private errors!: Array<LangKamaError>;

  /**
   * @description
   * The error callback
   */
  private onError: TOnErrorCallbackFn;

  /**
   * @description
   * Instantiates the error manager
   *
   * @param onError The error callback function to call in case an error was raised
   * @param context The code source to manage the errors for
   */
  constructor(onError: TOnErrorCallbackFn, context?: string) {
    this.init(context);
    this.onError = onError;
  }

  /**
   * @description
   * Sets the error callback function to call
   *
   * @param onError The error callback function
   */
  public setCallback(onError: TOnErrorCallbackFn): void {
    this.onError = onError;
  }

  /**
   * @description
   * Returns a list of raised errors
   */
  public getErrors(): Array<LangKamaError> {
    return this.errors;
  }

  /**
   * @description
   * Checks if any errors were raised
   */
  public hasErrors(): boolean {
    return this.errors.length > 0;
  }

  /**
   * @description
   * Raises an error
   *
   * @param error The error to raise
   */
  public raise(error: LangKamaError): void {
    error.setContext(this.context);

    this.errors.push(error);
    this.onError(error);
  }

  /**
   * @description
   * Initializes the manager
   *
   * @param context The code source to manage the errors for
   */
  public init(context?: string): void {
    this.errors = [];

    if (context) {
      this.context = context;
    }
  }
}