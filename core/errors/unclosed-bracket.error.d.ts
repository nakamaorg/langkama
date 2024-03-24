import { LangKamaError } from './langkama.error';
import { TLocation } from '../types/location.type';
export declare class UnclosedBracketError extends LangKamaError {
    constructor(location: TLocation);
}
