import { categories, type CategoryKey } from '@/data/facts';

interface CategoryTabsProps {
  currentCategory: CategoryKey;
  onCategoryChange: (category: CategoryKey) => void;
}

export function CategoryTabs({ currentCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="hidden md:flex flex-wrap justify-center gap-2 mb-4" role="tablist" aria-label="Kategori seçimi">
      {categories.map((category) => (
        <button
          key={category.key}
          className={`tab-button touch-target px-4 py-2 rounded-lg font-medium transition-colors focus-ring ${
            currentCategory === category.key ? 'tab-active' : 'tab-inactive'
          }`}
          data-category={category.key}
          data-testid={`tab-${category.key}`}
          role="tab"
          aria-selected={currentCategory === category.key}
          aria-controls="fact-card"
          onClick={() => onCategoryChange(category.key)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
