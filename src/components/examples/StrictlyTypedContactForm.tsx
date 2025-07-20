import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/forms/FormField';
import { useContactForm, useAsync } from '@/hooks';
import type { 
  ContactForm, 
  ApiResponse, 
  ButtonClickHandler,
  FormSubmitHandler 
} from '@/types';

/**
 * Example component demonstrating strict typing with discriminated unions
 */
export function StrictlyTypedContactForm() {
  // Using strictly typed form hook
  const {
    formData,
    errors,
    isSubmitting,
    isValid,
    isDirty,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setIsSubmitting,
  } = useContactForm();

  // Using strictly typed async hook
  const {
    state: { data, loading, error },
    execute: submitForm,
    loadingState,
  } = useAsync<ApiResponse<{ message: string }>>();

  // Strictly typed event handlers
  const handleSubmit: FormSubmitHandler<ContactForm> = async (event, data) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitForm(async () => {
        // Simulate API call
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        
        if (!response.ok) {
          throw new Error('Failed to submit form');
        }
        
        return response.json();
      });

      if (result?.success) {
        resetForm();
        // Handle success
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset: ButtonClickHandler = (event) => {
    event.preventDefault();
    resetForm();
  };

  const handleCancel: ButtonClickHandler = (event) => {
    event.preventDefault();
    if (isDirty) {
      const confirmed = window.confirm('You have unsaved changes. Are you sure you want to cancel?');
      if (confirmed) {
        resetForm();
      }
    }
  };

  return (
    <form 
      onSubmit={(e) => handleSubmit(e, formData)}
      className="max-w-md mx-auto space-y-6 p-6 bg-card rounded-lg border"
      noValidate
    >
      <h2 className="text-2xl font-semibold text-foreground mb-6">
        Contact Form
      </h2>

      {/* Strictly typed form fields with discriminated unions */}
      <FormField
        type="text"
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
        maxLength={50}
        placeholder="Your full name"
      />

      <FormField
        type="email"
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
        maxLength={100}
        placeholder="your.email@example.com"
      />

      <FormField
        type="text"
        label="Subject"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        error={errors.subject}
        required
        maxLength={100}
        placeholder="What's this about?"
      />

      <FormField
        type="textarea"
        multiline={true}
        rows={6}
        label="Message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
        required
        maxLength={1000}
        placeholder="Tell me about your project..."
      />

      {/* Display API errors */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        </div>
      )}

      {/* Display success message */}
      {data?.success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-600">
            {data.data.message}
          </p>
        </div>
      )}

      {/* Strictly typed buttons with discriminated unions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="primary"
          type="submit"
          size="md"
          disabled={!isValid || isSubmitting}
          loading={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>

        <Button
          variant="outline"
          type="button"
          size="md"
          onClick={handleReset}
          disabled={isSubmitting || !isDirty}
        >
          Reset
        </Button>

        <Button
          variant="ghost"
          type="button"
          size="md"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>

      {/* Form state indicators */}
      <div className="text-sm text-muted-foreground space-y-1">
        <p>Form Status: {loadingState}</p>
        <p>Valid: {isValid ? '✅' : '❌'}</p>
        <p>Dirty: {isDirty ? '📝' : '✨'}</p>
        <p>Submitting: {isSubmitting ? '⏳' : '⭕'}</p>
      </div>
    </form>
  );
}
