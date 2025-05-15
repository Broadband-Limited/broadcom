import React, { ChangeEvent, forwardRef, ReactNode } from 'react';

export interface InputProps {
  /** Specifies the file types the file input should accept */
  accept?: string;
  type?:
    | 'text'
    | 'number'
    | 'email'
    | 'password'
    | 'tel'
    | 'textarea'
    | 'date'
    | 'file'
    | 'checkbox';
  label: string | ReactNode;
  name: string;
  value?: string | number | boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  min?: number | string;
  max?: number | string;
  rows?: number;
  error?: string;
  checked?: boolean;
  rightElement?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      type = 'text',
      label,
      name,
      value,
      onChange,
      placeholder = '',
      id,
      required = false,
      disabled = false,
      className = '',
      labelClassName = '',
      inputClassName = '',
      min,
      max,
      rows = 3,
      error,
      checked,
      rightElement,
      ...rest
    },
    ref
  ) => {
    const inputId = id || name;

    // Default classes that match the existing form styling
    const defaultInputClass =
      type !== 'checkbox'
        ? 'w-full p-3 border border-foreground/10 focus:outline-none focus:border-foreground/50 transition-all duration-300'
        : 'h-4 w-4 accent-foreground text-primary focus:ring-primary border-background';

    const defaultLabelClass =
      type !== 'checkbox'
        ? 'block text-sm font-medium text-foreground/50 mb-1'
        : 'ml-2 block text-sm text-foreground/50';

    const wrapperClass = type === 'checkbox' ? 'flex items-center' : 'mb-4';

    // Build input JSX based on type
    const inputElement =
      type === 'textarea' ? (
        <textarea
          ref={ref as React.RefObject<HTMLTextAreaElement>}
          id={inputId}
          name={name}
          value={value as string | number}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          rows={rows}
          className={`${defaultInputClass} ${
            error ? 'border-red-500' : ''
          } ${inputClassName}`}
          {...rest}
        />
      ) : (
        <input
          ref={ref as React.RefObject<HTMLInputElement>}
          type={type}
          id={inputId}
          name={name}
          {...(type !== 'checkbox' && type !== 'file'
            ? { value: value as string | number }
            : {})}
          {...(type === 'checkbox' ? { checked: checked || false } : {})}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          min={min}
          max={max}
          className={`${defaultInputClass} ${
            error ? 'border-red-500' : ''
          } ${inputClassName}`}
          {...rest}
        />
      );

    return (
      <div className={`${wrapperClass} ${className}`}>
        {type === 'checkbox' ? (
          <>
            {inputElement}
            <label
              htmlFor={inputId}
              className={`${defaultLabelClass} ${labelClassName}`}>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor={inputId}
                className={`${defaultLabelClass} ${labelClassName}`}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {rightElement}
            </div>
            {inputElement}
          </>
        )}

        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
