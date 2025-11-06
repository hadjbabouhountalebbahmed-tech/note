
import React, { useState } from 'react';
import CollapsibleSection from './CollapsibleSection';

const SaveIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

const FolderOpenIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V10.5m-10.5-4.5h4.5m-4.5 0l-1.5 4.5" />
    </svg>
);

const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);


interface SaveLoadProps {
    savedStates: string[];
    onSave: (name: string) => void;
    onLoad: (name: string) => void;
    onDelete: (name: string) => void;
}

const SaveLoad: React.FC<SaveLoadProps> = ({ savedStates, onSave, onLoad, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [saveName, setSaveName] = useState('');

    const handleSave = () => {
        if (saveName.trim()) {
            onSave(saveName.trim());
            setSaveName('');
        } else {
            alert("Veuillez entrer un nom pour le modèle.");
        }
    };
    
    const handleSaveKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSave();
        }
    };
    
    return (
        <CollapsibleSection
            title="Modèles Personnalisés"
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            isFilled={savedStates.length > 0}
        >
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                Gagnez du temps en sauvegardant des configurations de formulaire pour des cas cliniques fréquents. Vous pourrez ensuite les appliquer rapidement à n'importe quel patient.
            </p>
            <div className="space-y-6">
                <div>
                    <h3 className="text-md font-semibold text-slate-600 dark:text-slate-400 mb-2">Enregistrer le formulaire actuel comme modèle</h3>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="text"
                            value={saveName}
                            onChange={(e) => setSaveName(e.target.value)}
                            onKeyDown={handleSaveKeyDown}
                            placeholder="Nom du modèle (ex: Post-op J1 hanche)"
                            className="flex-grow p-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                        />
                        <button onClick={handleSave} className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                            <SaveIcon className="w-5 h-5" />
                            <span>Sauvegarder</span>
                        </button>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                    <h3 className="text-md font-semibold text-slate-600 dark:text-slate-400 mb-3">Gérer mes modèles</h3>
                    {savedStates.length > 0 ? (
                        <ul className="space-y-2">
                            {savedStates.map(name => (
                                <li key={name} className="flex items-center justify-between bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg transition-colors">
                                    <span className="text-slate-800 dark:text-slate-200 font-medium">{name}</span>
                                    <div className="flex items-center gap-1">
                                        <button 
                                            onClick={() => onLoad(name)} 
                                            title={`Charger le modèle "${name}"`} 
                                            className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                                            aria-label={`Charger le modèle "${name}"`}
                                        >
                                            <FolderOpenIcon className="w-5 h-5 text-teal-600 dark:text-teal-500" />
                                        </button>
                                        <button 
                                            onClick={() => onDelete(name)} 
                                            title={`Supprimer le modèle "${name}"`} 
                                            className="p-2 rounded-md hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                                            aria-label={`Supprimer le modèle "${name}"`}
                                        >
                                            <TrashIcon className="w-5 h-5 text-red-600 dark:text-red-500" />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center py-4 px-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                            <p className="text-sm text-slate-500 dark:text-slate-400">Vous n'avez aucun modèle personnalisé. Enregistrez le formulaire actuel pour en créer un.</p>
                        </div>
                    )}
                </div>
            </div>
        </CollapsibleSection>
    );
};

export default SaveLoad;
