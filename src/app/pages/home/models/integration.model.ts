/**
 *
 */
export interface SystemIntegration {
    isAllowed: boolean;
    isUsingHIM: boolean;
    importURL: string;
    dataFromURL: string;
    defaultCOC: string;
    isUsingLiveDhis2: boolean;
    systemInfo: SystemInfo;
    batch: Batch;
}

/**
 *
 */
export interface Batch {
    batchName: string;
    job1: Job;
}
/**
 *
 */
export interface Job {
    jobName: string;
    isExecuted: boolean;
    dataSet: DataSet;
    ou: Job1Ou;
    pe: PE;
    dx: Job1Dx;
    mapping: Mapping;
}

/**
 *
 */
export interface DataSet {
    id: string;
    name: string;
}

/**
 *
 */
export interface Job1Dx {
    name: string;
    data: Datum[];
}

/**
 *
 */
export interface Datum {
    name: string;
    type: string;
    id: string;
    dimensions: any[];
}

/**
 *
 */
export interface Mapping {
    ou: MappingOu;
    dx: MappingDx;
}

/**
 *
 */
export interface MappingDx {
    hasMapping: boolean;
    data: Data;
}

/**
 *
 */
export interface Data { }

/**
 *
 */
export interface MappingOu {
    hasMapping: boolean;
    mappingCriteria: MappingCriteria;
    orgUnits: Data;
}

/**
 *
 */
export interface MappingCriteria {
    code: boolean;
    id: boolean;
}

/**
 *
 */
export interface Job1Ou {
    name: string;
    orgUnits: OrgUnits;
}

/**
 *
 */
export interface OrgUnits {
    hasUids: boolean;
    orgUnitUids: any[];
    orgUnitLevel: string;
}

/**
 *
 */
export interface PE {
    name: string;
    periods: string[];
    subPeriods: any[];
}

/**
 *
 */
export interface SystemInfo {
    from: string;
    to: string;
}
