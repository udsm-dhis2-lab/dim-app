export interface DIMAuth {
    id: string;
    username: string;
    password: string;
    authSecondarySystem: AuthSecondarySystem;
    createdBy: string;
    createdById: string;
    lastUpdatedBy: string;
    lastUpdatedById: string;
}

export interface AuthSecondarySystem {
    username: string;
    password: string;
}
