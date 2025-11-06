
import React from 'react';

const StethoscopeIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6a3 3 0 013-3h0a3 3 0 013 3v13m-6 0h6m-3-3a3 3 0 100-6 3 3 0 000 6z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19V9a2 2 0 012-2h0a2 2 0 012 2v10" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 19V9a2 2 0 00-2-2h0a2 2 0 00-2 2v10" />
    </svg>
);

const LockClosedIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
);

const SunIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
);
  
const MoonIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
);

const DocumentTextIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);


interface HeaderProps {
    onOpenChangePassword: () => void;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
    onGenerateReport: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenChangePassword, theme, onToggleTheme, onGenerateReport }) => {
  return (
    <header className="bg-white dark:bg-slate-800 shadow-md">
      <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <StethoscopeIcon className="w-10 h-10 text-teal-600" />
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-200">
                    Générateur de Notes d'Évolution Infirmières
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">Outil d'aide à la rédaction pour les professionnels de santé</p>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <button 
                onClick={onGenerateReport}
                title="Générer Rapport de Quart"
                className="p-2 rounded-full hover:bg-slate-100 active:bg-slate-200 dark:hover:bg-slate-700 dark:active:bg-slate-600 transition-colors"
                aria-label="Générer Rapport de Quart"
            >
                <DocumentTextIcon className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </button>
            <button 
                onClick={onToggleTheme}
                title="Changer le thème"
                className="p-2 rounded-full hover:bg-slate-100 active:bg-slate-200 dark:hover:bg-slate-700 dark:active:bg-slate-600 transition-colors"
                aria-label="Changer le thème"
            >
                {theme === 'light' ? 
                    <MoonIcon className="w-6 h-6 text-slate-600 dark:text-slate-400" /> : 
                    <SunIcon className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                }
            </button>
            <button 
                onClick={onOpenChangePassword} 
                title="Changer le code d'accès"
                className="p-2 rounded-full hover:bg-slate-100 active:bg-slate-200 dark:hover:bg-slate-700 dark:active:bg-slate-600 transition-colors"
                aria-label="Changer le code d'accès"
            >
                <LockClosedIcon className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
