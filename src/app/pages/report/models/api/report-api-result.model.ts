import { Pager } from './pager.model';
import { DIMReport } from '../report.model';

export interface ReportAPIResult {
    pager: Pager;
    reports: Array<DIMReport>;
}
