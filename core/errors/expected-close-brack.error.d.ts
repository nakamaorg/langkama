import { LangKamaError } from './langkama.error';
import { TLocation } from '../types/location.type';
export declare class ExpectedCloseBrackError extends LangKamaError {
    constructor(location: TLocation);
}
