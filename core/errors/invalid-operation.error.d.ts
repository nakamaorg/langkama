import { TLocation } from '..';
import { LangKamaError } from './langkama.error';
export declare class InvalidOperationError extends LangKamaError {
    constructor(location: TLocation);
}
