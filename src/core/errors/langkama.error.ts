import { Errno } from '../enums/errno.enum';
import { TLocation } from '../types/location.type';
import { TNullable } from '../types/nullable.type';



export class LangKamaError extends Error {

  public errno: Errno;
  private context?: string;
  private location?: TLocation;

  private get col(): number {
    return this.location?.col ?? 0;
  }

  private get row(): number {
    return this.location?.row ?? 0;
  }

  private get loc(): string {
    return [this.row + 1, this.col + 1].join(':');
  }

  private canShowLine(): boolean {
    return typeof this.location?.row != undefined && typeof this.location?.col != undefined;
  }

  private getMessage(): string {
    return `  [${this.name}] - ${this.message}.`;
  }

  private getContext(): Array<TNullable<string>> {
    if (this.canShowLine()) {
      const code = this.context?.split('\n') as Array<string>;
      const line = code[this.row];
      const prefix = `${this.loc} - `;
      const context = `${prefix}${line}`;
      const highlight = [
        ...new Array(prefix.length).fill(' '),
        ...new Array(context.length - prefix.length).fill('~').map((e, i) => i === this.col ? '^' : e)
      ];

      if (!highlight.includes('^')) {
        highlight.push('^');
      }

      return [`  ${context}`, `  ${highlight.join('')}`];
    } else {
      return [null];
    }
  }

  constructor(message: string, location?: TLocation) {
    super(message);

    this.location = location;
    this.name = 'LangKamaError';
    this.errno = Errno.LangKamaError;
  }

  public setContext(context: string): void {
    this.context = context;
  }

  public toString(): string {
    return [
      this.getMessage(),
      ...this.getContext()
    ].join('\n');
  }
}