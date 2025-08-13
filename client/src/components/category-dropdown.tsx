import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { categories, type CategoryKey } from '@/data/facts';

interface CategoryDropdownProps {
  currentCategory: CategoryKey;
  onCategoryChange: (category: CategoryKey) => void;
}

export function CategoryDropdown({ currentCategory, onCategoryChange }: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentCategoryLabel = categories.find(cat => cat.key === currentCategory)?.label || 'Genel';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCategorySelect = (category: CategoryKey) => {
    onCategoryChange(category);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent, category?: CategoryKey) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (category) {
        handleCategorySelect(category);
      } else {
        setIsOpen(!isOpen);
      }
    }
  };

  return (
    <div className="md:hidden relative" ref={dropdownRef}>
      <button
        className="w-full touch-target px-4 py-3 bg-card border border-border rounded-lg font-medium focus-ring flex justify-between items-center"
        data-testid="category-dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => handleKeyDown(e)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Kategori seçin"
      >
        <span>{currentCategoryLabel}</span>
        <ChevronDown 
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      
      {isOpen && (
        <div 
          className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-10"
          role="listbox"
          aria-label="Kategoriler"
        >
          {categories.map((category, index) => (
            <button
              key={category.key}
              className={`dropdown-item w-full px-4 py-3 text-left hover:bg-muted focus-ring ${
                index === categories.length - 1 ? 'rounded-b-lg' : ''
              }`}
              data-testid={`dropdown-item-${category.key}`}
              onClick={() => handleCategorySelect(category.key)}
              onKeyDown={(e) => handleKeyDown(e, category.key)}
              role="option"
              aria-selected={currentCategory === category.key}
            >
              {category.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
