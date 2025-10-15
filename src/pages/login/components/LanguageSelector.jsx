import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
  const languages = [
    { code: 'es', name: 'Español', flag: '🇬🇹' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  const currentLang = languages?.find(lang => lang?.code === currentLanguage);

  return (
    <div className="relative group">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center space-x-2 text-text-secondary hover:text-text-primary"
      >
        <span className="text-lg">{currentLang?.flag}</span>
        <span className="font-body text-sm">{currentLang?.name}</span>
        <Icon name="ChevronDown" size={14} />
      </Button>
      {/* Dropdown Menu */}
      <div className="absolute top-full right-0 mt-1 w-40 bg-popover border border-border rounded-lg shadow-soft-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-2">
          {languages?.map((language) => (
            <button
              key={language?.code}
              onClick={() => onLanguageChange(language?.code)}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-sm font-body transition-colors duration-200 ${
                currentLanguage === language?.code
                  ? 'text-primary bg-primary/10' :'text-popover-foreground hover:bg-muted'
              }`}
            >
              <span className="text-lg">{language?.flag}</span>
              <span>{language?.name}</span>
              {currentLanguage === language?.code && (
                <Icon name="Check" size={14} className="ml-auto text-primary" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;