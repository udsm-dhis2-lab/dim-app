export interface ReportMetadata {
    startDate:         string;
    endDate:           string;
    dataSet:           string;
    status:            string;
    sourceSystem:      System;
    destinationSystem: System;
    datas:             Data[];
    periods:           Period[];
}

export interface Data {
    id:          string;
    created:     string;
    lastUpdated: string;
    name:        string;
    type:        string;
}

export interface System {
    id:   string;
    name: string;
}

export interface Period {
    id:   string;
    name: string;
    type: string;
}
