import { Errno } from '../enums/errno.enum';
import { TLocation } from '../types/location.type';
export declare class LangKamaError extends Error {
    errno: Errno;
    private context?;
    private location?;
    private get col();
    private get row();
    private get loc();
    private canShowLine;
    private getMessage;
    private getContext;
    constructor(message: string, location?: TLocation);
    setContext(context: string): void;
    toString(): string;
}
