import { ExternalLink } from 'lucide-react';
import { categories, type CategoryKey, type Fact } from '@/data/facts';

interface FactCardProps {
  category: CategoryKey;
  fact: Fact;
}

export function FactCard({ category, fact }: FactCardProps) {
  const categoryLabel = categories.find(cat => cat.key === category)?.label || category;

  return (
    <div 
      className="bg-card rounded-xl shadow-lg p-6 fade-in" 
      role="tabpanel" 
      aria-live="polite"
      data-testid="fact-card"
    >
      <div className="flex items-center mb-4">
        <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
        <h2 className="text-lg font-semibold text-primary" data-testid="fact-category">
          {categoryLabel}
        </h2>
      </div>
      
      <p className="text-base leading-relaxed mb-4" data-testid="fact-text">
        {fact.text}
      </p>
      
      {fact.source && (
        <div data-testid="fact-source">
          <a 
            href={fact.source} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline focus-ring rounded inline-flex items-center gap-1"
          >
            <ExternalLink className="w-3 h-3" />
            Kaynak
          </a>
        </div>
      )}
    </div>
  );
}
