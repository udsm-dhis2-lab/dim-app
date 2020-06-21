export interface PeriodSelection {
    items:     Item[];
    dimension: string;
    changed:   boolean;
}

export interface Item {
    id:     string;
    type:   string;
    name:   string;
    daily:  any[];
    weekly: any[];
}
