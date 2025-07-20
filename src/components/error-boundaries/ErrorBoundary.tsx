"use client";

import React, { Component, ReactNode, ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

// Error boundary state interface
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
}

// Error boundary props interface
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: Array<string | number>;
  resetOnPropsChange?: boolean;
  level?: 'page' | 'section' | 'component';
  name?: string;
}

// Error details for logging
interface ErrorDetails {
  message: string;
  stack?: string;
  componentStack: string;
  timestamp: Date;
  userAgent: string;
  url: string;
  userId?: string;
  sessionId?: string;
}

/**
 * Generic Error Boundary Component with strict typing
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private resetTimeoutId: number | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Generate unique error ID for tracking
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      hasError: true,
      error,
      errorId,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const { onError, name = 'Unknown' } = this.props;
    
    // Create detailed error object
    const errorDetails: ErrorDetails = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // Update state with error info
    this.setState({ errorInfo });

    // Log error details
    console.error(`Error Boundary (${name}) caught an error:`, {
      error,
      errorInfo,
      errorDetails,
    });

    // Call custom error handler if provided
    if (onError) {
      try {
        onError(error, errorInfo);
      } catch (handlerError) {
        console.error('Error in custom error handler:', handlerError);
      }
    }

    // Send error to monitoring service (in production)
    if (process.env.NODE_ENV === 'production') {
      this.reportError(errorDetails);
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    const { resetKeys, resetOnPropsChange } = this.props;
    const { hasError } = this.state;

    // Reset error boundary when resetKeys change
    if (hasError && resetKeys) {
      const hasResetKeyChanged = resetKeys.some(
        (key, index) => key !== prevProps.resetKeys?.[index]
      );
      
      if (hasResetKeyChanged) {
        this.resetErrorBoundary();
      }
    }

    // Reset when any prop changes (if enabled)
    if (hasError && resetOnPropsChange && prevProps !== this.props) {
      this.resetErrorBoundary();
    }
  }

  componentWillUnmount(): void {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
  }

  private reportError = async (errorDetails: ErrorDetails): Promise<void> => {
    try {
      // In a real application, send to error monitoring service
      // await fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorDetails),
      // });
      
      console.log('Error reported:', errorDetails);
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
    }
  };

  private resetErrorBoundary = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
    });
  };

  private handleRetry = (): void => {
    this.resetErrorBoundary();
  };

  private handleReload = (): void => {
    window.location.reload();
  };

  private handleGoHome = (): void => {
    window.location.href = '/';
  };

  private renderErrorFallback(): ReactNode {
    const { error, errorId } = this.state;
    const { level = 'component', name = 'Component' } = this.props;

    const errorTitle = {
      page: 'Page Error',
      section: 'Section Error',
      component: 'Component Error',
    }[level];

    return (
      <div className="flex flex-col items-center justify-center p-8 min-h-[200px] bg-background border border-destructive/20 rounded-lg">
        <div className="flex items-center space-x-2 mb-4">
          <AlertTriangle className="h-8 w-8 text-destructive" />
          <h2 className="text-xl font-semibold text-foreground">
            {errorTitle}
          </h2>
        </div>
        
        <div className="text-center space-y-4 max-w-md">
          <p className="text-muted-foreground">
            Something went wrong in the {name.toLowerCase()}. We've logged the error and our team has been notified.
          </p>
          
          {process.env.NODE_ENV === 'development' && error && (
            <details className="text-left bg-muted p-4 rounded border">
              <summary className="cursor-pointer font-medium text-sm mb-2">
                Error Details (Development Only)
              </summary>
              <pre className="text-xs text-destructive overflow-auto max-h-32">
                {error.message}
                {error.stack}
              </pre>
              <p className="text-xs text-muted-foreground mt-2">
                Error ID: {errorId}
              </p>
            </details>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={this.handleRetry}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
            
            {level === 'page' && (
              <>
                <button
                  onClick={this.handleReload}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md font-medium transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reload Page
                </button>
                
                <button
                  onClick={this.handleGoHome}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-muted text-muted-foreground hover:bg-muted/80 rounded-md font-medium transition-colors"
                >
                  <Home className="h-4 w-4" />
                  Go Home
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  render(): ReactNode {
    const { hasError } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      // Use custom fallback if provided, otherwise use default
      return fallback || this.renderErrorFallback();
    }

    return children;
  }
}
