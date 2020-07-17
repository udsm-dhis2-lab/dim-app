import { Pager } from './pager.model';
import { Dataset } from '../dataset.model';

export interface DatasetAPIResult {
    pager: Pager;
    dataSets: Array<Dataset>;
}
