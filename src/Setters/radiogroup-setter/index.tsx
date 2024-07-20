import { Radio } from 'antd';
import React from 'react';
import { JS_EXPRESSION } from '../utils';

interface RadioGroupSetterProps {
  value: any;
  defaultValue: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
}

const RadioGroupSetter: React.FC<RadioGroupSetterProps> = (
  props: RadioGroupSetterProps,
) => {
  const { value, defaultValue, options } = props;
  const val = value === undefined ? defaultValue : value;
  // 如果有变量绑定，则展示默认值
  const [valueStr, setValueStr] = React.useState(
    value && value.type === JS_EXPRESSION ? defaultValue : val,
  );

  const onChange = (e: any) => {
    const { onChange } = props;
    setValueStr(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <Radio.Group
      options={
        options || [
          { label: 'Apple', value: 'Apple' },
          { label: 'Android', value: 'Android' },
        ]
      }
      onChange={onChange}
      value={valueStr}
      defaultValue={defaultValue}
      optionType="button"
    />
  );
};

RadioGroupSetter.displayName = 'RadioGroupSetter';

export default RadioGroupSetter;
