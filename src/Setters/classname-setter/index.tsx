import { Select } from 'antd';
import React from 'react';
import { JS_EXPRESSION } from '../utils';

interface ClassNameSetterProps {
  value: any;
  defaultValue: string;
  placeholder?: string;
  onChange: (val: string) => void;
}

const ClassNameSetter: React.FC<ClassNameSetterProps> = (
  props: ClassNameSetterProps,
) => {
  const { placeholder, value, defaultValue } = props;
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
      defaultValue={defaultValue}
      placeholder={placeholder || ''}
      onChange={onChange}
      options={[{ label: 'button', value: 'button' }]} // TODO: 从project中取
      allowClear
    />
  );
};

ClassNameSetter.displayName = 'ClassNameSetter';

export default ClassNameSetter;
