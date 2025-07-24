
import { Chapter } from './types';

export const BOOK_TITLE = "Mushoku Tensei: Redundant Reincarnation";
export const TOTAL_PAGES = 151;

const IMAGE_BASE_URL = 'https://storage.googleapis.com/genai-downloads/prompt/v1/3d17a39d844256385e3a8910085a53697e684070b4c7402660161476d491c6d3';

export const PAGE_URLS = Array.from(
    { length: TOTAL_PAGES },
    (_, i) => `${IMAGE_BASE_URL}/image_${i}.jpeg`
);

// Manually created Table of Contents based on OCR and image analysis
export const TABLE_OF_CONTENTS: Chapter[] = [
    { title: "Cover", page: 1 },
    { title: "Dramatis Personae", page: 3 },
    { title: "Title Page", page: 5 },
    { title: "Copyrights", page: 6 },
    { title: "Table of Contents", page: 7 },
    {
        title: "Norn’s Wedding",
        page: 9,
        subChapters: [
            { title: "Chapter 1 (Part 1)", page: 12 },
            { title: "Chapter 2 (Part 2)", page: 28 },
            { title: "Chapter 3 (Part 3)", page: 41 },
        ],
    },
    {
        title: "Lucie and Dada",
        page: 54,
        subChapters: [
            { title: "Chapter 1 (Part 1)", page: 55 },
            { title: "Chapter 2 (Part 2)", page: 68 },
            { title: "Chapter 3: Lucie's Family", page: 82 },
        ],
    },
    {
        title: "The Seven Knights of Asura",
        page: 86,
        subChapters: [
            { title: "Chapter 1: Isolde Looks for a Husband", page: 87 },
            { title: "Chapter 2: Dohga the Gatekeeper", page: 101 },
            { title: "Chapter 3: Isolde and Dohga", page: 115 },
        ],
    },
    {
        title: "The Woman They Called the Mad Dog",
        page: 129,
        subChapters: [
          { title: "Story Start", page: 130 }
        ]
    }
];
