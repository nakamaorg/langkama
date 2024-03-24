import { LangKamaError } from './langkama.error';
import { TLocation } from '../types/location.type';
export declare class MissingDotError extends LangKamaError {
    constructor(location: TLocation);
}
