import { InputNumber } from 'antd';
import React from 'react';
import { JS_EXPRESSION } from '../utils';

interface NumberSetterProps {
  value: any;
  defaultValue: number;
  placeholder?: string;
  onChange: (val: number) => void;
}

const NumberSetter: React.FC<NumberSetterProps> = (
  props: NumberSetterProps,
) => {
  const { value, defaultValue, placeholder } = props;
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
    <InputNumber
      value={valueStr}
      defaultValue={defaultValue}
      placeholder={placeholder || ''}
      onChange={onChange}
    />
  );
};

NumberSetter.displayName = 'NumberSetter';

export default NumberSetter;
