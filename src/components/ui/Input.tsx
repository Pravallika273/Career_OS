import React, { useId } from 'react';
import { Search, X, AlertCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      error,
      leftIcon,
      rightIcon,
      id,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-[#101828] uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-[#98A2B3] pointer-events-none flex items-center">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            className={`w-full rounded-lg bg-white border text-sm text-[#101828] placeholder:text-[#98A2B3] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#5B5BD6] focus:border-[#5B5BD6] disabled:bg-[#F8F8F5] disabled:cursor-not-allowed ${
              leftIcon ? 'pl-9' : 'pl-3.5'
            } ${rightIcon ? 'pr-9' : 'pr-3.5'} py-2.5 ${
              error
                ? 'border-[#F26B5B] focus:ring-[#F26B5B] focus:border-[#F26B5B]'
                : 'border-[#E8E6DF] hover:border-[#D3D0C6]'
            } ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 text-[#98A2B3] flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="flex items-center gap-1.5 text-xs text-[#F26B5B] font-medium">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        ) : hint ? (
          <p className="text-xs text-[#667085]">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export interface SearchInputProps extends Omit<InputProps, 'leftIcon' | 'rightIcon'> {
  onClear?: () => void;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onClear, onChange, placeholder = 'Search...', className = '', ...props }, ref) => {
    const hasValue = Boolean(value);

    return (
      <Input
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        leftIcon={<Search className="w-4 h-4" />}
        rightIcon={
          hasValue && onClear ? (
            <button
              type="button"
              onClick={onClear}
              className="p-0.5 rounded text-[#98A2B3] hover:text-[#101828] transition-colors"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : undefined
        }
        className={className}
        {...props}
      />
    );
  }
);

SearchInput.displayName = 'SearchInput';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, id, className = '', disabled, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id || generatedId;

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-semibold text-[#101828] uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          disabled={disabled}
          className={`w-full rounded-lg bg-white border text-sm text-[#101828] placeholder:text-[#98A2B3] transition-all duration-150 p-3 min-h-[96px] focus:outline-none focus:ring-2 focus:ring-[#5B5BD6] focus:border-[#5B5BD6] disabled:bg-[#F8F8F5] disabled:cursor-not-allowed ${
            error
              ? 'border-[#F26B5B] focus:ring-[#F26B5B] focus:border-[#F26B5B]'
              : 'border-[#E8E6DF] hover:border-[#D3D0C6]'
          } ${className}`}
          {...props}
        />
        {error ? (
          <p className="flex items-center gap-1.5 text-xs text-[#F26B5B] font-medium">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        ) : hint ? (
          <p className="text-xs text-[#667085]">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  options: SelectOption[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, hint, error, options, id, className = '', disabled, ...props }, ref) => {
    const generatedId = useId();
    const selectId = id || generatedId;

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-semibold text-[#101828] uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          disabled={disabled}
          className={`w-full rounded-lg bg-white border text-sm text-[#101828] transition-all duration-150 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#5B5BD6] focus:border-[#5B5BD6] disabled:bg-[#F8F8F5] disabled:cursor-not-allowed ${
            error
              ? 'border-[#F26B5B] focus:ring-[#F26B5B]'
              : 'border-[#E8E6DF] hover:border-[#D3D0C6]'
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        {error ? (
          <p className="text-xs text-[#F26B5B] font-medium">{error}</p>
        ) : hint ? (
          <p className="text-xs text-[#667085]">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = 'Select';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  description?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, id, className = '', ...props }, ref) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;

    return (
      <div className="flex items-start gap-2.5">
        <input
          id={checkboxId}
          ref={ref}
          type="checkbox"
          className={`mt-1 h-4 w-4 rounded border-[#D3D0C6] text-[#5B5BD6] focus:ring-[#5B5BD6] focus:ring-offset-0 transition-colors cursor-pointer ${className}`}
          {...props}
        />
        <div className="text-left text-sm">
          <label htmlFor={checkboxId} className="font-medium text-[#101828] cursor-pointer select-none">
            {label}
          </label>
          {description && <p className="text-xs text-[#667085] leading-relaxed select-none">{description}</p>}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
