import { LangKamaError } from './langkama.error';
import { TLocation } from '../types/location.type';
export declare class IncompleteExpressionError extends LangKamaError {
    constructor(localtion: TLocation);
}
