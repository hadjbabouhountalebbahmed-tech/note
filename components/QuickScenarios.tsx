
import React, { useState } from 'react';
import { scenariosByCategory } from '../constants';
import type { FormState } from '../types';

const BookOpenIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
);

const ClipboardIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
    </svg>
);

const HeartbeatIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 12.75l2.25 2.25 2.25-4.5 2.25 4.5 2.25-2.25" />
    </svg>
);

const BandageIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
    </svg>
);

const StethoscopeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75L21 21" />
    </svg>
);

const HandHoldingHeartIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);


const categoryIcons: { [key: string]: React.FC<{ className?: string }> } = {
    "Général & Admission": ClipboardIcon,
    'Urgences & Événements Aigus': HeartbeatIcon,
    'Post-Opératoire & Soins de Plaie': BandageIcon,
    'Pathologies & Suivis': StethoscopeIcon,
    "Soins Palliatifs / Confort": HandHoldingHeartIcon,
};


interface QuickScenariosProps {
  onScenarioSelect: (scenarioState: Partial<FormState>) => void;
}

const QuickScenarios: React.FC<QuickScenariosProps> = ({ onScenarioSelect }) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-slate-200 dark:border-slate-700">
      <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-3">
        <BookOpenIcon className="w-7 h-7 text-teal-500" />
        Bibliothèque de Scénarios
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Cliquez sur une catégorie pour la déplier, puis choisissez un scénario pour pré-remplir le formulaire. Survolez un bouton pour voir sa description.
      </p>
      <div className="space-y-2">
        {scenariosByCategory.map(category => {
            const Icon = categoryIcons[category.category];
            const isCategoryOpen = openCategory === category.category;
            return (
                <div key={category.category} className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden transition-all duration-300">
                    <button
                        onClick={() => setOpenCategory(isCategoryOpen ? null : category.category)}
                        className="w-full flex items-center justify-between p-3 text-left bg-slate-50/50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-700/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                        aria-expanded={isCategoryOpen}
                    >
                        <div className="flex items-center gap-3">
                            {Icon && <Icon className="w-6 h-6 text-teal-600 dark:text-teal-500" />}
                            <h3 className="text-md font-semibold text-slate-700 dark:text-slate-300">{category.category}</h3>
                        </div>
                        <ChevronDownIcon className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div 
                        className="grid transition-all duration-300 ease-in-out"
                        style={{ gridTemplateRows: isCategoryOpen ? '1fr' : '0fr' }}
                    >
                      <div className="overflow-hidden">
                        <div className="p-4">
                            <div className="flex flex-wrap gap-2">
                            {category.scenarios.map(scenario => (
                                <button
                                key={scenario.label}
                                onClick={() => onScenarioSelect(scenario.state)}
                                title={scenario.description}
                                className="px-3 py-1.5 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-md shadow-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 focus:ring-teal-500 transition-colors"
                                >
                                {scenario.label}
                                </button>
                            ))}
                            </div>
                        </div>
                      </div>
                    </div>
                </div>
            )
        })}
      </div>
    </div>
  );
};

export default QuickScenarios;