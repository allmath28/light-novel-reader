
export interface Chapter {
    title: string;
    page: number;
    subChapters?: Chapter[];
}
