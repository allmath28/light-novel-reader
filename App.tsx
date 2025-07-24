
import React, { useState, useEffect } from 'react';
import { Reader } from './components/Reader';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TableOfContents } from './components/TableOfContents';
import { TOTAL_PAGES, PAGE_URLS, BOOK_TITLE, TABLE_OF_CONTENTS } from './constants';
import { LoadingSpinner } from './components/icons';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isTocOpen, setIsTocOpen] = useState<boolean>(false);
    const [isUiVisible, setIsUiVisible] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const lastPage = localStorage.getItem('lastPage');
        if (lastPage) {
            setCurrentPage(Number(lastPage));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('lastPage', String(currentPage));
    }, [currentPage]);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsUiVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [currentPage, isTocOpen]);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= TOTAL_PAGES) {
            setCurrentPage(page);
            setIsTocOpen(false);
        }
    };

    const nextPage = () => {
        goToPage(currentPage + 1);
    };

    const prevPage = () => {
        goToPage(currentPage - 1);
    };

    const toggleToc = () => {
        setIsTocOpen(!isTocOpen);
    };
    
    const toggleUiVisibility = () => {
        setIsUiVisible(!isUiVisible);
    }

    // Preload images
    useEffect(() => {
        const preloadImages = async (page: number) => {
            setIsLoading(true);
            const imagesToPreload: string[] = [];
            // Preload current, next and previous pages
            for (let i = -1; i <= 1; i++) {
                const pageIndex = page - 1 + i;
                if (pageIndex >= 0 && pageIndex < TOTAL_PAGES) {
                    imagesToPreload.push(PAGE_URLS[pageIndex]);
                }
            }

            try {
                await Promise.all(imagesToPreload.map(src => {
                    return new Promise((resolve, reject) => {
                        const img = new Image();
                        img.src = src;
                        img.onload = resolve;
                        img.onerror = resolve; // Resolve even on error to not block UI
                    });
                }));
            } finally {
                setIsLoading(false);
            }
        };

        preloadImages(currentPage);
    }, [currentPage]);

    return (
        <div className="h-screen w-screen bg-black flex flex-col items-center justify-center font-sans overflow-hidden select-none">
            <Header 
                title={BOOK_TITLE} 
                onTocClick={toggleToc}
                isVisible={isUiVisible}
            />

            {isLoading && (
                 <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <LoadingSpinner />
                </div>
            )}
            
            <Reader
                currentPage={currentPage}
                totalPages={TOTAL_PAGES}
                onNext={nextPage}
                onPrev={prevPage}
                onToggleUi={toggleUiVisibility}
                isLoading={isLoading}
            />

            <Footer
                currentPage={currentPage}
                totalPages={TOTAL_PAGES}
                onPageChange={goToPage}
                onNext={nextPage}
                onPrev={prevPage}
                isVisible={isUiVisible}
            />

            <TableOfContents
                isOpen={isTocOpen}
                onClose={toggleToc}
                onChapterClick={(page) => goToPage(page)}
                chapters={TABLE_OF_CONTENTS}
                currentPage={currentPage}
            />
        </div>
    );
};

export default App;
