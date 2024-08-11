import { getInitialValue, JS_JSON } from '@/common/utils';
import { Alert, Button } from 'antd';
import React, { useState } from 'react';
import SetterMetaItemMap, { ErrorItem } from './array-content';
import ArrayItem from './array-item';
import './index.less';
import ObjectSetterSection from './object-setter-section';
import Sortable from './sortable';

interface ArraySetterProps {
  value: any;
  // context: any; // 上下文环境
  onChange?: any;
  action: any;
  title: any;
  itemSetter: Record<any, any>;
  setterMap: Record<string, any>;
}

export default function ArraySetter(props: ArraySetterProps) {
  const scrollToLast = false;
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [curItem, setCurItem] = useState({});
  const [curIndex, setCurIndex] = useState(0);

  /**
   * onItemChange 用于 ArraySetter 的单个 index 下的数据发生变化，
   * 因此 target.path 的数据格式必定为 [propName, arrayIndex, key?]。
   *
   * @param target
   * @param value
   */
  const onItemChange = (item, index) => () => {
    setDrawerVisible(true);
    setCurItem(item);
    setCurIndex(index);
  };

  const onSort = (sortedIds: (string | number)[]) => {
    const { onChange, value } = props;
    const list = value && value.type === JS_JSON ? value.value : value;
    const _value = [];
    sortedIds.forEach((id, index) => {
      const item = list[+id];
      _value[index] = item;
    });
    if (value && value.type === JS_JSON) {
      onChange({
        type: JS_JSON,
        value: _value,
      });
    } else {
      onChange(_value);
    }
  };

  const onAdd = () => {
    const { itemSetter, value = [], onChange } = props;
    const { initialValue } = itemSetter || {};
    const defaultValue = getInitialValue(initialValue);

    if (value && value.type === JS_JSON) {
      onChange({
        type: JS_JSON,
        value: [...value.value, defaultValue],
      });
    } else {
      onChange({
        type: JS_JSON,
        value: [...value, defaultValue],
      });
    }
  };

  const onRemove = (removed, id) => () => {
    const { onChange, value } = props;
    if (value && value.type === JS_JSON) {
      value.value.splice(id, 1);
      onChange({
        type: JS_JSON,
        value: [...value.value],
      });
    }
  };

  const onDrawerClose = () => {
    setDrawerVisible(false);
  };

  const onItemValueChange = (val) => {
    const { onChange, value } = props;
    if (value && value.type === JS_JSON) {
      const list = value.value;
      list[curIndex] = val;
      onChange({
        type: JS_JSON,
        value: [...list],
      });
    }
    const curValue = value && value.type ? value.value : value;
    setCurItem((curValue || {})[curIndex]);
  };

  const onItemBaseDataChange = (curIndex) => (val) => {
    const { onChange, value } = props;
    if (value && value.type === JS_JSON) {
      const list = value.value;
      list[curIndex] = val;
      onChange({
        type: JS_JSON,
        value: [...list],
      });
    }
  };

  const { value = [], title, action, itemSetter, setterMap } = props;
  const lastIndex = value.length - 1;
  const list = value && value.type === JS_JSON ? value.value : value || [];
  const ArrayItemContent =
    SetterMetaItemMap[itemSetter.componentName] || ErrorItem;
  return (
    <div className="ape-setter-array-field">
      <div className="ape-setter-array-field-head">
        {title}
        {action}
      </div>
      <div className="ape-setter-array-field-body">
        {list.length > 0 ? (
          <>
            <Sortable
              itemClassName="ape-setter-array-list-card"
              onSort={onSort}
            >
              {list.map((item, index) => (
                <ArrayItem
                  key={index}
                  content={
                    <ArrayItemContent
                      value={list[index]}
                      onChange={onItemBaseDataChange(index)}
                      index={index}
                      onItemChange={onItemChange(item, index)}
                      {...itemSetter}
                    />
                  }
                  scrollIntoView={scrollToLast && index === lastIndex}
                  data={item}
                  index={index}
                  itemSetter={itemSetter}
                  onRemove={onRemove(item, index)}
                />
              ))}
            </Sortable>
          </>
        ) : (
          <Alert type="info" showIcon message="当前项目为空" />
        )}
        <div className="ape-setter-array-list-add">
          <Button onClick={onAdd}>
            <span>+ 添加一项</span>
          </Button>
        </div>
      </div>
      <ObjectSetterSection
        setterMap={setterMap}
        onChange={onItemValueChange}
        value={curItem}
        index={curIndex}
        visible={drawerVisible}
        itemSetter={itemSetter}
        onClose={onDrawerClose}
      />
    </div>
  );
}
