// src/components/common/Tabs.tsx
import React, { useState, Children, isValidElement, ReactNode } from 'react';
import './Tabs.css';

interface TabProps {
  label: string;
  children: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
}

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <div className="tab-content">{children}</div>;
};

interface TabsProps {
  children: ReactNode;
  defaultActiveTab?: number;
  variant?: 'default' | 'pills' | 'bordered' | 'underline';
  orientation?: 'horizontal' | 'vertical';
  fullWidth?: boolean;
  className?: string;
  onChange?: (index: number) => void;
}

const Tabs: React.FC<TabsProps> = ({
  children,
  defaultActiveTab = 0,
  variant = 'default',
  orientation = 'horizontal',
  fullWidth = false,
  className = '',
  onChange,
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const tabs = Children.toArray(children).filter(
    (child): child is React.ReactElement<TabProps> =>
      isValidElement(child) && child.type === Tab
  );

  const handleTabClick = (index: number) => {
    if (!tabs[index].props.disabled) {
      setActiveTab(index);
      onChange?.(index);
    }
  };

  const variantClasses = {
    default: '',
    pills: 'tabs-pills',
    bordered: 'tabs-bordered',
    underline: 'tabs-underline',
  };

  const orientationClass = orientation === 'vertical' ? 'tabs-vertical' : '';
  const fullWidthClass = fullWidth ? 'tabs-full' : '';

  return (
    <div className={`tabs-container ${orientationClass} ${fullWidthClass} ${className}`}>
      <div className={`tabs-list ${variantClasses[variant]}`}>
        {tabs.map((tab, index) => {
          const isActive = index === activeTab;
          const { label, disabled, icon } = tab.props;

          return (
            <button
              key={index}
              className={`tab-trigger ${isActive ? 'tab-trigger-active' : ''} ${disabled ? 'tab-trigger-disabled' : ''}`}
              onClick={() => handleTabClick(index)}
              disabled={disabled}
            >
              {icon && <span className="tab-icon">{icon}</span>}
              {label}
            </button>
          );
        })}
      </div>

      <div className="tab-content-wrapper">
        {tabs[activeTab]}
      </div>
    </div>
  );
};

export default Tabs;
export { Tab };