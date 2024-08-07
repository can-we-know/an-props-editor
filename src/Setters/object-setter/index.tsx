import React, { ElementType, ReactNode } from 'react';
import InlineItem from '@/components/inline-item';
import { ObjectMetaItem } from '@/types';
import { JS_JSON } from '@/common/utils';

import './index.less';

export interface ObjectSetterType {
  className: string;
  setterMap: Record<string, ElementType>
  title: string;
  action?: ReactNode;
  onChange: (val: any) => void;
  config: { items: ObjectMetaItem[] };
  value: Record<string, any>;
}

export default function ObjectSetter (props: ObjectSetterType) {
  const { className, setterMap, onChange, title, action, config = {} as any, value = {} } = props;

  const onValueChange = (item: ObjectMetaItem) => (val: any) => {
    const { name } = item;
    if (value && value.type) {
      onChange({
        type: value.type,
        value: {
          ...value.value,
          [name]: val,
        },
      });
    } else {
      onChange({
        type: JS_JSON,
        value: {
          ...value,
          [name]: val,
        },
      });
    }
  };

  const { items = [] } = config;
  const result = (value && value.type) ? value.value : value;
  return (
    <div className={`ape-setter-object-field ${className}`}>
      <div className="ape-setter-object-field-head" >
        {title}
        {action}
      </div>
      <div className="ape-setter-object-field-body">
        { items.map((item: ObjectMetaItem) => <InlineItem setterMap={setterMap} value={result[item.name]} onChange={onValueChange(item)} metaInfo={item} key={item.name} />) }
      </div>
    </div>);
}

