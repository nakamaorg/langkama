import { TLocation } from '..';
import { LangKamaError } from './langkama.error';
export declare class InvalidKeyError extends LangKamaError {
    constructor(location: TLocation);
}
