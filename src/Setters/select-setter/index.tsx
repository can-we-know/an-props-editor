import { Select } from 'antd';
import React from 'react';
import { JS_EXPRESSION } from '../utils';

interface SelectSetterProps {
  value: any;
  defaultValue: string;
  placeholder?: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
  mode: 'multiple' | 'tags';
}

const SelectSetter: React.FC<SelectSetterProps> = (
  props: SelectSetterProps,
) => {
  const { placeholder, value, defaultValue, options, mode } = props;
  const val = value === undefined ? defaultValue : value;
  // 如果有变量绑定，则展示默认值
  const valueStr = value && value.type === JS_EXPRESSION ? defaultValue : val;

  const onChange = (e: any) => {
    const { onChange } = props;
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <Select
      style={{ width: 120 }}
      value={valueStr}
      mode={mode}
      defaultValue={defaultValue}
      placeholder={placeholder || ''}
      onChange={onChange}
      options={
        options || [
          { label: 'Apple', value: 'Apple' },
          { label: 'Android', value: 'Android' },
        ]
      }
      allowClear
    />
  );
};

SelectSetter.displayName = 'SelectSetter';

export default SelectSetter;
