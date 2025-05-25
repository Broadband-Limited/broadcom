import React, { ButtonHTMLAttributes } from 'react';
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

const Button: React.FC<ButtonProps> = ({
  children,
  href,
  target,
  variant = 'primary',
  size = 'default',
  className = '',
  type = 'button',
  ...props
}) => {
  // Define base styles
  const baseStyles =
    'flex items-center justify-center font-medium rounded-none transition-colors outline-none focus:outline-none cursor-pointer';

  // Define variant styles
  const variantStyles = {
    primary: 'bg-dark-blue text-background hover:bg-dark-blue/90',
    outline:
      'bg-transparent border border-dark-blue text-foreground hover:bg-dark-blue/20',
    danger: 'bg-red-500 text-background hover:bg-red-600',
  };

  // Define size styles
  const sizeStyles = {
    sm: 'text-sm px-3 py-1',
    default: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };

  // Combine styles
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  // If href is provided, render as Link
  if (href) {
    return (
      <Link href={href} target={target}>
        <button
          type={type}
          className={buttonStyles}
          
          {...props}>
          {children}
        </button>
      </Link>
    );
  }

  // Otherwise, render as button
  return (
    <button type={type} className={buttonStyles}  {...props}>
      {children}
    </button>
  );
};

export default Button;
