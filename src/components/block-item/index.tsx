import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import EntryItem from '../entry-item';
import InlineItem from '../inline-item';
// import StyleSetterContainer from '../style-setter-container';
import { PropsItemPropsType } from '../..//types/props-item';
import { DisplayType, PropsInfoType, PropType } from '../../types';
import Title from '../title';
import './index.less';

const BlockItem = observer((props: PropsItemPropsType) => {
  const onValueChange = (item: PropsInfoType) => (val: any) => {
    const { value } = props;
    runInAction(() => {
      value[item.name] = val;
    });
  };

  const onEntryClick = (item: PropsInfoType) => () => {
    const { apePropsPanel } = window as any;
    apePropsPanel.onEntryMetaInfoChange(item);
  };
  const { metaInfo, setterMap, value = {} } = props;
  const { items = [], type, title } = metaInfo || {};
  // if (metaInfo && metaInfo.setter === 'StyleSetter') {
  //   return <StyleSetterContainer title={metaInfo.title} name={metaInfo.name} store={value} />;
  // }
  return (
    <div className="ape-block-field">
      <div className="ape-block-field-head">
        <Title title={title} />
      </div>
      <div className="ape-block-field-body">
        {type === PropType.FIELD && (
          <InlineItem
            value={value[metaInfo.name]}
            onChange={onValueChange(metaInfo)}
            metaInfo={metaInfo}
            setterMap={setterMap}
          />
        )}
        {type === PropType.GROUP &&
          items.map((item, index) => {
            let { display } = item;
            const { extraProps = {} } = item;
            display = display || extraProps?.display;
            if (display === DisplayType.ENTRY) {
              return (
                <EntryItem
                  key={item.name || index}
                  onClick={onEntryClick(item)}
                  metaInfo={item}
                />
              );
            }
            return (
              <InlineItem
                key={item.name || index}
                value={value[item.name]}
                onChange={onValueChange(item)}
                metaInfo={item}
                setterMap={setterMap}
              />
            );
          })}
      </div>
    </div>
  );
});

export default BlockItem;
