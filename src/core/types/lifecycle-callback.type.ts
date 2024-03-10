import { Lifecycle } from '../enums/lifecycle.enum';



export type LifecycleCallbackFn = (lifecycle: Lifecycle, data?: any) => void;