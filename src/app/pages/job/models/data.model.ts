export interface DataSelection {
    items: DataItem[];
    groups: any[];
    dimension: string;
    changed: boolean;
}

export interface DataItem {
    id: string;
    name: string;
    dataElements?: DataElement[];
    valueType?: string;
    categoryCombo: { id: string };
    type: string;
}

export interface DataElement {
    id: string;
    metadataType: string;
}
