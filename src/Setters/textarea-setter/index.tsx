import React, { ChangeEvent } from 'react';
import { Input } from 'antd';
import { JS_EXPRESSION } from '@/common/utils';
import './index.less';

interface TextAreaSetterProps {
  value: any;
  defaultValue: string;
  placeholder: string;
  onChange: (val: string) => void;
}

const { TextArea } = Input;

export default function TextAreaSetter(props: TextAreaSetterProps) {
  const { onChange, placeholder, value, defaultValue } = props;

  const onValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const val = value === undefined ? defaultValue : value;
  // 如果有变量绑定，则展示默认值
  const valueStr = (value && value.type === JS_EXPRESSION) ? defaultValue : val;
  return (
    <TextArea
      className="ape-textarea-setter"
      value={valueStr}
      defaultValue={defaultValue}
      placeholder={placeholder || ''}
      onChange={onValueChange}
    />
  );
}