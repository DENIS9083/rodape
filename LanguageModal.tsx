import { X, Check } from 'lucide-react';
import { useState } from 'react';

interface LanguageModalProps {
  currentLanguage: string;
  onClose: () => void;
  onSave: (language: string) => void;
}

const languages = [
  { code: 'pt-BR', name: 'Português (Brasil)', flag: '🇧🇷' },
  { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
  { code: 'es-ES', name: 'Español', flag: '🇪🇸' },
  { code: 'fr-FR', name: 'Français', flag: '🇫🇷' },
  { code: 'de-DE', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it-IT', name: 'Italiano', flag: '🇮🇹' },
];

export default function LanguageModal({ currentLanguage, onClose, onSave }: LanguageModalProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  const handleSave = () => {
    onSave(selectedLanguage);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-2xl border border-gray-800 w-full max-w-md overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="font-display font-bold text-2xl text-white">Selecionar Idioma</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-2 max-h-96 overflow-y-auto">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => setSelectedLanguage(language.code)}
              className={`w-full flex items-center justify-between p-4 rounded-lg transition-all ${
                selectedLanguage === language.code
                  ? 'bg-red-500/20 border-2 border-red-500'
                  : 'bg-gray-800/50 border-2 border-transparent hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{language.flag}</span>
                <span className="text-white font-medium">{language.name}</span>
              </div>
              {selectedLanguage === language.code && (
                <Check className="w-5 h-5 text-red-500" />
              )}
            </button>
          ))}
        </div>

        <div className="flex gap-3 p-6 border-t border-gray-800">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:shadow-lg hover:shadow-red-500/50 text-white font-semibold rounded-lg transition-all"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
