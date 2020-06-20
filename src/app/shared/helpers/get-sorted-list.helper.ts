/**
 *
 */
import * as _ from 'lodash';
/**
 *
 * @param_arr
 * @param_criteria
 */
export function getSortedList(arr: any, criteria: string): Array<any> {
    return _.sortBy(arr, (item: any) => item[criteria]);
}
