import { ColorPicker } from 'antd';
import React from 'react';
import { OnStyleChange, StyleData } from '../../utils/types';

import './index.less';

interface ColorInputProps {
  styleKey: string;
  styleData: StyleData | any;
  onStyleChange: OnStyleChange;
  inputWidth?: string;
}

export default function ColorInput(props: ColorInputProps) {

  const handleChange = (color: any) => {
    const { onStyleChange, styleKey } = props;
    if (onStyleChange) {
      onStyleChange([{
        styleKey,
        value: color.toCssString(),
      }])
    }
  };

  const { styleKey, styleData } = props;
  return (
    <ColorPicker className="style-setter-color-input" value={styleData[styleKey]} showText onChange={handleChange} />
  );
}
