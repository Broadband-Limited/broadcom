import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  target?: string;
  variant?: 'primary' | 'outline' | 'danger';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      href,
      target,
      variant = 'primary',
      size = 'default',
      className = '',
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'flex items-center justify-center font-medium rounded-xs transition-colors outline-none focus:outline-none cursor-pointer';

    const variantStyles: Record<string, string> = {
      primary: 'bg-dark-blue text-background hover:bg-dark-blue/90',
      outline:
        'bg-transparent border border-dark-blue text-foreground hover:bg-dark-blue/20',
      danger: 'bg-red-500 text-background hover:bg-red-600',
    };

    const sizeStyles: Record<string, string> = {
      sm: 'text-sm px-3 py-1',
      default: 'text-base px-4 py-2',
      lg: 'text-lg px-6 py-3',
    };

    const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    if (href) {
      return (
        <Link href={href} target={target}>
          <button ref={ref} type={type} className={buttonStyles} {...props}>
            {children}
          </button>
        </Link>
      );
    }

    return (
      <button ref={ref} type={type} className={buttonStyles} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
