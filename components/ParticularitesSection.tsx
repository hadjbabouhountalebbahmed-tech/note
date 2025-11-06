import React from 'react';

interface ParticularitesSectionProps {
  value: string;
  onChange: (value: string) => void;
}

const ParticularitesSection: React.FC<ParticularitesSectionProps> = ({ value, onChange }) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={4}
      className="w-full p-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
      placeholder="Ajouter une note sur un événement particulier (ex: visite du médecin, examen réalisé, réaction spécifique...)"
    />
  );
};

export default ParticularitesSection;