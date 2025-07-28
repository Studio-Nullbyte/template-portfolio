"use client";

import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import {
  ComponentErrorBoundary,
  SectionErrorBoundary,
  AsyncErrorBoundary,
  useErrorHandler
} from '@/components/error-boundaries';

// Component that throws errors for testing
function ErrorThrowingComponent({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('Test error from component');
  }
  return <div className="p-4 bg-green-100 dark:bg-green-900 rounded">Component working correctly!</div>;
}

// Async component that can fail
function AsyncComponent({ shouldFail }: { shouldFail: boolean }) {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (shouldFail) {
        throw new Error('Network error: Failed to fetch data');
      }
      setData('Data loaded successfully!');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  return (
    <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded">
      {data ? (
        <p>{data}</p>
      ) : (
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
        >
          Load Data
        </button>
      )}
    </div>
  );
}

// Manual error trigger component
function ManualErrorComponent() {
  const handleError = useErrorHandler();

  const triggerError = () => {
    handleError(new Error('Manually triggered error'));
  };

  return (
    <button
      onClick={triggerError}
      className="px-4 py-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90"
    >
      Trigger Error
    </button>
  );
}

export default function ErrorBoundaryDemo() {
  const [showComponentError, setShowComponentError] = useState(false);
  const [showAsyncError, setShowAsyncError] = useState(false);

  return (
    <div className="pt-16 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              Error Boundary Demo
            </h1>
            <p className="text-lg text-muted-foreground">
              Demonstration of React Error Boundaries in action. Test different error scenarios to see how they&apos;re handled gracefully.
            </p>
          </div>

          {/* Section Error Boundary Demo */}
          <SectionErrorBoundary sectionName="Component Error Demo">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Component Error Boundary</h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowComponentError(!showComponentError)}
                  className={`px-4 py-2 rounded font-medium transition-colors ${
                    showComponentError
                      ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {showComponentError ? 'Hide Error' : 'Show Component Error'}
                </button>
              </div>

              <ComponentErrorBoundary componentName="Test Component">
                <ErrorThrowingComponent shouldThrow={showComponentError} />
              </ComponentErrorBoundary>
            </div>
          </SectionErrorBoundary>

          {/* Async Error Boundary Demo */}
          <SectionErrorBoundary sectionName="Async Error Demo">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Async Error Boundary</h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowAsyncError(!showAsyncError)}
                  className={`px-4 py-2 rounded font-medium transition-colors ${
                    showAsyncError
                      ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {showAsyncError ? 'Disable Async Error' : 'Enable Async Error'}
                </button>
              </div>

              <AsyncErrorBoundary resetKeys={[String(showAsyncError)]}>
                <AsyncComponent shouldFail={showAsyncError} />
              </AsyncErrorBoundary>
            </div>
          </SectionErrorBoundary>

          {/* Manual Error Trigger Demo */}
          <SectionErrorBoundary sectionName="Manual Error Demo">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Manual Error Trigger</h2>
              <p className="text-muted-foreground">
                Use the useErrorHandler hook to manually trigger error boundaries.
              </p>

              <ComponentErrorBoundary componentName="Manual Error Test">
                <ManualErrorComponent />
              </ComponentErrorBoundary>
            </div>
          </SectionErrorBoundary>

          {/* Error Boundary Features */}
          <div className="bg-muted/50 rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
              <AlertTriangle className="h-6 w-6" />
              Error Boundary Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Built-in Features:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>Graceful error fallback UI</li>
                  <li>Error logging and reporting</li>
                  <li>Retry mechanisms</li>
                  <li>Reset on prop changes</li>
                  <li>Keyboard escape handling</li>
                  <li>Accessibility compliant</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Error Boundary Types:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>Page-level boundaries</li>
                  <li>Section-level boundaries</li>
                  <li>Component-level boundaries</li>
                  <li>Async operation boundaries</li>
                  <li>HOC wrapper boundaries</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
