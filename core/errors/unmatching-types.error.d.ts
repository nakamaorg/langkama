import { TLocation } from '..';
import { LangKamaError } from './langkama.error';
export declare class UnmatchingTypesError extends LangKamaError {
    constructor(location: TLocation);
}
