import { Pager } from './pager.model';
import { Dataset } from '../dataset.model';
import { IntegratedSystem } from '../system.model';

export interface IntegratedSystemAPIResult {
    pager: Pager;
    systems: Array<IntegratedSystem>;
}
