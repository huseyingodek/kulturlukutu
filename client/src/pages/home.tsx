import { useFacts } from "@/hooks/use-facts";
import { categories } from "@/data/facts";
import { CategoryTabs } from "@/components/category-tabs";
import { CategoryDropdown } from "@/components/category-dropdown";
import { FactCard } from "@/components/fact-card";
import { ActionButtons } from "@/components/action-buttons";
import { ErrorState } from "@/components/error-state";

export default function Home() {
  const {
    currentCategory,
    currentFact,
    isError,
    switchCategory,
    refreshFact,
    retryAfterError,
  } = useFacts();

  const currentCategoryLabel = categories.find(
    (cat) => cat.key === currentCategory
  )?.label;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1
            className="text-3xl font-bold text-primary mb-2"
            data-testid="header-title"
          >
            Genel Kültür
          </h1>
          <p className="text-muted-foreground" data-testid="header-subtitle">
            Her gün yeni bilgiler keşfedin
          </p>
        </header>

        {/* Category Navigation */}
        <nav className="mb-6">
          <CategoryTabs
            currentCategory={currentCategory}
            onCategoryChange={switchCategory}
          />
          <CategoryDropdown
            currentCategory={currentCategory}
            onCategoryChange={switchCategory}
          />
        </nav>

        {/* Main Content */}
        <main className="mb-6">
          {isError ? (
            <ErrorState onRetry={retryAfterError} />
          ) : currentFact ? (
            <FactCard category={currentCategory} fact={currentFact} />
          ) : (
            <div className="bg-card rounded-xl shadow-lg p-6 text-center">
              <p className="text-muted-foreground">Bilgi yükleniyor...</p>
            </div>
          )}
        </main>

        {/* Action Buttons */}
        {!isError && (
          <ActionButtons
            onRefresh={refreshFact}
            currentFact={currentFact}
            categoryLabel={currentCategoryLabel}
          />
        )}

        {/* Footer */}
        <footer className="text-center mt-12 text-sm text-muted-foreground">
          <p>© 2025 Kültürlükutu. Bilgi sevenlerin buluşma noktası.</p>
        </footer>
      </div>
    </div>
  );
}
