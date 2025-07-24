
import React from 'react';
import type { Chapter } from '../types';
import { CloseIcon, ChevronRightIcon } from './icons';

interface TableOfContentsProps {
    isOpen: boolean;
    onClose: () => void;
    onChapterClick: (page: number) => void;
    chapters: Chapter[];
    currentPage: number;
}

const ChapterItem: React.FC<{ chapter: Chapter; onChapterClick: (page: number) => void; isCurrent: (page: number, subChapters?: Chapter[]) => boolean }> = ({ chapter, onChapterClick, isCurrent }) => {
    const active = isCurrent(chapter.page, chapter.subChapters);

    return (
        <div>
            <div 
                onClick={() => onChapterClick(chapter.page)} 
                className={`flex justify-between items-center p-4 cursor-pointer rounded-lg transition-colors ${active ? 'bg-amber-600 text-white' : 'hover:bg-gray-700'}`}
            >
                <h3 className="font-semibold text-lg">{chapter.title}</h3>
                <span className="text-sm text-gray-400">{chapter.page}</span>
            </div>
            {chapter.subChapters && (
                <div className="pl-6 mt-2 space-y-2">
                    {chapter.subChapters.map((subChapter, index) => (
                        <div 
                            key={index} 
                            onClick={() => onChapterClick(subChapter.page)} 
                            className={`flex justify-between items-center p-3 cursor-pointer rounded-lg transition-colors ${isCurrent(subChapter.page) ? 'bg-amber-500 text-white' : 'hover:bg-gray-600'}`}
                        >
                            <span className="text-gray-200">{subChapter.title}</span>
                            <span className="text-sm text-gray-400">{subChapter.page}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ isOpen, onClose, onChapterClick, chapters, currentPage }) => {

    const isCurrentChapter = (page: number, subChapters: Chapter[] = []): boolean => {
        if (subChapters.length > 0) {
            const lastSubChapter = subChapters[subChapters.length - 1];
            const nextChapter = chapters.find(c => c.page > lastSubChapter.page);
            const endPage = nextChapter ? nextChapter.page -1 : Infinity;
            return currentPage >= page && currentPage <= endPage;
        }
        const nextChapter = chapters.find(c => c.page > page);
        const endPage = nextChapter ? nextChapter.page - 1 : Infinity;
        return currentPage >= page && currentPage <= endPage;
    };
    
    return (
        <>
            {/* Overlay */}
            <div 
                className={`fixed inset-0 bg-black z-20 transition-opacity duration-300 ${isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>
            {/* Drawer */}
            <div className={`fixed top-0 left-0 h-full w-full max-w-sm bg-gray-800 text-white shadow-lg z-30 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h2 className="text-2xl font-bold">Contents</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                        <CloseIcon />
                    </button>
                </div>
                <div className="p-4 overflow-y-auto h-[calc(100%-65px)] space-y-4">
                    {chapters.map((chapter, index) => (
                       <ChapterItem key={index} chapter={chapter} onChapterClick={onChapterClick} isCurrent={isCurrentChapter} />
                    ))}
                </div>
            </div>
        </>
    );
};
