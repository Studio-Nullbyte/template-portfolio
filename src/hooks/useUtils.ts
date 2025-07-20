import { useState, useCallback, useEffect } from 'react';
import type {
  UseProjectFilterReturn,
  UseModalReturn,
  AsyncState,
  LoadingState,
  Project
} from '@/types';

/**
 * Custom hook for managing project filtering with strict typing
 */
export function useProjectFilter<T extends Pick<Project, 'category'>>(
  projects: readonly T[],
  defaultCategory: string = 'all'
): {
  readonly activeCategory: string;
  readonly filteredProjects: readonly T[];
  readonly availableCategories: readonly string[];
  readonly setCategory: (category: string) => void;
  readonly resetFilter: () => void;
} {
  const [activeCategory, setActiveCategory] = useState<string>(defaultCategory);

  // Get available categories from projects
  const availableCategories = useCallback(() => {
    const categories = new Set(projects.map(project => project.category));
    return ['all', ...Array.from(categories).sort()];
  }, [projects]);

  const filteredProjects = useCallback(() => {
    if (activeCategory === 'all') {
      return projects;
    }
    return projects.filter(project => project.category === activeCategory);
  }, [projects, activeCategory]);

  const setCategory = useCallback((category: string): void => {
    const available = availableCategories();
    if (available.includes(category)) {
      setActiveCategory(category);
    } else {
      console.warn(`useProjectFilter: Category "${category}" not available. Available categories:`, available);
    }
  }, [availableCategories]);

  const resetFilter = useCallback((): void => {
    setActiveCategory(defaultCategory);
  }, [defaultCategory]);

  return {
    activeCategory,
    filteredProjects: filteredProjects(),
    availableCategories: availableCategories(),
    setCategory,
    resetFilter,
  } as const;
}

/**
 * Custom hook for managing modal/overlay state with strict typing
 */
export function useModal(): UseModalReturn {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = useCallback((): void => {
    setIsOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    // Emit custom event for modal open
    window.dispatchEvent(new CustomEvent('modal:open'));
  }, []);

  const closeModal = useCallback((): void => {
    setIsOpen(false);
    // Restore body scroll
    document.body.style.overflow = 'unset';
    // Emit custom event for modal close
    window.dispatchEvent(new CustomEvent('modal:close'));
  }, []);

  const toggleModal = useCallback((): void => {
    if (isOpen) {
      closeModal();
    } else {
      openModal();
    }
  }, [isOpen, openModal, closeModal]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, closeModal]);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  } as const;
}

/**
 * Custom hook for managing async operations with strict typing
 */
export function useAsync<T, E = Error>(): {
  readonly state: AsyncState<T>;
  readonly execute: (asyncFn: () => Promise<T>) => Promise<T | null>;
  readonly reset: () => void;
  readonly loadingState: LoadingState;
} {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
    lastUpdated: null,
  });

  const execute = useCallback(async (asyncFn: () => Promise<T>): Promise<T | null> => {
    setState(prev => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const result = await asyncFn();
      setState({
        data: result,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      });
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setState({
        data: null,
        loading: false,
        error: errorMessage,
        lastUpdated: new Date(),
      });
      return null;
    }
  }, []);

  const reset = useCallback((): void => {
    setState({
      data: null,
      loading: false,
      error: null,
      lastUpdated: null,
    });
  }, []);

  const loadingState: LoadingState = state.loading
    ? 'loading'
    : state.error
    ? 'error'
    : state.data
    ? 'success'
    : 'idle';

  return {
    state,
    execute,
    reset,
    loadingState,
  } as const;
}

/**
 * Custom hook for debouncing values with strict typing
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Custom hook for managing local storage with strict typing
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): readonly [T, (value: T | ((val: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue;
      }
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`useLocalStorage: Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`useLocalStorage: Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`useLocalStorage: Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
}

/**
 * Custom hook for error boundary integration
 */
export function useErrorBoundaryState() {
  const [errorBoundaryKey, setErrorBoundaryKey] = useState<number>(0);

  const resetErrorBoundary = useCallback(() => {
    setErrorBoundaryKey(prev => prev + 1);
  }, []);

  return {
    errorBoundaryKey,
    resetErrorBoundary,
  } as const;
}

/**
 * Custom hook for safe async operations with error boundaries
 */
export function useSafeAsync<T, E = Error>(): {
  readonly state: AsyncState<T>;
  readonly execute: (asyncFn: () => Promise<T>) => Promise<T | null>;
  readonly reset: () => void;
  readonly loadingState: LoadingState;
  readonly errorBoundaryKey: number;
} {
  const asyncHook = useAsync<T, E>();
  const { errorBoundaryKey, resetErrorBoundary } = useErrorBoundaryState();

  // Reset error boundary when async operation fails
  useEffect(() => {
    if (asyncHook.state.error) {
      resetErrorBoundary();
    }
  }, [asyncHook.state.error, resetErrorBoundary]);

  return {
    ...asyncHook,
    errorBoundaryKey,
  } as const;
}
