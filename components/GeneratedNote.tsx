

import React, { useEffect, useRef } from 'react';
import type { NoteEntry, LayoutSettings } from '../types';


const ResetIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-4.991-2.691L7.5 7.5l-2.682 2.682A8.25 8.25 0 009.75 21.75l3.182-3.182m0-4.242l-3.182-3.182" />
    </svg>
);

const SparkleIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 21.75l-.648-1.188a2.25 2.25 0 01-1.47-1.47L12.964 18l1.188-.648a2.25 2.25 0 011.47-1.47L16.25 15l.648 1.188a2.25 2.25 0 011.47 1.47L19.536 18l-1.188.648a2.25 2.25 0 01-1.47 1.47z" />
  </svg>
);

const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);

const CopyIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);


const AutoHeightTextarea: React.FC<{ value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, disabled?: boolean, placeholder?: string }> = ({ value, onChange, disabled, placeholder }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "0px";
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = scrollHeight + "px";
        }
    }, [value]);
    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
            className="w-full p-0 border-none bg-transparent focus:ring-1 focus:ring-teal-500/50 focus:outline-none resize-none overflow-hidden"
            style={{
                color: 'inherit',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                fontWeight: 'inherit',
                lineHeight: 'inherit',
            }}
            rows={1}
        />
    );
};

interface GeneratedNoteProps {
  noteEntries: NoteEntry[];
  onUpdateEntry: (id: string, newContent: string) => void;
  onDeleteEntry: (id: string) => void;
  isGenerating: boolean;
  error: string | null;
  isFormEmpty: boolean;
  onGenerate: () => void;
  onReset: () => void;
  backgroundImage: string | null;
  onCopy: () => void;
  isCopied: boolean;
  layoutSettings: LayoutSettings;
}

const GeneratedNote: React.FC<GeneratedNoteProps> = ({ 
    noteEntries, 
    onUpdateEntry,
    onDeleteEntry,
    isGenerating, 
    error, 
    isFormEmpty, 
    onGenerate, 
    onReset,
    backgroundImage,
    onCopy,
    isCopied,
    layoutSettings,
}) => {
    const A4_ASPECT_RATIO = 210 / 297;
    const A4_WIDTH_CM = 21;
    const A4_HEIGHT_CM = 29.7;
    const DATE_COLUMN_WIDTH_CM = 3.1;
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-slate-200 dark:border-slate-700 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300">Aperçu de la Note d'Évolution</h2>
            <div className="flex items-center gap-2">
            <button
                onClick={onCopy}
                disabled={noteEntries.length === 0}
                className="relative p-2 rounded-full hover:bg-slate-100 active:bg-slate-200 dark:hover:bg-slate-700 dark:active:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Copier la note"
                aria-label="Copier la note"
            >
                <CopyIcon className="w-6 h-6 text-slate-500 dark:text-slate-400" />
                {isCopied && <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded-md">Copié !</div>}
            </button>
            <button 
                onClick={onReset} 
                className="p-2 rounded-full hover:bg-slate-100 active:bg-slate-200 dark:hover:bg-slate-700 dark:active:bg-slate-600 transition-colors" 
                title="Réinitialiser la note et le formulaire du patient actuel"
                aria-label="Réinitialiser la note et le formulaire du patient actuel"
            >
                    <ResetIcon className="w-6 h-6 text-slate-500 dark:text-slate-400" />
                </button>
            <button 
                onClick={onGenerate} 
                disabled={isGenerating || isFormEmpty} 
                className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
            >
                <SparkleIcon className="w-5 h-5" />
                {isGenerating ? 'Génération...' : noteEntries.length > 0 ? 'Ajouter à la Note' : 'Générer la Note'}
            </button>
            </div>
        </div>
      
        {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert"><p>{error}</p></div>}
      
        <div className="flex-grow flex flex-col relative">
            <div 
                className="relative w-full mx-auto rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden"
                style={{
                    aspectRatio: `${A4_ASPECT_RATIO}`,
                    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {noteEntries.length > 0 &&
                    <div
                        className="absolute p-0 m-0"
                        style={{
                            top: `${(layoutSettings.positionY / A4_HEIGHT_CM) * 100}%`,
                            left: `${(layoutSettings.positionX / A4_WIDTH_CM) * 100}%`,
                            width: `${((DATE_COLUMN_WIDTH_CM + layoutSettings.textBlockWidth) / A4_WIDTH_CM) * 100}%`,
                            fontFamily: layoutSettings.fontFamily,
                            fontSize: `${layoutSettings.fontSize}pt`,
                            fontWeight: layoutSettings.fontWeight,
                            lineHeight: layoutSettings.lineHeight,
                            color: 'black',
                            opacity: layoutSettings.opacity / 100,
                            textShadow: 'white 0px 0px 3px',
                        }}
                    >
                        {noteEntries.map(entry => (
                            <div 
                                className="flex items-start group" 
                                key={entry.id}
                                style={{ marginBottom: `${layoutSettings.entrySpacing}pt` }}
                            >
                                <div 
                                    className="shrink-0 text-center"
                                    style={{
                                        width: `${(DATE_COLUMN_WIDTH_CM / (DATE_COLUMN_WIDTH_CM + layoutSettings.textBlockWidth)) * 100}%`,
                                    }}
                                >
                                    {entry.timestamp}
                                </div>
                                <div className="flex-grow relative">
                                    <AutoHeightTextarea
                                        value={entry.content}
                                        onChange={(e) => onUpdateEntry(entry.id, e.target.value)}
                                        disabled={isGenerating}
                                    />
                                </div>
                                <div className="shrink-0 flex items-start justify-center" style={{ width: '30px' }}>
                                    <button 
                                        onClick={() => onDeleteEntry(entry.id)} 
                                        className="p-1 rounded-full text-slate-400 hover:bg-red-100/50 dark:hover:bg-red-900/40 hover:text-red-600 dark:hover:text-red-500 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                                        title="Supprimer cette entrée"
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                }
                {noteEntries.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                        <span className="text-center text-slate-500/80 dark:text-slate-400/80 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm px-4 py-2 rounded-lg">
                            {isGenerating ? "Génération en cours..." : (!backgroundImage ? "Chargez une image de formulaire et remplissez le questionnaire pour commencer." : "")}
                        </span>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default GeneratedNote;
