import React from 'react';
import { Input } from 'antd';
import { JS_EXPRESSION } from '../utils';

interface StringSetterProps {
  value: any;
  defaultValue: string;
  placeholder?: string;
  onChange: (val: string) => void;
}

interface StringSetterState {
  setterValue: string | null;
}

export default class StringSetter extends React.PureComponent<
StringSetterProps,
StringSetterState
> {
  static displayName = 'StringSetter';

  onChange = (e: any) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(e.target.value);
    }
  };

  render() {
    const { placeholder, value, defaultValue } = this.props;
    const val = value === undefined ? defaultValue : value;
    // 如果有变量绑定，则展示默认值
    const valueStr = (value && value.type === JS_EXPRESSION) ? defaultValue : val;
    return (
      <Input
        className="domino-setter-string"
        value={valueStr}
        defaultValue={defaultValue}
        placeholder={placeholder || ''}
        onChange={this.onChange}
      />
    );
  }
}
