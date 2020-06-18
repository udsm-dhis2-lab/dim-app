/**
 *
 */
export interface AllServiceConfig {
    name: string;
    subMenus: SubMenu[];
}

export interface SubMenu {
    name: string;
    route: string;
    childRoutes: ChildRoutes;
}

export interface ChildRoutes {
    create: string;
    list: string;
}
