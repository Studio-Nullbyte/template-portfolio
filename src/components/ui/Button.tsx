import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { ButtonProps, ForwardedRef } from '@/types';

// Button variant styles using discriminated union
const getButtonStyles = (props: ButtonProps): string => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  const sizeStyles = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-11 px-8 text-lg'
  };
  
  const size = 'size' in props ? props.size || 'md' : 'md';
  
  switch (props.variant) {
    case 'primary':
      return cn(
        baseStyles,
        'bg-primary text-primary-foreground hover:bg-primary/90',
        sizeStyles[size]
      );
    
    case 'secondary':
      return cn(
        baseStyles,
        'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        sizeStyles[size]
      );
    
    case 'outline':
      return cn(
        baseStyles,
        'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        sizeStyles[size]
      );
    
    case 'ghost':
      return cn(
        baseStyles,
        'hover:bg-accent hover:text-accent-foreground',
        sizeStyles[size]
      );
    
    case 'destructive':
      return cn(
        baseStyles,
        'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        sizeStyles[size]
      );
  }
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref: ForwardedRef<HTMLButtonElement>) => {
    const { children, className, disabled, loading, onClick, ...buttonProps } = props;
    
    // Handle destructive variant confirmation
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (props.variant === 'destructive' && props.confirmText && !disabled && !loading) {
        const confirmed = window.confirm(props.confirmText);
        if (!confirmed) {
          event.preventDefault();
          return;
        }
      }
      
      onClick?.(event);
    };
    
    const buttonStyles = getButtonStyles(props);
    
    return (
      <button
        ref={ref}
        className={cn(buttonStyles, className)}
        disabled={disabled || loading}
        onClick={handleClick}
        {...('type' in buttonProps ? { type: buttonProps.type } : { type: 'button' })}
      >
        {loading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
