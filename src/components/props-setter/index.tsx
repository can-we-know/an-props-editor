import React, { ElementType } from 'react';
import { observer } from 'mobx-react-lite';
import { runInAction } from 'mobx';
import { Empty } from 'antd';
import { DisplayType, PropsInfoType } from '../../types';
import InlineItem from '../inline-item';
import BlockItem from '../block-item';
import EntryItem from '../entry-item';
import AccordionItem from '../accordion-item';


interface PropsSetterProps {
  propsInfo: PropsInfoType[];
  onEntryMetaInfoChange: (data: PropsInfoType) => void;
  setterMap: Record<string, ElementType>;
  value: Record<string, any>;
}

const PropsSetter = observer((props: PropsSetterProps) => {

  const onValueChange = (item: PropsInfoType) => (val: any) => {
    const { value } = props;
    runInAction(() => {
      value[item.name] = val;
    });
  };

  const onEntryClick = (item: PropsInfoType) => () => {
    const { onEntryMetaInfoChange } = props;
    onEntryMetaInfoChange(item);
  };


  const { setterMap, value, propsInfo } = props;
  if (!propsInfo || propsInfo.length === 0) {
    return <Empty description="暂无可设置属性" />;
  }
  return (
    <div className="ape-props-setter-list">
      {propsInfo.map((item, index) => {
        let { display } = item;
        const { extraProps = {} } = item;
        display = display || extraProps?.display;
        if (display === DisplayType.ACCORDION) {
          return <AccordionItem setterMap={setterMap} value={value} key={`${item.name}-${index}`} metaInfo={item} />;
        }
        if (display === DisplayType.ENTRY) {
          return <EntryItem key={`${item.name}-${index}`} onClick={onEntryClick(item)} metaInfo={item} />;
        }
        if (display === DisplayType.BLOCK) {
          return <BlockItem value={value} setterMap={setterMap} key={`${item.name}-${index}`} metaInfo={item} />;
        }
        return <InlineItem value={value[item.name]} onChange={onValueChange(item)} setterMap={setterMap} key={`${item.name}-${index}`} metaInfo={item} />;
      })}
    </div>);
})


export default PropsSetter;
