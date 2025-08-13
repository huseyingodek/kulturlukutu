import { useState, useEffect, useCallback, useRef } from 'react';
import { factsData, type CategoryKey, type Fact } from '@/data/facts';

const STORAGE_KEY = 'genel-kultur-shown-facts';

interface ShownFacts {
  [category: string]: number[];
}

export function useFacts() {
  const [currentCategory, setCurrentCategory] = useState<CategoryKey>('genel');
  const [currentFact, setCurrentFact] = useState<Fact | null>(null);
  const [currentFactId, setCurrentFactId] = useState<number | null>(null);
  const [shownFacts, setShownFacts] = useState<ShownFacts>({});
  const [isError, setIsError] = useState(false);
  
  // Use refs to store values that we need in callbacks without causing re-renders
  const shownFactsRef = useRef(shownFacts);
  const currentFactIdRef = useRef(currentFactId);
  
  // Keep refs in sync with state
  useEffect(() => {
    shownFactsRef.current = shownFacts;
  }, [shownFacts]);
  
  useEffect(() => {
    currentFactIdRef.current = currentFactId;
  }, [currentFactId]);

  // Load session data on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setShownFacts(parsed);
        shownFactsRef.current = parsed;
      }
    } catch (e) {
      console.log('SessionStorage verisi yüklenemedi:', e);
    }
  }, []);

  // Save session data when shownFacts changes
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(shownFacts));
    } catch (e) {
      console.log('SessionStorage verisi kaydedilemedi:', e);
    }
  }, [shownFacts]);

  const getRandomFact = useCallback((category: CategoryKey): Fact | null => {
    try {
      const facts = factsData[category];
      if (!facts || facts.length === 0) {
        return null;
      }

      // Get shown facts for this category from ref
      const shown = shownFactsRef.current[category] || [];
      const currentId = currentFactIdRef.current;
      
      // If all facts have been shown, reset the list
      if (shown.length >= facts.length) {
        const newShownFacts = {
          ...shownFactsRef.current,
          [category]: []
        };
        setShownFacts(newShownFacts);
        shownFactsRef.current = newShownFacts;
        
        return facts[Math.floor(Math.random() * facts.length)];
      }

      // Find facts that haven't been shown and aren't the current fact
      const availableFacts = facts.filter(fact => 
        !shown.includes(fact.id) && fact.id !== currentId
      );

      // If no available facts, reset and try again
      if (availableFacts.length === 0) {
        const newShownFacts = {
          ...shownFactsRef.current,
          [category]: currentId ? [currentId] : []
        };
        setShownFacts(newShownFacts);
        shownFactsRef.current = newShownFacts;
        
        const filteredFacts = facts.filter(fact => fact.id !== currentId);
        return filteredFacts.length > 0 
          ? filteredFacts[Math.floor(Math.random() * filteredFacts.length)]
          : facts[Math.floor(Math.random() * facts.length)];
      }

      // Return random fact from available ones
      return availableFacts[Math.floor(Math.random() * availableFacts.length)];
    } catch (error) {
      console.error('Bilgi seçme hatası:', error);
      return null;
    }
  }, []); // No dependencies needed now since we're using refs

  const showRandomFact = useCallback((category: CategoryKey) => {
    const fact = getRandomFact(category);
    
    if (!fact) {
      setIsError(true);
      return;
    }

    // Add fact to shown list
    const newShownFacts = {
      ...shownFactsRef.current,
      [category]: [...(shownFactsRef.current[category] || []), fact.id]
    };
    
    setShownFacts(newShownFacts);
    shownFactsRef.current = newShownFacts;
    
    setCurrentFact(fact);
    setCurrentFactId(fact.id);
    setIsError(false);
  }, [getRandomFact]);

  const switchCategory = useCallback((category: CategoryKey) => {
    setCurrentCategory(category);
    // Use setTimeout to ensure state update is complete before showing fact
    setTimeout(() => {
      showRandomFact(category);
    }, 0);
  }, [showRandomFact]);

  const refreshFact = useCallback(() => {
    showRandomFact(currentCategory);
  }, [currentCategory, showRandomFact]);

  const retryAfterError = useCallback(() => {
    setIsError(false);
    showRandomFact(currentCategory);
  }, [currentCategory, showRandomFact]);

  // Show initial fact when component mounts
  useEffect(() => {
    // Use setTimeout to ensure all refs are properly initialized
    const timer = setTimeout(() => {
      showRandomFact('genel');
    }, 0);
    
    return () => clearTimeout(timer);
  }, []); // Empty dependency array to run only on mount

  return {
    currentCategory,
    currentFact,
    isError,
    switchCategory,
    refreshFact,
    retryAfterError
  };
}
