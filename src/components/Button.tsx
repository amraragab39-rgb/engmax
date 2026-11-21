import React from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const variants: Record<string, string> = {
  primary:
    'bg-engmax-brand text-white shadow-sm hover:bg-engmax-brand-hover active:scale-95 disabled:opacity-60 disabled:pointer-events-none transition-transform duration-200',
  secondary:
    'bg-engmax-bg-secondary text-engmax-text border border-engmax-border hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95 disabled:opacity-60 transition-colors duration-200',
  outline:
    'border border-engmax-border text-engmax-text hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95 disabled:opacity-60 transition-colors duration-200',
  ghost:
    'text-engmax-text-secondary hover:bg-engmax-bg-secondary active:scale-95 disabled:opacity-60 transition-colors duration-200',
  danger:
    'bg-engmax-error text-white hover:bg-c62828 active:scale-95 disabled:opacity-60 disabled:pointer-events-none transition-colors duration-200',
};

const sizes: Record<string, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-4 text-base',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', fullWidth = false, size = 'md', loading, children, className = '', disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 touch-manipulation ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span
            className="inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin mr-1.5"
            style={{ animation: 'spin 1s linear infinite' }}
          />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
