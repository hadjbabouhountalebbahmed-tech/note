
import React, { useState, useRef, useEffect } from 'react';

const UserPlusIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
    </svg>
);

const XMarkIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const PencilSquareIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
);

const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);


interface PatientTabsProps {
    patientIds: string[];
    activePatientId: string | null;
    onSelect: (id: string) => void;
    onAdd: () => void;
    onDelete: (id: string) => void;
    onRename: (oldId: string, newId: string) => void;
    nextRoomNumber: number;
    onNextRoomNumberChange: (num: number) => void;
}

const PatientTabs: React.FC<PatientTabsProps> = ({ patientIds, activePatientId, onSelect, onAdd, onDelete, onRename, nextRoomNumber, onNextRoomNumberChange }) => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editText, setEditText] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editingId && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [editingId]);

    const handleStartEdit = (id: string) => {
        setEditingId(id);
        setEditText(id);
    };

    const handleConfirmEdit = () => {
        if (editingId && editText.trim()) {
            onRename(editingId, editText);
        }
        setEditingId(null);
        setEditText('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleConfirmEdit();
        } else if (e.key === 'Escape') {
            setEditingId(null);
            setEditText('');
        }
    };
    
    const handleStartEditMobile = () => {
        if (activePatientId) {
            handleStartEdit(activePatientId);
        }
    };

    const handleDeleteMobile = () => {
        if (activePatientId) {
            onDelete(activePatientId);
        }
    };

    return (
        <div className="border-b border-slate-200 dark:border-slate-700 pb-2">
            {/* Desktop View: md and larger */}
            <div className="hidden md:flex items-center">
                <div className="flex items-center gap-1 overflow-x-auto">
                     <div className="flex items-center gap-1 flex-nowrap">
                        {patientIds.map(id => (
                            <div key={id} className="relative group">
                                 {editingId === id ? (
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        onBlur={handleConfirmEdit}
                                        onKeyDown={handleKeyDown}
                                        className="px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 bg-white dark:bg-slate-900 border-teal-500 text-teal-600 dark:text-teal-400 focus:outline-none ring-2 ring-teal-500"
                                        style={{ minWidth: '120px' }}
                                    />
                                ) : (
                                <>
                                <button
                                    onClick={() => onSelect(id)}
                                    onDoubleClick={() => handleStartEdit(id)}
                                    className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors whitespace-nowrap
                                        ${activePatientId === id
                                            ? 'border-teal-500 text-teal-600 dark:text-teal-400 bg-slate-100 dark:bg-slate-800'
                                            : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                                        }`}
                                >
                                    {id}
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(id);
                                    }}
                                    className="absolute top-0 right-0 p-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                                    title={`Supprimer patient ${id}`}
                                    aria-label={`Supprimer patient ${id}`}
                                >
                                    <XMarkIcon className="w-3 h-3" />
                                </button>
                                </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="ml-4 pl-4 border-l border-slate-200 dark:border-slate-700 flex items-center gap-3 shrink-0">
                    <button
                        onClick={onAdd}
                        className="flex items-center gap-2 px-3 py-1.5 border border-dashed border-slate-400 dark:border-slate-500 text-sm font-medium rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
                    >
                        <UserPlusIcon className="w-4 h-4" />
                        <span>Ajouter Patient</span>
                    </button>
                    <div className="flex items-center">
                        <label htmlFor="next-room-number" className="text-xs font-medium text-slate-500 dark:text-slate-400 mr-2 whitespace-nowrap">
                            Prochain N°:
                        </label>
                        <input
                            id="next-room-number"
                            type="number"
                            min="1"
                            value={nextRoomNumber}
                            onChange={(e) => {
                                const val = parseInt(e.target.value, 10);
                                if (!isNaN(val) && val > 0) {
                                    onNextRoomNumberChange(val);
                                }
                            }}
                            className="w-20 px-2 py-1 text-sm border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 rounded-md focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                            aria-label="Numéro de la prochaine chambre"
                        />
                    </div>
                </div>
            </div>

            {/* Mobile View: smaller than md */}
            <div className="md:hidden">
                 {editingId && activePatientId === editingId ? (
                     <div className="mb-2">
                        <label htmlFor="edit-patient-mobile" className="sr-only">Renommer patient</label>
                        <input
                            id="edit-patient-mobile"
                            ref={inputRef}
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onBlur={handleConfirmEdit}
                            onKeyDown={handleKeyDown}
                            className="w-full px-3 py-2 text-sm font-medium rounded-md border-2 bg-white dark:bg-slate-900 border-teal-500 text-teal-600 dark:text-teal-400 focus:outline-none ring-2 ring-teal-500"
                        />
                    </div>
                 ) : (
                    <div className="flex items-center gap-2 mb-2">
                        <label htmlFor="patient-select" className="sr-only">Sélectionner Patient</label>
                        <select
                            id="patient-select"
                            value={activePatientId || ''}
                            onChange={(e) => onSelect(e.target.value)}
                            className="flex-grow p-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 rounded-md focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                        >
                            {patientIds.map(id => (
                                <option key={id} value={id}>{id}</option>
                            ))}
                        </select>
                        <button 
                            onClick={handleStartEditMobile} 
                            className="p-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600"
                            aria-label="Renommer le patient"
                            title="Renommer le patient"
                            disabled={!activePatientId}
                        >
                            <PencilSquareIcon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                        </button>
                        <button 
                            onClick={handleDeleteMobile}
                            className="p-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 hover:bg-red-50 dark:hover:bg-red-900/50"
                            aria-label="Supprimer le patient"
                            title="Supprimer le patient"
                            disabled={!activePatientId}
                        >
                            <TrashIcon className="w-5 h-5 text-red-600 dark:text-red-500" />
                        </button>
                    </div>
                 )}

                <div className="mt-4 flex flex-col sm:flex-row gap-4 items-center">
                    <button
                        onClick={onAdd}
                        className="w-full sm:w-auto flex-grow flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-slate-400 dark:border-slate-500 text-sm font-medium rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
                    >
                        <UserPlusIcon className="w-4 h-4" />
                        <span>Ajouter Patient</span>
                    </button>
                    <div className="w-full sm:w-auto flex items-center">
                        <label htmlFor="next-room-number-mobile" className="text-sm font-medium text-slate-500 dark:text-slate-400 mr-2 whitespace-nowrap">
                            Prochain N°:
                        </label>
                        <input
                            id="next-room-number-mobile"
                            type="number"
                            min="1"
                            value={nextRoomNumber}
                            onChange={(e) => {
                                const val = parseInt(e.target.value, 10);
                                if (!isNaN(val) && val > 0) {
                                    onNextRoomNumberChange(val);
                                }
                            }}
                            className="w-full sm:w-24 px-2 py-1 text-sm border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 rounded-md focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                            aria-label="Numéro de la prochaine chambre"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientTabs;
