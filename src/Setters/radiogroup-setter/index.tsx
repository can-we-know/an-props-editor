import React from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import './index.less';

export interface OptionsItem {
  label?: string;
  value: string;
  title?: string;
  // disabled?: boolean;
}

export interface RadioGroupSetterProps {
  value: boolean;
  disabled?: boolean;
  options: (string | number | OptionsItem)[] ;
  defaultValue: any;
  onChange: (val: any) => void;
}


const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

export default function RadioGroupSetter(props: RadioGroupSetterProps) {

  const { options = [], onChange, disabled, value, defaultValue } = props;

  const handleChange = (e: RadioChangeEvent) => {
    const { value } = e.target;
    if (onChange) {
      onChange(value);
    }
  };
  const renderOptions = () => {
    return options.map((item, index) => {
      if (typeof item === 'string' || typeof item === 'number') {
        return <RadioButton key={`${index}-${item}`} value={item}>{item}</RadioButton>;
      }
      const { label, title, value } = item || {};
      return <RadioButton key={`${index}-${label || title}`} value={value}>{label || title}</RadioButton>;
    });
  };

  return (
    <div className="ape-setter-radiogroup">
      <RadioGroup
        disabled={disabled}
        value={value || defaultValue}
        onChange={handleChange}
      >
        {renderOptions()}
      </RadioGroup>
    </div>
  );
}

