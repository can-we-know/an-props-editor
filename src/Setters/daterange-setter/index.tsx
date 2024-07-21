import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import React from 'react';
import { JS_EXPRESSION } from '../utils';

const { RangePicker } = DatePicker;
type RangeValue = [Dayjs | null, Dayjs | null];

interface DateRangeSetterProps {
  value: any;
  defaultValue: RangeValue;
  placeholder?: [string, string];
  onChange: (val: RangeValue) => void;
}

const DateRangeSetter: React.FC<DateRangeSetterProps> = (
  props: DateRangeSetterProps,
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
    <RangePicker
      value={valueStr}
      defaultValue={defaultValue}
      placeholder={placeholder || ['', '']}
      onChange={onChange}
    />
  );
};

DateRangeSetter.displayName = 'DateRangeSetter';

export default DateRangeSetter;
