
import React, { useState } from 'react';
import RadioGroup from './RadioGroup';
import type { Option } from '../types';

interface ShiftReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onGenerate: (shift: string) => void;
    isGenerating: boolean;
    reportContent: string;
    error: string | null;
}

const CopyIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const SparkleIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 21.75l-.648-1.188a2.25 2.25 0 01-1.47-1.47L12.964 18l1.188-.648a2.25 2.25 0 011.47-1.47L16.25 15l.648 1.188a2.25 2.25 0 011.47 1.47L19.536 18l-1.188.648a2.25 2.25 0 01-1.47 1.47z" />
  </svg>
);


const ShiftReportModal: React.FC<ShiftReportModalProps> = ({ isOpen, onClose, onGenerate, isGenerating, reportContent, error }) => {
    const [selectedShift, setSelectedShift] = useState('Jour');
    const [isCopied, setIsCopied] = useState(false);
    const quartOptions: Option[] = [ { value: 'Jour', label: 'Jour' }, { value: 'Soir', label: 'Soir' }, { value: 'Nuit', label: 'Nuit' } ];

    if (!isOpen) return null;

    const handleGenerateClick = () => {
        if (selectedShift) {
            onGenerate(selectedShift);
        }
    };

    const handleCopy = () => {
        if (reportContent) {
            navigator.clipboard.writeText(reportContent);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
            aria-modal="true"
            role="dialog"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700 w-full max-w-2xl max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Générer le Rapport Inter-Quarts</h2>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                    <div>
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Choisir le quart de travail</label>
                        <RadioGroup name="shift-report" options={quartOptions} selectedValue={selectedShift} onChange={setSelectedShift} />
                    </div>
                    <button
                        onClick={handleGenerateClick}
                        disabled={isGenerating}
                        className="w-full sm:w-auto mt-2 sm:mt-0 ml-auto inline-flex items-center justify-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-slate-400 dark:disabled:bg-slate-600 transition-colors"
                    >
                        <SparkleIcon className="w-5 h-5" />
                        {isGenerating ? 'Génération en cours...' : 'Générer le Rapport'}
                    </button>
                </div>
                
                <div className="flex-grow overflow-y-auto pr-2 relative">
                    {isGenerating ? (
                         <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                 <svg className="animate-spin h-8 w-8 text-teal-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <p className="mt-3 text-slate-500 dark:text-slate-400">Analyse des notes en cours...</p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert"><p>{error}</p></div>
                    ) : reportContent ? (
                        <div className="relative">
                            <textarea
                                readOnly
                                value={reportContent}
                                className="w-full h-96 p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-md font-mono text-sm"
                                placeholder="Le rapport généré apparaîtra ici."
                            />
                            <button
                                onClick={handleCopy}
                                className="absolute top-2 right-2 p-2 rounded-md bg-white/80 backdrop-blur-sm dark:bg-slate-700/80 hover:bg-white dark:hover:bg-slate-600 transition-colors shadow"
                                title="Copier le rapport"
                            >
                                <CopyIcon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                            </button>
                            {isCopied && <div className="absolute bottom-2 right-2 bg-slate-800 text-white text-xs py-1 px-2 rounded-md">Copié !</div>}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-slate-500 dark:text-slate-400">Le rapport de relève apparaîtra ici après génération.</p>
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-slate-200 dark:border-slate-700">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-md shadow-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShiftReportModal;
