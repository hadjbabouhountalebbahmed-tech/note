import React, { useRef, useState } from 'react';
import { fontOptions, fontWeightOptions } from '../constants';
import type { LayoutSettings } from '../types';

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

const UploadIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
);

const XCircleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const PrinterIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
    </svg>
);

const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

const DocumentWordIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);


interface SliderInputProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step: number;
    unit?: string;
}

const SliderInput: React.FC<SliderInputProps> = ({ label, value, onChange, min, max, step, unit }) => (
    <div>
        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">{label} ({unit})</label>
        <div className="flex items-center gap-3">
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer"
            />
            <input
                type="number"
                value={value.toFixed(2)}
                onChange={(e) => onChange(Number(e.target.value))}
                min={min}
                max={max}
                step={step}
                className="w-24 p-1 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md text-sm focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
            />
        </div>
    </div>
);


interface PdfLayoutSettingsProps {
    layoutSettings: LayoutSettings;
    onLayoutChange: React.Dispatch<React.SetStateAction<LayoutSettings>>;
    onDownloadPdf: () => void;
    onPrintPdf: () => void;
    onGenerateDocx: () => void;
    onGenerateLabelPdf: () => void;
    onGenerateZplLabel: () => void;
    onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveImage: () => void;
    backgroundImageFileName: string | null;
    noteIsEmpty: boolean;
    backgroundImageIsEmpty: boolean;
}

const TABS = [
    { id: 'impression', label: 'Impression' },
    { id: 'mise-en-page', label: 'Mise en page' },
    { id: 'texte', label: 'Texte' },
    { id: 'fond-de-page', label: 'Fond de page' },
];

const PdfLayoutSettings: React.FC<PdfLayoutSettingsProps> = ({
    layoutSettings,
    onLayoutChange,
    onDownloadPdf,
    onPrintPdf,
    onGenerateDocx,
    onGenerateLabelPdf,
    onGenerateZplLabel,
    onImageUpload,
    onRemoveImage,
    backgroundImageFileName,
    noteIsEmpty,
    backgroundImageIsEmpty,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('impression');

    const handleSettingChange = (field: keyof LayoutSettings, value: any) => {
        onLayoutChange(prev => ({ ...prev, [field]: value }));
    };
    
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden sticky top-8">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-3">
                    <h2 className="text-lg font-bold text-slate-700 dark:text-slate-300">
                       <span className="text-2xl mr-2">🎛️</span> Ajuster l'affichage
                    </h2>
                </div>
                <ChevronDownIcon className={`w-6 h-6 text-slate-500 dark:text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
                className="grid transition-all duration-300 ease-in-out"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
                <div className="overflow-hidden">
                    <div className="px-4 pb-4">
                        <div className="border-b border-slate-200 dark:border-slate-700 mb-4">
                            <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                                {TABS.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm focus:outline-none ${
                                            activeTab === tab.id
                                            ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-600'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="space-y-6">
                            {activeTab === 'impression' && (
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">Exportation Standard</h4>
                                        <div className="space-y-3">
                                            <button onClick={onDownloadPdf} disabled={noteIsEmpty && backgroundImageIsEmpty} className="w-full inline-flex items-center justify-center gap-3 px-3 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 disabled:bg-slate-400 dark:disabled:bg-slate-600 transition-all transform hover:scale-105">
                                                <DownloadIcon className="w-5 h-5" /> 
                                                <span>Télécharger en PDF</span>
                                            </button>
                                            <button onClick={onPrintPdf} disabled={noteIsEmpty && backgroundImageIsEmpty} className="w-full inline-flex items-center justify-center gap-3 px-3 py-2.5 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-md text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 transition-all transform hover:scale-105">
                                                <PrinterIcon className="w-5 h-5" /> 
                                                <span>Imprimer (via PDF)</span>
                                            </button>
                                            <button onClick={onGenerateDocx} disabled={noteIsEmpty} className="w-full inline-flex items-center justify-center gap-3 px-3 py-2.5 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-md text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 transition-all transform hover:scale-105">
                                                <DocumentWordIcon className="w-5 h-5" />
                                                <span>Exporter en Word (.docx)</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Impression d'étiquettes</h4>
                                        <div className="flex gap-4 mb-3">
                                            <div>
                                                <label htmlFor="label-width" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Largeur (cm)</label>
                                                <input type="number" id="label-width" value={layoutSettings.labelWidth} onChange={(e) => handleSettingChange('labelWidth', Number(e.target.value))} className="w-full p-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md focus:ring-1 focus:ring-teal-500" step="0.1" />
                                            </div>
                                            <div>
                                                <label htmlFor="label-height" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Hauteur (cm)</label>
                                                <input type="number" id="label-height" value={layoutSettings.labelHeight} onChange={(e) => handleSettingChange('labelHeight', Number(e.target.value))} className="w-full p-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md focus:ring-1 focus:ring-teal-500" step="0.1" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <button onClick={onGenerateLabelPdf} disabled={noteIsEmpty} className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 disabled:bg-slate-400 dark:disabled:bg-slate-600">
                                                Générer PDF Étiquette
                                            </button>
                                            <button onClick={onGenerateZplLabel} className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-md text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors">
                                                Générer Étiquette ZPL
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'mise-en-page' && (
                                <div className="space-y-4">
                                    <p className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 p-2 rounded-md">
                                        <b>Astuce:</b> Ces réglages positionnent le texte pour qu'il s'aligne avec le formulaire papier standard.
                                    </p>
                                    <SliderInput label="Position Verticale" unit="cm" value={layoutSettings.positionY} onChange={(v) => handleSettingChange('positionY', v)} min={1} max={10} step={0.1} />
                                    <SliderInput label="Position Horizontale" unit="cm" value={layoutSettings.positionX} onChange={(v) => handleSettingChange('positionX', v)} min={1} max={5} step={0.1} />
                                    <SliderInput label="Largeur du bloc de texte" unit="cm" value={layoutSettings.textBlockWidth} onChange={(v) => handleSettingChange('textBlockWidth', v)} min={10} max={18} step={0.1} />
                                </div>
                            )}

                            {activeTab === 'texte' && (
                                <div className="space-y-4">
                                     <div>
                                        <label htmlFor="font-family" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Police</label>
                                        <select id="font-family" value={layoutSettings.fontFamily} onChange={(e) => handleSettingChange('fontFamily', e.target.value as LayoutSettings['fontFamily'])} className="w-full p-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md focus:ring-1 focus:ring-teal-500">
                                            {fontOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                        </select>
                                    </div>
                                    <SliderInput label="Taille" unit="pt" value={layoutSettings.fontSize} onChange={(v) => handleSettingChange('fontSize', v)} min={8} max={16} step={0.5} />
                                    <div>
                                        <label htmlFor="font-weight" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Épaisseur</label>
                                        <select id="font-weight" value={layoutSettings.fontWeight} onChange={(e) => handleSettingChange('fontWeight', Number(e.target.value))} className="w-full p-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md focus:ring-1 focus:ring-teal-500">
                                            {fontWeightOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                        </select>
                                    </div>
                                    <SliderInput label="Hauteur de ligne" unit="x" value={layoutSettings.lineHeight} onChange={(v) => handleSettingChange('lineHeight', v)} min={1} max={2.5} step={0.1} />
                                    <SliderInput label="Espacement" unit="pt" value={layoutSettings.entrySpacing} onChange={(v) => handleSettingChange('entrySpacing', v)} min={0} max={20} step={1} />
                                    <SliderInput label="Densité" unit="%" value={layoutSettings.opacity} onChange={(v) => handleSettingChange('opacity', v)} min={10} max={100} step={5} />
                                </div>
                            )}
                            
                            {activeTab === 'fond-de-page' && (
                                <div>
                                    <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Image de fond du formulaire</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                                        Importez une image (JPEG/PNG) de votre formulaire vierge. Elle sera utilisée comme arrière-plan pour la note et le PDF.
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <input type="file" ref={fileInputRef} onChange={onImageUpload} accept="image/png, image/jpeg" className="hidden" aria-hidden="true"/>
                                        <button type="button" onClick={() => fileInputRef.current?.click()} className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-md text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600">
                                            <UploadIcon className="w-5 h-5" />
                                            Changer...
                                        </button>
                                        {backgroundImageFileName && (
                                            <div className="flex items-center gap-2 text-sm p-1.5 bg-slate-100 dark:bg-slate-600/50 rounded-md">
                                                <span className="text-slate-600 dark:text-slate-300 truncate max-w-[100px]" title={backgroundImageFileName}>{backgroundImageFileName}</span>
                                                <button onClick={onRemoveImage} className="p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-500" title="Supprimer l'image">
                                                    <XCircleIcon className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PdfLayoutSettings;