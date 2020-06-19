import { AllServiceConfig } from '../models/all.model';

export const AllMenuConfigs: Array<AllServiceConfig> = [
    {
        name: 'System Management',
        subMenus: [
            {
                name: 'Configure Systems',
                route: 'system',
                description: 'Create, modify, view and delete Systems. System is the core part to facilitate integration process between source and recepient system',
                childRoutes: {
                    create: 'create',
                    list: 'list',
                },
            },
            {
                name: 'Configure Authentication',
                route: 'auth',
                description: 'Create, modify, view and delete System Auth. System Auth is the core part to facilitate integration process between source and recepient system',
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
                description: 'Create, modify, view and delete Integration. Integration is the linkage between two systems for the purpose of data exchange',
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
                description: 'Create, modify, view and delete Jobs. Job is the core part to facilitate integration process between source and recepient systems',
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
                description: 'Create, modify, view and delete Integration. Integration is the linkage between two systems for the purpose of data exchange',
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
                description: 'Create, modify, view and delete Integration. Integration is the linkage between two systems for the purpose of data exchange',
                childRoutes: {
                    create: 'create',
                    list: 'list',
                },
            },
        ],
    },
];
