
import React from 'react';

const CheckCircleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-800 mt-8 py-4 border-t border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 lg:px-8 text-center text-sm text-slate-500 dark:text-slate-400">
        <div className="flex items-center justify-center gap-2 mb-2">
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
            <span className="font-medium text-slate-600 dark:text-slate-300">Progrès sauvegardé automatiquement</span>
        </div>
        <p>
          &copy; {new Date().getFullYear()} Outil de Génération de Notes Infirmières. Développé pour un usage professionnel.
        </p>
        <p className="mt-1">
          Cet outil est un prototype et ne stocke aucune donnée patient. Toutes les données sont enregistrées localement sur votre appareil.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
