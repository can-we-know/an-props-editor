import { ColorPicker } from 'antd';
import type { Color } from 'antd/es/color-picker';
import React from 'react';
import { JS_EXPRESSION } from '@/common/utils';
import './index.less';


export interface ColorSetterProps {
  value: any;
  defaultValue: Color | string;
  onChange: (val: Color | string) => void;
}

const ColorSetter: React.FC<ColorSetterProps> = (props: ColorSetterProps) => {
  const { value, defaultValue = '#fff' } = props;
  const val = value === undefined ? defaultValue : value;
  // 如果有变量绑定，则展示默认值
  const valueStr = value && value.type === JS_EXPRESSION ? defaultValue : val;

  const onChange = (val: any) => {
    const { onChange } = props;
    if (onChange) {
      onChange(val.toCssString());
    }
  };

  return (
    <ColorPicker
      className="ape-color-setter"
      showText
      value={valueStr}
      onChange={onChange}
    />
  );
};

ColorSetter.displayName = 'ColorSetter';

export default ColorSetter;
