import { forwardRef } from 'react';
import { cn } from "@/lib/utils";
import type { FormFieldProps, ForwardedRef } from "@/types";

const getFieldComponent = (props: FormFieldProps) => {
  if (props.type === 'textarea') {
    return 'textarea' as const;
  }
  return 'input' as const;
};

const getInputProps = (props: FormFieldProps) => {
  const baseProps = {
    id: props.name,
    name: props.name,
    value: props.value,
    placeholder: props.placeholder,
    disabled: props.disabled,
    required: props.required,
    'aria-describedby': props.error ? `${props.name}-error` : props['aria-describedby'],
    'aria-invalid': !!props.error,
  };

  switch (props.type) {
    case 'text':
    case 'email':
    case 'password':
    case 'tel':
    case 'url':
      return {
        ...baseProps,
        type: props.type,
        maxLength: props.maxLength,
        pattern: props.pattern,
      };

    case 'number':
      return {
        ...baseProps,
        type: 'number',
        min: props.min,
        max: props.max,
        step: props.step,
      };

    case 'textarea':
      return {
        ...baseProps,
        rows: props.rows || 4,
        cols: props.cols,
        maxLength: props.maxLength,
      };
  }
};

export const FormField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormFieldProps
>((props, ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>) => {
  const {
    label,
    name,
    onChange,
    error,
    required = false,
    className,
  } = props;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(name, e.target.value);
  };

  const fieldClasses = cn(
    "w-full px-3 py-2 border rounded-md transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
    error
      ? "border-red-500 focus:ring-red-500"
      : "border-input bg-background hover:border-accent-foreground/20",
    className
  );

  const inputProps = getInputProps(props);
  const Component = getFieldComponent(props);

  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-foreground"
      >
        {label}
        {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
      </label>

      {Component === 'textarea' ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          {...(inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          onChange={handleChange}
          className={fieldClasses}
        />
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
          onChange={handleChange}
          className={fieldClasses}
        />
      )}

      {error && (
        <p id={`${name}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

FormField.displayName = 'FormField';
