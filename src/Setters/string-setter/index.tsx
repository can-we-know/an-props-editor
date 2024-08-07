import { Input } from 'antd';
import React, { ChangeEvent } from 'react';
import { JS_EXPRESSION } from '@/common/utils';
import './index.less';

export interface StringSetterProps {
  value: any;
  defaultValue: string;
  placeholder?: string;
  onChange: (val: string) => void;
}

export default function StringSetter(props: StringSetterProps) {
  const { placeholder, value, onChange, defaultValue } = props || {};
  const val = value === undefined ? defaultValue : value;
  // 如果有变量绑定，则展示默认值
  const valueStr = value && value.type === JS_EXPRESSION ? defaultValue : val;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  }

  return (
    <Input
      className="ape-setter-string"
      value={valueStr}
      defaultValue={defaultValue}
      placeholder={placeholder || ''}
      onChange={handleChange}
    />
  );
};

