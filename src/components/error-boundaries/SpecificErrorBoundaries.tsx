import React, { ReactNode, ReactElement } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

// Specific error boundary props
interface PageErrorBoundaryProps {
  children: ReactNode;
  pageName?: string;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface SectionErrorBoundaryProps {
  children: ReactNode;
  sectionName?: string;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ComponentErrorBoundaryProps {
  children: ReactNode;
  componentName?: string;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface AsyncErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  resetKeys?: Array<string | number>;
}

/**
 * Page-level error boundary for catching errors across entire pages
 */
export function PageErrorBoundary({
  children,
  pageName = 'Page',
  onError
}: PageErrorBoundaryProps): ReactElement {
  return (
    <ErrorBoundary
      level="page"
      name={pageName}
      onError={onError}
      resetOnPropsChange={false}
    >
      {children}
    </ErrorBoundary>
  );
}

/**
 * Section-level error boundary for catching errors in page sections
 */
export function SectionErrorBoundary({
  children,
  sectionName = 'Section',
  onError
}: SectionErrorBoundaryProps): ReactElement {
  const fallback = (
    <div className="flex flex-col items-center justify-center p-6 min-h-[150px] bg-muted/50 border border-border rounded-lg">
      <p className="text-muted-foreground text-center">
        Unable to load {sectionName.toLowerCase()}. Please refresh the page or try again later.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-3 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium transition-colors"
      >
        Refresh Page
      </button>
    </div>
  );

  return (
    <ErrorBoundary
      level="section"
      name={sectionName}
      onError={onError}
      fallback={fallback}
      resetOnPropsChange={true}
    >
      {children}
    </ErrorBoundary>
  );
}

/**
 * Component-level error boundary for catching errors in individual components
 */
export function ComponentErrorBoundary({
  children,
  componentName = 'Component',
  onError
}: ComponentErrorBoundaryProps): ReactElement {
  const fallback = (
    <div className="flex items-center justify-center p-4 bg-muted/30 border border-dashed border-border rounded">
      <p className="text-sm text-muted-foreground">
        {componentName} unavailable
      </p>
    </div>
  );

  return (
    <ErrorBoundary
      level="component"
      name={componentName}
      onError={onError}
      fallback={fallback}
      resetOnPropsChange={true}
    >
      {children}
    </ErrorBoundary>
  );
}

/**
 * Async error boundary for components that handle async operations
 */
export function AsyncErrorBoundary({
  children,
  fallback,
  onError,
  resetKeys = []
}: AsyncErrorBoundaryProps): ReactElement {
  const defaultFallback = (
    <div className="flex flex-col items-center justify-center p-6 min-h-[100px] bg-background border border-border rounded-lg">
      <p className="text-muted-foreground text-center mb-3">
        Failed to load content. This might be due to a network issue.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-3 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded text-sm font-medium transition-colors"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <ErrorBoundary
      level="component"
      name="Async Component"
      onError={onError}
      fallback={fallback || defaultFallback}
      resetKeys={resetKeys}
      resetOnPropsChange={true}
    >
      {children}
    </ErrorBoundary>
  );
}

/**
 * Higher-order component for wrapping components with error boundaries
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Partial<ComponentErrorBoundaryProps>
) {
  const WrappedComponent = (props: P) => (
    <ComponentErrorBoundary
      componentName={Component.displayName || Component.name || 'Component'}
      {...errorBoundaryProps}
    >
      <Component {...props} />
    </ComponentErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name || 'Component'})`;

  return WrappedComponent;
}

/**
 * Hook for manually triggering error boundaries (for testing or debugging)
 */
export function useErrorHandler() {
  return React.useCallback((error: Error) => {
    // Throwing an error will be caught by the nearest error boundary
    throw error;
  }, []);
}

/**
 * Error boundary context for sharing error state across components
 */
const ErrorBoundaryContext = React.createContext<{
  hasError: boolean;
  retry: () => void;
} | null>(null);

export function useErrorBoundaryContext() {
  const context = React.useContext(ErrorBoundaryContext);
  if (!context) {
    console.warn('useErrorBoundaryContext must be used within an ErrorBoundary');
  }
  return context;
}
