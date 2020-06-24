/**
 *
 */
import { MenuInfo } from '../../../shared/models/service.model';
/**
 *
 */
export const SystemMenu: Array<MenuInfo> = [
    {
        title: 'Configure Systems',
        description:
            ' Create, modify, view and delete Systems. System is the core part to facilitate integration process between source and recepient',
        routeCreate: 'create',
        routeList: 'list',
    }
];
