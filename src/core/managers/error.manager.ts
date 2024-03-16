import { LangKamaError } from '..';
import { TOnErrorCallbackFn } from '../types/on-error-callback.type';



/**
 * @description
 * Helps with managing errors
 */
export class ErrorManager {

  /**
   * @description
   * The list of errors
   */
  private errors!: Array<LangKamaError>;

  /**
   * @description
   * The error callback
   */
  private onError!: TOnErrorCallbackFn;

  constructor(onError?: TOnErrorCallbackFn) {
    this.init();

    if (onError) {
      this.onError = onError;
    }
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
    this.errors.push(error);

    if (this.onError) {
      this.onError(error);
    }
  }

  /**
   * @description
   * Initializes the manager
   */
  public init(): void {
    this.errors = [];
  }
}