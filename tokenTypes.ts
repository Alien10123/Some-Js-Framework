export interface Token<T> {
    raw: string;
    pos: {
        start: number;
        end: number;
    };
    extra?: T;
    type: string;
}

export interface AttrStringToken {
    name: string;
    value: string;
}