export interface HTMLTagToken {
    tagName: string;
}

export interface HTMLCommentToken {
    comment: string;
}

export interface Token<T> {
    raw: string;
    pos: {
        start: number;
        end: number;
    };
    extra: T
}