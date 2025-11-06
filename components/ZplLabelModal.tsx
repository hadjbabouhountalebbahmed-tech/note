

import React, { useState, useCallback } from 'react';

const CopyIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const PrinterIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H7a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm2-9V5a2 2 0 00-2-2H9a2 2 0 00-2 2v3m10 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v3m2 9h6" />
    </svg>
);


interface ZplLabelModalProps {
    isOpen: boolean;
    onClose: () => void;
    zplCode: string;
}

const ZplLabelModal: React.FC<ZplLabelModalProps> = ({ isOpen, onClose, zplCode }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(zplCode);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    }, [zplCode]);

    const handlePrint = useCallback(() => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`<pre style="margin: 0; padding: 0; font-family: monospace;">${zplCode}</pre>`);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
        } else {
            alert("Impossible d'ouvrir la fenêtre d'impression. Veuillez vérifier les paramètres de votre navigateur.");
        }
    }, [zplCode]);

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
            aria-modal="true"
            role="dialog"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700 w-full max-w-lg max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Aperçu & Impression d'Étiquette ZPL</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Voici le code ZPL généré pour l'étiquette. Vous pouvez le copier ou tenter de l'imprimer directement si une imprimante ZPL est configurée sur votre système.
                </p>

                <div className="flex-grow overflow-y-auto pr-2 relative">
                    <label htmlFor="zpl-code-textarea" className="sr-only">Code ZPL</label>
                    <textarea
                        id="zpl-code-textarea"
                        readOnly
                        value={zplCode}
                        className="w-full h-64 p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-md font-mono text-xs"
                    />
                </div>

                <div className="flex flex-col sm:flex-row justify-end items-center gap-3 pt-4 mt-4 border-t border-slate-200 dark:border-slate-700">
                    <button
                        onClick={onClose}
                        className="w-full sm:w-auto px-4 py-2 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-md shadow-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400"
                    >
                        Fermer
                    </button>
                    <button
                        onClick={handleCopy}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-md shadow-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600"
                    >
                        <CopyIcon className="w-5 h-5" />
                        {isCopied ? 'Copié !' : 'Copier le code'}
                    </button>
                    <button
                        onClick={handlePrint}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                        <PrinterIcon className="w-5 h-5" />
                        Imprimer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ZplLabelModal;
