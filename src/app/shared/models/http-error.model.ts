export interface HTTPErrorMessage {
    headers: Headers;
    status: number;
    statusText: string;
    url: string;
    ok: boolean;
    name: string;
    message: string;
    error: Error;
}

export interface Error {
    statusCode: number;
    message?: string;
    error?: string;
    method: string;
    path: string;
}

export interface Headers {
    normalizedNames: NormalizedNames;
    lazyUpdate: null;
}

// tslint:disable-next-line: no-empty-interface
export interface NormalizedNames { }
