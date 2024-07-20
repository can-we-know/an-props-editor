import { Input } from 'antd';
import React from 'react';
import { JS_EXPRESSION } from '../utils';

interface StringSetterProps {
  value: any;
  defaultValue: string;
  placeholder?: string;
  onChange: (val: string) => void;
}

const StringSetter: React.FC<StringSetterProps> = (
  props: StringSetterProps,
) => {
  const { placeholder, value, defaultValue } = props;
  const val = value === undefined ? defaultValue : value;
  // 如果有变量绑定，则展示默认值
  const valueStr = value && value.type === JS_EXPRESSION ? defaultValue : val;

  const onChange = (e: any) => {
    const { onChange } = props;
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <Input
      value={valueStr}
      defaultValue={defaultValue}
      placeholder={placeholder || ''}
      onChange={onChange}
    />
  );
};

StringSetter.displayName = 'StringSetter';

export default StringSetter;
