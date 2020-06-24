export interface DIMJob {
    jobName: string;
    description: string;
    isExecuted: boolean;
    dataSet: DataSet;
    pe: PE;
    dx: DIMJobDx;
    ou: DIMJobOu;
    mapping: Mapping;
    createdAt: string;
    lastUpdatedAt: string;
    id: string;
    createdBy: string;
    createdById: string;
    lastUpdatedBy: string;
    lastUpdatedById: string;
}

export interface PE {
    periods: Period[];
}

export interface Period {
    id: string;
    name: string;
    type: string;
}

export interface DataSet {
    id: string;
    name: string;
}

export interface DIMJobDx {
    data: Data[];
}

export interface Data {
    id: string;
    name: string;
    type: string;
    dimensions?: any[];
}

export interface DIMJobOu {
    orgUnits: OrgUnits;
}

export interface OrgUnits {
    hasUids: boolean;
    orgUnitLevel: string;
    orgUnitUids: Array<string>;
}

export interface Mapping {
    ou: MappingOu;
    dx: MappingDx;
}

export interface MappingDx {
    hasMapping: boolean;
    data: MappingData;
}

export interface MappingData {
    name: string;
    from: string;
    to: To;
}

export interface MappingOu {
    hasMapping: boolean;
    mappingCriteria: MappingCriteria;
    orgUnits: MappingOrgUnit;
}

export interface MappingOrgUnit {
    name: string;
    from: string;
    to: To;
}

export interface To {
    id: string;
}

export interface MappingCriteria {
    code: null;
}
