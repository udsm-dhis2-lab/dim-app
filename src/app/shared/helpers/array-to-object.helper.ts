import { uuid } from '@icodebible/utils/uuid';
/**
 *
 * @param_arr
 * @param_key
 */
export function arrayToObject(arr, key, prepender, separator) {
    const initialValue = {};
    return arr && key
        ? arr.reduce((obj, item) => {
            return {
                ...obj,
                [`${prepender ? prepender : ''}${separator ? separator : ''}${
                    item[key] ? item[key] : uuid('', 11)
                    }`]: item,
            };
        }, initialValue)
        : {};
}
