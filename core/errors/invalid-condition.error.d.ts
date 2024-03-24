import { TLocation } from '..';
import { LangKamaError } from './langkama.error';
export declare class InvalidConditionError extends LangKamaError {
    constructor(location: TLocation);
}
