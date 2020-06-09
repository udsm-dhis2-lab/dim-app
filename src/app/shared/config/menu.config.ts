/**
 *
 */
import { NavigationMenu } from '../models/menu.model';

/**
 *
 */
export const NavigationMenuConfig: Array<NavigationMenu> = [
    {
        name: 'System Management',
        route: 'system'
    },
    {
        name: 'Job Management',
        route: 'job'
    },
    {
        name: 'Batch Management',
        route: 'batch'
    },
    {
        name: 'Integration Management',
        route: 'integration'
    },
    {
        name: 'Report Management',
        route: 'report'
    },
    {
        name: 'Authentication Management',
        route: 'auth'
    }
];
