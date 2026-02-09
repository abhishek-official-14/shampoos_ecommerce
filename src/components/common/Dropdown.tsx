// src/components/common/Dropdown.tsx
import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiCheck } from 'react-icons/fi';
import './Dropdown.css';

interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  multiSelect?: boolean;
  label?: string;
  error?: string;
  className?: string;
  position?: 'left' | 'right' | 'center';
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  searchable = false,
  multiSelect = false,
  label,
  error,
  className = '',
  position = 'left',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValues, setSelectedValues] = useState<string[]>(value ? [value] : []);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const handleSelect = (optionValue: string) => {
    if (multiSelect) {
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter(v => v !== optionValue)
        : [...selectedValues, optionValue];
      
      setSelectedValues(newValues);
      onChange?.(newValues.join(','));
    } else {
      setSelectedValues([optionValue]);
      onChange?.(optionValue);
      setIsOpen(false);
    }
  };

  const selectedOption = options.find(opt => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  const positionClasses = {
    left: 'dropdown-menu-left',
    right: 'dropdown-menu-right',
    center: 'dropdown-menu-center',
  };

  return (
    <div className={`dropdown-container ${className}`} ref={dropdownRef}>
      {label && (
        <label className="dropdown-label">
          {label}
        </label>
      )}
      
      <button
        className={`dropdown-button ${isOpen ? 'dropdown-button-open' : ''} ${disabled ? 'dropdown-button-disabled' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className="dropdown-button-text">
          {multiSelect && selectedValues.length > 0
            ? `${selectedValues.length} selected`
            : displayLabel}
        </span>
        <FiChevronDown className="dropdown-icon" />
      </button>

      {isOpen && (
        <div className={`dropdown-menu ${positionClasses[position]}`}>
          {searchable && (
            <div className="dropdown-search">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="dropdown-search-input"
                autoFocus
              />
            </div>
          )}

          <div className="dropdown-scrollable">
            {filteredOptions.length === 0 ? (
              <div className="dropdown-empty">No options found</div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = multiSelect
                  ? selectedValues.includes(option.value)
                  : selectedValues[0] === option.value;

                return (
                  <button
                    key={option.value}
                    className={`dropdown-item ${isSelected ? 'dropdown-item-active' : ''} ${option.disabled ? 'dropdown-item-disabled' : ''}`}
                    onClick={() => !option.disabled && handleSelect(option.value)}
                    disabled={option.disabled}
                  >
                    {option.icon && (
                      <span className="dropdown-item-icon">{option.icon}</span>
                    )}
                    <span className="dropdown-item-label">{option.label}</span>
                    {isSelected && <FiCheck className="dropdown-item-check" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="dropdown-error">
          {error}
        </div>
      )}
    </div>
  );
};

export default Dropdown;