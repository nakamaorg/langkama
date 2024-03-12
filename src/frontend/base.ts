/**
 * @description
 * Helps with token/character traversal
 */
export class Base<T> {
  
  /**
   * @description
   * Content to traverse 
  */
  private content!: T;

  /**
   * @description
   * The index where the traversal is currently on 
   */
  private index!: number;

 /**
   * @description
   * Instntiates a base frontend instance
   *
   * @param content The content to reset to
   */
	constructor(content: T) {
    this.init(content);
  }

  /**
   * @description
   * Instntiates a base frontend instance
   *
   * @param content The content to reset to
   */
  public init(content: T): void {
    this.index = 0;
    this.content = content;
  }
}