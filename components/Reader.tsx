
import React, { useState, useRef } from 'react';
import { PAGE_URLS } from '../constants';

interface ReaderProps {
    currentPage: number;
    totalPages: number;
    onNext: () => void;
    onPrev: () => void;
    onToggleUi: () => void;
    isLoading: boolean;
}

export const Reader: React.FC<ReaderProps> = ({ currentPage, onNext, onPrev, onToggleUi, isLoading }) => {
    const touchStartX = useRef<number | null>(null);
    const SWIPE_THRESHOLD = 50; // pixels

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;

        const touchEndX = e.changedTouches[0].clientX;
        const deltaX = touchEndX - touchStartX.current;

        if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
            if (deltaX < 0) {
                onNext(); // Swipe left
            } else {
                onPrev(); // Swipe right
            }
        } else {
            // It's a tap, not a swipe
            const screenWidth = window.innerWidth;
            const tapZone = screenWidth * 0.2; // 20% on each side for navigation
            if (touchEndX < tapZone) {
                onPrev();
            } else if (touchEndX > screenWidth - tapZone) {
                onNext();
            } else {
                onToggleUi();
            }
        }
        
        touchStartX.current = null;
    };

    return (
        <div 
            className="w-full h-full flex items-center justify-center relative touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className={`w-full h-full flex items-center justify-center transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
              <img
                  key={currentPage} // Force re-render on page change
                  src={PAGE_URLS[currentPage - 1]}
                  alt={`Page ${currentPage}`}
                  className="max-w-full max-h-full object-contain"
              />
            </div>
        </div>
    );
};
