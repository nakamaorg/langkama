import { LangKamaError } from './langkama.error';
import { TLocation } from '../types/location.type';
export declare class MissingColonError extends LangKamaError {
    constructor(location: TLocation);
}
