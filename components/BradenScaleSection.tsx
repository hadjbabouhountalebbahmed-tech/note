
import React from 'react';
import CollapsibleSection from './CollapsibleSection';
import RadioGroup from './RadioGroup';
import type { BradenScaleState } from '../types';
import { bradenScaleData } from '../constants';

interface BradenScaleSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  isFilled: boolean;
  state: BradenScaleState;
  onChange: (field: keyof BradenScaleState, value: number) => void;
}

const BradenScaleSection: React.FC<BradenScaleSectionProps> = ({ isOpen, onToggle, isFilled, state, onChange }) => {
    const totalScore = (Object.values(state) as number[]).reduce((sum, value) => sum + value, 0);

    const getRiskLevel = (score: number): { text: string, color: string } => {
        if (score <= 9) return { text: 'Risque très élevé', color: 'text-red-700 dark:text-red-500' };
        if (score >= 10 && score <= 12) return { text: 'Risque élevé', color: 'text-red-600 dark:text-red-500' };
        if (score >= 13 && score <= 14) return { text: 'Risque modéré', color: 'text-yellow-600 dark:text-yellow-500' };
        if (score >= 15 && score <= 18) return { text: 'Risque léger', color: 'text-yellow-500 dark:text-yellow-400' };
        return { text: 'Pas de risque', color: 'text-green-600 dark:text-green-500' };
    };

    const risk = getRiskLevel(totalScore);

    return (
        <CollapsibleSection title="Échelle de Braden – Risque de Plaie de Pression" isOpen={isOpen} onToggle={onToggle} isFilled={isFilled}>
            <div className="space-y-6">
                {bradenScaleData.map(field => (
                    <div key={field.id}>
                        <h3 className="text-md font-semibold text-slate-600 dark:text-slate-400 mb-3">
                            {field.label}
                        </h3>
                        <RadioGroup
                            name={`braden-${field.id}`}
                            options={field.options.map(opt => ({ label: opt.label, value: String(opt.value) }))}
                            selectedValue={String(state[field.id])}
                            onChange={(value) => onChange(field.id, parseInt(value, 10))}
                        />
                    </div>
                ))}
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 text-center">
                    <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">
                        Score Total : <span className={`px-2 py-1 rounded-md ${risk.color}`}>{totalScore} / 23</span>
                    </h3>
                    <p className={`mt-1 font-semibold ${risk.color}`}>{risk.text}</p>
                </div>
            </div>
        </CollapsibleSection>
    );
};

export default BradenScaleSection;