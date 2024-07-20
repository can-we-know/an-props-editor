import { Switch } from 'antd';
import React from 'react';
import { JS_EXPRESSION } from '../utils';

interface BoolSetterProps {
  value: any;
  defaultValue: boolean;
  onChange: (val: boolean) => void;
}

const BoolSetter: React.FC<BoolSetterProps> = (props: BoolSetterProps) => {
  const { value, defaultValue } = props;
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
    <Switch
      checked={valueStr}
      defaultChecked={defaultValue}
      onChange={onChange}
    />
  );
};

BoolSetter.displayName = 'BoolSetter';

export default BoolSetter;
