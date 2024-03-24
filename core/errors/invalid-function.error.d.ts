import { TLocation } from '..';
import { LangKamaError } from './langkama.error';
export declare class InvalidFunctionError extends LangKamaError {
    constructor(location: TLocation);
}
