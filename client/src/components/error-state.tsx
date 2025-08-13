import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  onRetry: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div 
      className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center"
      data-testid="error-state"
    >
      <div className="text-red-600 dark:text-red-400 mb-4">
        <AlertTriangle className="w-12 h-12 mx-auto mb-2" />
        <h3 className="text-lg font-semibold">Bir hata oluştu</h3>
        <p className="text-sm">Bilgi yüklenirken sorun yaşandı</p>
      </div>
      <button 
        className="touch-target px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus-ring font-medium"
        onClick={onRetry}
        data-testid="button-retry"
      >
        Tekrar Dene
      </button>
    </div>
  );
}
