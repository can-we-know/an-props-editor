import { JS_EXPRESSION } from '@/common/utils';
import { InputNumber } from 'antd';
import * as React from 'react';
import './index.less';

interface NumberSetterProps {
  min?: number;
  max?: number;
  defaultValue?: number;
  step?: number | string;
  units?: string;
  value: any;
  onChange: (val: string) => void;
}

export default function NumberSetter(props: NumberSetterProps) {
  const onValueChange = (val: any) => {
    const { onChange, units } = props;
    const value = units ? `${val}${units}` : val;
    onChange(value);
  };

  const numberFormatter = (value: any) => {
    const { units = '' } = props;
    if (units && typeof value === 'string') {
      return value.replace(units, '');
    }
    return value;
  };

  const numberParser = (value: any) => {
    // 返回空字符串， 表示删除
    if (value === '') {
      return undefined;
    }
    const num = +value;
    // num非NaN，则返回nun
    return isNaN(num) ? '' : num;
  };

  const {
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    step = 1,
    value,
    defaultValue,
    units,
  } = props;
  // 如果有变量绑定，则展示默认值
  const val = value === undefined ? defaultValue : value;
  const valueStr = value && value.type === JS_EXPRESSION ? defaultValue : val;
  return (
    <div className="ape-setter-number">
      <InputNumber
        className="ape-setter-number-input"
        value={valueStr}
        defaultValue={defaultValue}
        min={min}
        max={max}
        step={step}
        parser={numberParser}
        formatter={numberFormatter}
        onChange={onValueChange}
      />
      {units && <div className="ape-setter-number-inner">{units}</div>}
    </div>
  );
}
