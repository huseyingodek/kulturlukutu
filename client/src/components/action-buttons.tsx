import { RefreshCw, Share2 } from 'lucide-react';
import { type Fact } from '@/data/facts';

interface ActionButtonsProps {
  onRefresh: () => void;
  currentFact?: Fact | null;
  categoryLabel?: string;
}

export function ActionButtons({ onRefresh, currentFact, categoryLabel }: ActionButtonsProps) {
  const handleShare = async () => {
    if (!navigator.share || !currentFact) return;
    
    try {
      await navigator.share({
        title: 'Genel Kültür - İlginç Bilgi',
        text: `${categoryLabel}: ${currentFact.text}`,
        url: window.location.href
      });
    } catch (error) {
      console.log('Paylaşım hatası:', error);
    }
  };

  const supportsWebShare = typeof navigator !== 'undefined' && navigator.share;

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <button 
        className="touch-target px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 focus-ring font-medium transition-colors flex items-center justify-center gap-2"
        onClick={onRefresh}
        data-testid="button-refresh"
      >
        <RefreshCw className="w-5 h-5" />
        Yeni Bilgi
      </button>
      
      {supportsWebShare && (
        <button 
          className="touch-target px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 focus-ring font-medium transition-colors flex items-center justify-center gap-2"
          onClick={handleShare}
          data-testid="button-share"
        >
          <Share2 className="w-5 h-5" />
          Paylaş
        </button>
      )}
    </div>
  );
}
