import { useState, useCallback } from 'react';
import type {
  ContactForm,
  UseFormValidationReturn,
  ValidationError,
  FormValidationResult
} from '@/types';

/**
 * Generic form validation hook with strict typing
 */
export function useFormValidation<T>(
  initialValues: T,
  validationRules: Record<keyof T, (value: T[keyof T]) => string | null>
): UseFormValidationReturn<T> {
  const [formData, setFormData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [touchedFields, setTouchedFields] = useState<Partial<Record<keyof T, boolean>>>({});

  const validateField = useCallback((field: keyof T, value: T[keyof T]): string | null => {
    const rule = validationRules[field];
    return rule ? rule(value) : null;
  }, [validationRules]);

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof T>).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [formData, validateField]);

  const handleChange = useCallback((field: keyof T, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const handleBlur = useCallback((field: keyof T): void => {
    setTouchedFields(prev => ({ ...prev, [field]: true }));

    // Validate field on blur
    const error = validateField(field, formData[field]);
    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  }, [formData, validateField]);

  const resetForm = useCallback((): void => {
    setFormData(initialValues);
    setErrors({});
    setIsSubmitting(false);
    setTouchedFields({});
  }, [initialValues]);

  const setFieldError = useCallback((field: keyof T, error: string): void => {
    setErrors(prev => ({ ...prev, [field]: error }));
  }, []);

  const clearFieldError = useCallback((field: keyof T): void => {
    setErrors(prev => ({ ...prev, [field]: undefined }));
  }, []);

  const isValid = Object.keys(errors).length === 0;
  const isDirty = JSON.stringify(formData) !== JSON.stringify(initialValues);

  return {
    formData,
    errors,
    isSubmitting,
    isValid,
    isDirty,
    touchedFields,
    setIsSubmitting,
    handleChange,
    handleBlur,
    validateForm,
    validateField: (field: keyof T) => !validateField(field, formData[field]),
    resetForm,
    setFieldError,
    clearFieldError,
  } as const;
}

/**
 * Strict validation rules for contact form with detailed error codes
 */
const contactFormValidation: Record<keyof ContactForm, (value: string) => string | null> = {
  name: (value: string) => {
    if (!value.trim()) return 'Please enter your name.';
    if (value.trim().length < 2) return 'Name must be at least 2 characters.';
    if (value.trim().length > 50) return 'Name must be less than 50 characters.';
    return null;
  },
  email: (value: string) => {
    if (!value.trim()) return 'Please enter your email address.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Please enter a valid email address.';
    if (value.length > 100) return 'Email must be less than 100 characters.';
    return null;
  },
  subject: (value: string) => {
    if (!value.trim()) return 'Please enter a subject.';
    if (value.trim().length < 3) return 'Subject must be at least 3 characters.';
    if (value.trim().length > 100) return 'Subject must be less than 100 characters.';
    return null;
  },
  message: (value: string) => {
    if (!value.trim()) return 'Please enter your message.';
    if (value.trim().length < 10) return 'Message must be at least 10 characters.';
    if (value.trim().length > 1000) return 'Message must be less than 1000 characters.';
    return null;
  },
} as const;

/**
 * Pre-configured contact form hook with strict typing
 */
export function useContactForm(): UseFormValidationReturn<ContactForm> {
  const initialValues: ContactForm = {
    name: '',
    email: '',
    subject: '',
    message: '',
  } as const;

  return useFormValidation(initialValues, contactFormValidation);
}

/**
 * Contact form validation function that returns detailed results
 */
export function validateContactForm(data: ContactForm): FormValidationResult {
  const errors: ValidationError[] = [];

  (Object.keys(data) as Array<keyof ContactForm>).forEach((field) => {
    const validator = contactFormValidation[field];
    const error = validator(data[field]);

    if (error) {
      let code: ValidationError['code'] = 'invalid_format';

      if (error.includes('enter')) code = 'required';
      else if (error.includes('at least')) code = 'too_short';
      else if (error.includes('less than')) code = 'too_long';

      errors.push({
        field,
        message: error,
        code,
      });
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  } as const;
}
