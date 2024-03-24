import { LangKamaError } from './langkama.error';
import { TLocation } from '../types/location.type';
export declare class UnrecognizedStatementError extends LangKamaError {
    constructor(location: TLocation);
}
