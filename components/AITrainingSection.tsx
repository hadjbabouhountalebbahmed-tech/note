import React from 'react';
import CollapsibleSection from './CollapsibleSection';

const BrainIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.998 15.998 0 011.622-3.385m5.043.025a15.998 15.998 0 001.622 3.385m3.388-1.62a15.998 15.998 0 00-1.622-3.385m0 0a3 3 0 10-5.78-1.128 2.25 2.25 0 012.4-2.245 4.5 4.5 0 00-8.4 2.245c0 .399.078.78.22 1.128m8.4-2.245a15.998 15.998 0 00-3.388 1.62m5.043.025a15.998 15.998 0 01-1.622 3.385m-5.043-.025a15.998 15.998 0 00-1.622-3.385" />
    </svg>
);

const BeakerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c.251.023.501.05.75.082m.75.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19 14.5M12 14.5v7.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5h15" />
    </svg>
);

interface AITrainingSectionProps {
    isOpen: boolean;
    onToggle: () => void;
    isFilled: boolean;
    trainingText: string;
    onTextChange: (text: string) => void;
    isHighlighting: boolean;
    testInput: string;
    onTestInputChange: (text: string) => void;
    testOutput: string;
    onTest: () => void;
    isTesting: boolean;
    testError: string | null;
}

const AITrainingSection: React.FC<AITrainingSectionProps> = ({
    isOpen,
    onToggle,
    isFilled,
    trainingText,
    onTextChange,
    isHighlighting,
    testInput,
    onTestInputChange,
    testOutput,
    onTest,
    isTesting,
    testError,
}) => {
    return (
        <CollapsibleSection
            title="Entraînement de l'IA"
            isOpen={isOpen}
            onToggle={onToggle}
            isFilled={isFilled}
            isHighlighting={isHighlighting}
        >
            <div className="flex items-start gap-4">
                <BrainIcon className="w-10 h-10 text-teal-500 mt-1 shrink-0" />
                <div>
                    <h3 className="text-md font-semibold text-slate-600 dark:text-slate-400 mb-2">
                        Personnalisez le style de rédaction de l'IA
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                        Collez ici un ou plusieurs exemples de vos propres notes d'évolution. L'IA apprendra votre style (ton, abréviations, structure) pour générer des notes qui vous ressemblent.
                        Cette instruction aura la priorité sur tout le reste.
                    </p>
                </div>
            </div>
            <textarea
                value={trainingText}
                onChange={(e) => onTextChange(e.target.value)}
                rows={8}
                className="w-full p-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors mt-2"
                placeholder="Exemple :
Pt calme et coopérant. SV stables. SpO2 98% AA. Abdomen souple, indolore. Selles x1 ce matin, aspect normal. Diurèse conservée. Pansement à la hanche droite propre et sec. Mobilisation au fauteuil bien tolérée. Douleur EVA 2/10, soulagée par positionnement."
            />

            <div className="mt-6 pt-4 border-t border-dashed border-slate-300 dark:border-slate-600">
                <h4 className="text-md font-semibold text-slate-600 dark:text-slate-400 mb-2">
                    Laboratoire de Style (Réponse Immédiate)
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                    Écrivez une phrase simple pour voir comment l'IA la reformulerait avec le style que vous avez fourni.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    <div>
                        <label htmlFor="style-test-input" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Phrase à reformuler :</label>
                        <textarea
                            id="style-test-input"
                            value={testInput}
                            onChange={(e) => onTestInputChange(e.target.value)}
                            rows={3}
                            className="w-full p-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                            placeholder="Ex: Le patient est calme."
                            disabled={isTesting}
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="style-test-output" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Résultat :</label>
                        <div className="w-full p-2 border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 rounded-md min-h-[80px] flex items-center justify-center">
                            {isTesting ? (
                                <div className="flex items-center text-slate-500 dark:text-slate-400">
                                    <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Analyse...</span>
                                </div>
                            ) : testError ? (
                                <p className="text-red-500 text-sm">{testError}</p>
                            ) : testOutput ? (
                                <p className="text-slate-800 dark:text-slate-200">{testOutput}</p>
                            ) : (
                                <p className="text-slate-400 dark:text-slate-500 text-center text-sm">Le résultat du test apparaîtra ici.</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-3 text-right">
                    <button
                        onClick={onTest}
                        disabled={isTesting || !trainingText.trim() || !testInput.trim()}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
                    >
                        <BeakerIcon className="w-5 h-5" />
                        <span>{isTesting ? 'Analyse...' : 'Tester'}</span>
                    </button>
                </div>
            </div>
        </CollapsibleSection>
    );
};

export default AITrainingSection;