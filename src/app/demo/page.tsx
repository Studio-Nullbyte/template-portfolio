"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Image as ImageIcon } from "lucide-react";
import {
  PageErrorBoundary,
  SectionErrorBoundary,
  ComponentErrorBoundary
} from "@/components/error-boundaries";
import { SafeImage, Avatar, ProjectImage } from "@/components/ui/SafeImage";

// Component that throws an error on demand
function ErrorThrowingComponent({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error("This is a test error for demonstrating error boundaries!");
  }

  return (
    <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
      <p className="text-green-800 dark:text-green-200">
        ✅ This component is working correctly!
      </p>
    </div>
  );
}

// Component with async error simulation
function AsyncErrorComponent({ shouldFail }: { shouldFail: boolean }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAsyncOperation = async () => {
    setLoading(true);
    setError(null);

    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (shouldFail) {
      setError("Async operation failed!");
    } else {
      setError(null);
    }

    setLoading(false);
  };

  if (error) {
    throw new Error(error);
  }

  return (
    <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
      <button
        onClick={handleAsyncOperation}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 flex items-center gap-2"
      >
        {loading && <RefreshCw className="w-4 h-4 animate-spin" />}
        {loading ? "Loading..." : "Test Async Operation"}
      </button>
      {!loading && !error && (
        <p className="mt-2 text-blue-800 dark:text-blue-200">
          Async operation completed successfully!
        </p>
      )}
    </div>
  );
}

export default function DemoPage() {
  const [throwError, setThrowError] = useState(false);
  const [throwAsyncError, setThrowAsyncError] = useState(false);

  return (
    <PageErrorBoundary>
      <div className="min-h-screen py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">
              Error Boundaries & Image Components Demo
            </h1>
            <p className="text-lg text-muted-foreground">
              Test error handling and image fallback functionality
            </p>
          </motion.div>

          {/* Error Boundary Testing Section */}
          <SectionErrorBoundary sectionName="Error Testing">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-12 p-6 bg-card rounded-lg"
            >
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                Error Boundary Testing
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Synchronous Error Testing */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Synchronous Errors</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <input
                      type="checkbox"
                      id="throwError"
                      checked={throwError}
                      onChange={(e) => setThrowError(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label htmlFor="throwError" className="text-sm">
                      Throw test error
                    </label>
                  </div>

                  <ComponentErrorBoundary componentName="Test Component">
                    <ErrorThrowingComponent shouldThrow={throwError} />
                  </ComponentErrorBoundary>
                </div>

                {/* Asynchronous Error Testing */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Asynchronous Errors</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <input
                      type="checkbox"
                      id="throwAsyncError"
                      checked={throwAsyncError}
                      onChange={(e) => setThrowAsyncError(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label htmlFor="throwAsyncError" className="text-sm">
                      Make async operation fail
                    </label>
                  </div>

                  <ComponentErrorBoundary componentName="Async Component">
                    <AsyncErrorComponent shouldFail={throwAsyncError} />
                  </ComponentErrorBoundary>
                </div>
              </div>
            </motion.section>
          </SectionErrorBoundary>

          {/* Image Components Testing Section */}
          <SectionErrorBoundary sectionName="Image Testing">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 bg-card rounded-lg"
            >
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <ImageIcon className="w-6 h-6" />
                Image Components Testing
              </h2>

              <div className="grid gap-8 md:grid-cols-3">
                {/* SafeImage Component */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">SafeImage Component</h3>
                  <ComponentErrorBoundary componentName="SafeImage Test">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Working image:
                        </p>
                        <SafeImage
                          src="https://picsum.photos/200/150?random=1"
                          alt="Test image"
                          width={200}
                          height={150}
                          className="rounded-lg"
                        />
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Broken image (will show fallback):
                        </p>
                        <SafeImage
                          src="https://broken-url-that-will-404.com/image.jpg"
                          alt="Broken image test"
                          width={200}
                          height={150}
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  </ComponentErrorBoundary>
                </div>

                {/* Avatar Component */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Avatar Component</h3>
                  <ComponentErrorBoundary componentName="Avatar Test">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Generated avatar:
                        </p>
                        <Avatar
                          name="John Doe"
                          size={80}
                        />
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Avatar with broken src (fallback):
                        </p>
                        <Avatar
                          src="https://broken-avatar-url.com/avatar.jpg"
                          name="Jane Smith"
                          size={80}
                        />
                      </div>
                    </div>
                  </ComponentErrorBoundary>
                </div>

                {/* ProjectImage Component */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">ProjectImage Component</h3>
                  <ComponentErrorBoundary componentName="ProjectImage Test">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Working project image:
                        </p>
                        <div className="relative w-48 h-32">
                          <ProjectImage
                            src="https://picsum.photos/400/300?random=2"
                            title="Test Project"
                            fill
                            className="rounded-lg object-cover"
                          />
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Broken project image (fallback):
                        </p>
                        <div className="relative w-48 h-32">
                          <ProjectImage
                            src="https://broken-project-image.com/project.jpg"
                            title="Broken Project Test"
                            fill
                            className="rounded-lg object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </ComponentErrorBoundary>
                </div>
              </div>
            </motion.section>
          </SectionErrorBoundary>
        </div>
      </div>
    </PageErrorBoundary>
  );
}
