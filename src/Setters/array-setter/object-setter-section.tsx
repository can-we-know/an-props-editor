import InlineItem from '@/components/inline-item';
import { PropsInfoType } from '@/types';
import { Drawer } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react';

export default observer(function ObjectSetterSection(props: any) {

  const onValueChange = (item: PropsInfoType) => (val: any) => {
    const { onChange, value } = props;
    const { name } = item;
    if (value) {
      onChange({
        ...value,
        [name]: val,
      });
    } else {
      onChange({
        [name]: val,
      });
    }
  };

  const {
    itemSetter,
    setterMap,
    value = {},
    index,
    visible = false,
    onClose,
  } = props;
  const { items = [] } = itemSetter?.props?.config || {};
  return (
    <Drawer
      title={`项目${index}`}
      placement="right"
      onClose={onClose}
      open={visible}
      mask={false}
      width={visible ? 360 : 0}
      destroyOnClose
      style={{ right: 360 }}
    >
      <div className="ape-setter-object-section">
        <div className="ape-setter-object-section-body">
          {items.map((item: PropsInfoType) => (
            <InlineItem
              setterMap={setterMap}
              value={value[item.name]}
              onChange={onValueChange(item)}
              metaInfo={item}
              key={item.name}
            />
          ))}
        </div>
      </div>
    </Drawer>
  );
});
