import { DataEntryField } from '../models/form.model';
/**
 *
 */
import * as _ from 'lodash';
/**
 *
 * @params formUpdates
 */
export function onUpdateFormProps(
    formValues: any,
    formUpdates: DataEntryField
) {
    return formUpdates ? _.merge(_.clone(formValues), formUpdates) : formUpdates;
}
