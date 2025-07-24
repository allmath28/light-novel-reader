
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

interface FooterProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onNext: () => void;
    onPrev: () => void;
    isVisible: boolean;
}

export const Footer: React.FC<FooterProps> = ({ currentPage, totalPages, onPageChange, onNext, onPrev, isVisible }) => {
    return (
        <footer className={`absolute bottom-0 left-0 right-0 z-10 p-4 text-white bg-gradient-to-t from-black/70 to-transparent transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-4">
                    <span className="text-sm w-12 text-center">{currentPage}</span>
                    <input
                        type="range"
                        min="1"
                        max={totalPages}
                        value={currentPage}
                        onChange={(e) => onPageChange(Number(e.target.value))}
                        className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                    <span className="text-sm w-12 text-center">{totalPages}</span>
                </div>
                <div className="flex justify-center items-center space-x-8">
                     <button onClick={onPrev} disabled={currentPage === 1} className="p-2 rounded-full hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        <ChevronLeftIcon />
                    </button>
                    <span className="text-sm">Page {currentPage} of {totalPages}</span>
                     <button onClick={onNext} disabled={currentPage === totalPages} className="p-2 rounded-full hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        <ChevronRightIcon />
                    </button>
                </div>
            </div>
        </footer>
    );
};
