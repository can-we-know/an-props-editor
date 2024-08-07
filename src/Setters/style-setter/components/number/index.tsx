/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-shadow */
import * as React from 'react';
import { InputNumber } from 'antd';
import { StyleData, OnStyleChange } from '../../utils/types';
import { addUnit, removeUnit, isEmptyValue } from '../../utils';

// import './index.less';

interface NumberProps {
  styleKey: string;
  styleData: StyleData | any;
  onStyleChange?: OnStyleChange;
  unit?: string;
  min?: number;
  max?: number;
  style?: any;
  className?: string;
  size?: 'default' | 'large' | 'small';
  // field?: any;
  // placeholderScale?: number;
  // useComputedStyle?: boolean;
}

export default (props: NumberProps) => {
  const {
    styleData = {},
    styleKey,
    unit,
    onStyleChange,
    min,
    max,
    style = {},
    className = '',
    size,
  } = props;

  const onNumberChange = (styleKey: string, value: number, unit?: string) => {
    onStyleChange?.([
      {
        styleKey,
        value: unit ? addUnit(value, unit) : value,
      },
    ]);
  };

  return (
    <div className={className} style={style}>
      <InputNumber
        value={unit ? removeUnit(styleData[styleKey]) : styleData[styleKey]}
        min={isEmptyValue(min) ? Number.MIN_SAFE_INTEGER : min}
        max={isEmptyValue(max) ? Number.MAX_SAFE_INTEGER : max}
        onChange={(val) => onNumberChange(styleKey, val, unit)}
        size={size || 'default'}
      />
      <span className="number-input-suffix">&nbsp;{unit || ''}</span>
    </div>
  );
};
