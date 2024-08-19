import { Switch } from 'antd';
import * as React from 'react';

import './index.less';

interface BoolSetterProps {
  value: boolean;
  disabled: boolean;
  defaultValue: any;
  onChange: (val: boolean) => void;
}

export default function BoolSetter(props: BoolSetterProps) {
  const { onChange, disabled, value, defaultValue } = props;

  const onValueChange = (check: boolean) => {
    if (onChange) {
      onChange(check);
    }
  };

  return (
    <div className="ape-setter-switch">
      <Switch
        checked={typeof value === 'boolean' ? value : defaultValue}
        disabled={disabled}
        onChange={onValueChange}
      />
    </div>
  );
}
