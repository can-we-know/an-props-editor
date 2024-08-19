import { Collapse } from 'antd';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { PropsItemPropsType } from '../..//types/props-item';
import { PropsInfoType, PropType } from '../../types';
import InlineItem from '../inline-item';
import Title from '../title';
import './index.less';

const AccordionItem = observer((props: PropsItemPropsType) => {
  const onValueChange = (item: PropsInfoType) => (val: any) => {
    const { value } = props;
    runInAction(() => {
      if (item.name) {
        value[item.name] = val;
      }
    });
  };

  const { metaInfo, setterMap, value = {} } = props;
  const { items = [], type, name } = metaInfo || {};
  return (
    <Collapse
      defaultActiveKey={['1']}
      className="ape-accordion-field"
      expandIconPosition="end"
      items={[
        {
          key: '1',
          label: (
            <div className="ape-accordion-field-head">
              <Title title={metaInfo.title} />
            </div>
          ),
          children: (
            <>
              {type === PropType.FIELD && (
                <InlineItem
                  value={value[name as string]}
                  onChange={onValueChange(metaInfo)}
                  metaInfo={metaInfo}
                  setterMap={setterMap}
                />
              )}
              {type === PropType.GROUP &&
                items.map((item, index) => (
                  <InlineItem
                    key={item.name || index}
                    onChange={onValueChange(item)}
                    value={value[item.name as string]}
                    metaInfo={item}
                    setterMap={setterMap}
                  />
                ))}
            </>
          ),
        },
      ]}
    ></Collapse>
  );
});

export default AccordionItem;
