import { Input } from 'antd';
import React from 'react';
import { JS_EXPRESSION } from '../utils';

interface TextAreaSetterProps {
  value: any;
  defaultValue: string;
  placeholder?: string;
  onChange: (val: string) => void;
}

const TextAreaSetter: React.FC<TextAreaSetterProps> = (
  props: TextAreaSetterProps,
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
    <Input.TextArea
      value={valueStr}
      defaultValue={defaultValue}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

TextAreaSetter.displayName = 'TextAreaSetter';

export default TextAreaSetter;
