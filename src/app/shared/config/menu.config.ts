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
        name: 'Authentication Management',
        route: 'auth'
    },
    {
        name: 'Integration Management',
        route: 'integration'
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
        name: 'Report Management',
        route: 'report'
    }
];
