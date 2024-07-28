import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import React from 'react';
import { JS_EXPRESSION } from '../utils';

interface DateMonthSetterProps {
  value: any;
  defaultValue: Dayjs;
  placeholder?: string;
  onChange: (val: Dayjs) => void;
}

const DateMonthSetter: React.FC<DateMonthSetterProps> = (
  props: DateMonthSetterProps,
) => {
  const { placeholder, value, defaultValue } = props;
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
    <DatePicker
      value={valueStr}
      defaultValue={defaultValue}
      placeholder={placeholder || ''}
      onChange={onChange}
      picker="month"
    />
  );
};

DateMonthSetter.displayName = 'DateMonthSetter';

export default DateMonthSetter;
