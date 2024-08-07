import { Select } from 'antd';
import React from 'react';
import { JS_EXPRESSION } from '@/common/utils';

import './index.less';

const { Option } = Select;

interface OptionItem {
  label?: string;
  value?: string;
  disabled?: boolean;
}

interface SelectSetterProps {
  value?: any;
  onChange: (value: string) => undefined;
  mode?: 'multiple' | 'tags';
  defaultValue?: any;
  options: OptionItem[];
  placeholder: string;
}

export default function SelectSetter(props: SelectSetterProps) {

  const { options = [{ label: '-', value: '' }], mode, placeholder = '请选择', 
    value = null, defaultValue, onChange = () => undefined} = props;

  // 如果有变量绑定，则展示默认值
  const val = value && value.type === JS_EXPRESSION ? defaultValue : value;

  return (
    <Select
      className="ape-setter-select"
      placeholder={placeholder}
      value={val || defaultValue}
      mode={mode}
      onChange={onChange}
    >
      {
        options?.map((item: any) => (
          <Option
            disabled={item.disabled}
            key={item.value}
            value={item.value}
          >
            {item.label || item.title}
          </Option>
        ))
      }
    </Select>
  );
}
