import * as React from 'react';
import { Switch } from 'antd';
import { JS_SLOT } from '@/common/utils';
import './index.less';

export interface SlotSetterPropsType {
  onChange: (val: any) => void;
  value?: Record<string, any>;
}

export default function SlotSetter(props: SlotSetterPropsType) {
  const onChange = (val: boolean) => {
    const { onChange } = props;
    if (onChange) {
      onChange(val ? { type: JS_SLOT } : null);
    }
  };

  const { value } = props;
  const checked = !!(value && value.type === JS_SLOT);
  return (
    <div className="ape-setter-slot">
      <Switch checkedChildren="启用" unCheckedChildren="关闭" checked={checked} defaultChecked onChange={onChange} />
    </div>);
}
