export interface DIMReport {
    id:                                 string;
    created:                            string;
    lastUpdated:                        string;
    sourceSystemName:                   string;
    sourceSystemId:                     string;
    sourceExchangePeriod:               string;
    sourceExchangeDate:                 string;
    sourceValue:                        string;
    sourceDataElementName:              string;
    sourceDataElementId:                string;
    sourceOrgUnitName:                  string;
    sourceOrgUnitId:                    string;
    destinationSystemName:              string;
    destinationSystemId:                string;
    destinationDataSetName:             string;
    destinationDataSetId:               string;
    destinationExchangePeriod:          string;
    destinationExchangeDate:            string;
    destinationValue:                   string;
    destinationDataElementName?:         string;
    destinationDataElementId?:           string;
    destinationCategoryOptionComboName: string;
    destinationCategoryOptionComboId:   string;
    destinationOrgUnitName:             string;
    destinationOrgUnitId:               string;
    status:                             string;
    messages?:                          Message[];
}

export interface Message {
    id:          string;
    created:     string;
    lastUpdated: string;
    objectId:    string;
    message:     string;
}
