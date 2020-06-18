import { Menu } from 'src/app/shared/models/side-menu.model';

export const AllMenuConfigs: Array<any> = [
    {
        name: 'System Management',
        subMenus: [
            {
                name: 'Configure Systems',
                route: 'system',
                childRoutes: {
                    create: 'create',
                    list: 'list',
                },
            },
            {
                name: 'Configure Authentication',
                route: 'auth',
                childRoutes: {
                    create: 'create',
                    list: 'list',
                },
            },
        ],
    },
    {
        name: 'Integration Management',
        subMenus: [
            {
                name: 'Configure Integration',
                route: 'integration',
                childRoutes: {
                    create: 'create',
                    list: 'list',
                },
            },
        ],
    },
    {
        name: 'Job Management',
        subMenus: [
            {
                name: 'Configure Job',
                route: 'job',
                childRoutes: {
                    create: 'create',
                    list: 'list',
                },
            },
        ],
    },
    {
        name: 'Batch Management',
        subMenus: [
            {
                name: 'Configure Batch',
                route: 'batch',
                childRoutes: {
                    create: 'create',
                    list: 'list',
                },
            },
        ],
    },
    {
        name: 'Report Management',
        subMenus: [
            {
                name: 'Configure Reports',
                route: 'report',
                childRoutes: {
                    create: 'create',
                    list: 'list',
                },
            },
        ],
    },
];
