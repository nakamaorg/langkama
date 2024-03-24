import { LangKamaError } from './langkama.error';
import { TLocation } from '../types/location.type';
export declare class MissingIdentifierError extends LangKamaError {
    constructor(location: TLocation);
}
