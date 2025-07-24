
import React from 'react';
import { MenuIcon } from './icons';

interface HeaderProps {
    title: string;
    onTocClick: () => void;
    isVisible: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, onTocClick, isVisible }) => {
    return (
        <header 
            className={`absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/70 to-transparent transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
        >
            <div className="flex justify-between items-center text-white">
                <button onClick={onTocClick} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                    <MenuIcon />
                </button>
                <h1 className="text-lg font-semibold truncate px-4">{title}</h1>
                <div className="w-10"></div> {/* Spacer */}
            </div>
        </header>
    );
};
