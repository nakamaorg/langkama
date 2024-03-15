import { LangKamaError } from '..';



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

  constructor() {
    this.init();
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
  }

  /**
   * @description
   * Initializes the manager
   */
  public init(): void {
    this.errors = [];
  }
}