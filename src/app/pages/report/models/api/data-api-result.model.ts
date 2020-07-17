import { Pager } from './pager.model';
import { Data } from '../data.model';

export interface DataAPIResult {
    pager: Pager;
    datas: Array<Data>;
}
