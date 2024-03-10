import { LangKamaError } from '..';
import { ErrorCallbackFn } from '../core/types/error-callback.type';
import { TUnsafe } from '../core/types/unsafe.type';



/**
 * @description
 * Helps with error management
 */
export class ErrorManager {

  /**
   * @description
   * The source code to raise the errors for
   */
  private code: string;

  /**
   * @description
   * The list of errors
   */
  private errors!: Array<LangKamaError>;

  /**
   * @description
   * The callback to call on every error detection
   */
  private onError: TUnsafe<ErrorCallbackFn>;

  /**
   * @description
   * Instantiates a new error manager instance
   *
   * @param code The source code to raise the errors for
   * @param onError The error detection callback
   */
  constructor(code: string, onError?: ErrorCallbackFn) {
    this.init();
    this.code = code;
    this.onError = onError;
  }

  /**
   * @description
   * Adds a new error to the collection of errors
   *
   * @param error The error to raise
   */
  public raise(error: LangKamaError): void {
    error.setCode(this.code);
    this.errors.push(error);

    if (this.onError) {
      this.onError(error);
    }
  }

  /**
   * @description
   * Initializes the error manager
   */
  public init(): void {
    this.errors = [];
  }

  /**
   * @descriptionc
   * Checks if errors are present
   */
  public hasErrors(): boolean {
    return this.errors.length > 0;
  }

  /**
   * @description
   * Get the list of errors
   */
  public getErrors(): Array<LangKamaError> {
    return this.errors;
  }
}