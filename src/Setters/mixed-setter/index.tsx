import React from 'react';
import { Dropdown, Tooltip } from 'antd';
import { Setter } from './props-type';
import MainIcon from './component/icon';
import MixedMenuItem from './component/MenuItem';
import './index.less';

interface MixedSetterProps {
  setters?: (string |Setter)[];
  value?: string;
  onChange?: (val: any) => void;
}

export default function MixedSetter(props: MixedSetterProps) {
    // 切换setter
  const onSelect = ({ key }: { key: string}) => {
    const { onChange } = props;
    if (onChange) {
      onChange(key);
    }
  };
  
  const { setters = [], value } = props;

  const items = setters.map((setter) => {
    return {
      key: typeof setter === 'string' ? setter : setter?.componentName,
      label: (<MixedMenuItem
        setter={setter}
        curSelect={value}
      />)
    };
  });

  return (
    <div className="ape-setter-mixed">
      <Dropdown menu={{ selectable: true, selectedKeys: [value as string], onSelect, items  }} trigger={['click']}>
        <Tooltip title="切换设置器">
            <div className="mixed-setter-icon"><MainIcon /></div>
        </Tooltip>
       </Dropdown>
    </div>
  );
}