import { TLocation } from '..';
import { LangKamaError } from './langkama.error';
export declare class InvalidAssignmentError extends LangKamaError {
    constructor(location: TLocation);
}
