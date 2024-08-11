import { Input, Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import { OnStyleChange, StyleData } from '../../utils/types';

import './index.less';

interface ColorInputProps {
  styleKey: string;
  styleData: StyleData | any;
  onStyleChange?: OnStyleChange;
  inputWidth?: string;
}

export default function ColorSetter(props: ColorInputProps) {
  const [width, setWidth] = useState<number>(50);

  /**
   * 屏幕分辨率 变换 =>  改变冒泡框的位置
   */
  const changeWidth = () => {
    setWidth(document.body.clientWidth < 1860 ? -92 : -138);
  };

  useEffect(() => {
    window.addEventListener('resize', changeWidth);
    changeWidth();
    return () => {
      window.removeEventListener('resize', changeWidth);
    };
  }, [changeWidth]);

  const inputChange = (e: any) => {
    const color = e.target.value;
    const { onStyleChange, styleKey } = props;
    if (color === '') {
      onStyleChange([
        {
          styleKey,
          value: null,
        },
      ]);
    }
  };

  const handleChange = (color: any) => {
    const { onStyleChange, styleKey } = props;
    const { rgb, hex } = color;
    const { r, g, b, a } = rgb;
    if (a === 1) {
      onStyleChange([
        {
          styleKey,
          value: hex,
        },
      ]);
      // onChange(hex);
    } else {
      onStyleChange([
        {
          styleKey,
          value: `rgba(${r},${g},${b},${a})`,
        },
      ]);
      // onChange(`rgba(${r},${g},${b},${a})`);
    }
  };

  const { styleKey, styleData, inputWidth = '108px' } = props;
  return (
    <Popover
      placement="topRight"
      overlayStyle={{ padding: 0 }}
      content={
        <SketchPicker
          width={'250px'}
          color={styleData[styleKey]}
          onChange={handleChange}
        />
      }
      trigger="click"
    >
      <Input
        className="lowcode-setter-color"
        style={{ width: inputWidth }}
        allowClear
        addonBefore={
          <div
            className="color-box"
            style={{ backgroundColor: styleData[styleKey] }}
          />
        }
        onChange={inputChange}
        value={styleData[styleKey]}
      />
    </Popover>
  );
}
