import * as React from 'react';
import { PureComponent } from 'react';
import { Button, Alert } from 'antd';
import ArrayItem from './array-item';
import Sortable from './sortable';
import ObjectSetterSection from './object-setter-section';
import SetterMetaItemMap, { ErrorItem } from './array-content';
import { getInitialValue, JS_JSON } from '../utils';
import './index.less';

interface ArraySetterProps {
  value: any;
  // context: any; // 上下文环境
  onChange?: Function;
  action: any;
  title: any;
  itemSetter: Record<any, any>;
  setterMap: Record<string, any>;
}

export default class ArraySetter extends PureComponent<ArraySetterProps, any> {
  private scrollToLast = false;

  constructor(props) {
    super(props);
    this.state = {
      drawerVisible: false,
      curItem: {},
      curIndex: 0,
    };
  }

  /**
   * onItemChange 用于 ArraySetter 的单个 index 下的数据发生变化，
   * 因此 target.path 的数据格式必定为 [propName, arrayIndex, key?]。
   *
   * @param target
   * @param value
   */
  onItemChange = (item, index) => () => {
    this.setState({
      drawerVisible: true,
      curItem: item,
      curIndex: index,
    });
  };

  onSort = (sortedIds: (string | number)[]) => {
    const { onChange, value } = this.props;
    const list = (value && value.type === JS_JSON) ? value.value : value;
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

  onAdd = () => {
    const { itemSetter, value = [], onChange } = this.props;
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

  onRemove = (removed, id) => () => {
    const { onChange, value } = this.props;
    if (value && value.type === JS_JSON) {
      value.value.splice(id, 1);
      onChange({
        type: JS_JSON,
        value: [...value.value],
      });
    }
  };

  onDrawerClose = () => {
    this.setState({
      drawerVisible: false,
    });
  };

  onItemValueChange = (val) => {
    const { curIndex } = this.state;
    const { onChange, value } = this.props;
    if (value && value.type === JS_JSON) {
      const list = value.value;
      list[curIndex] = val;
      onChange({
        type: JS_JSON,
        value: [...list],
      });
    }
    const curValue = (value && value.type) ? value.value : value;
    this.setState({
      curItem: (curValue || {})[curIndex],
    });
  };

  onItemBaseDataChange = (curIndex) => (val) => {
    const { onChange, value } = this.props;
    if (value && value.type === JS_JSON) {
      const list = value.value;
      list[curIndex] = val;
      onChange({
        type: JS_JSON,
        value: [...list],
      });
    }
  };

  render() {
    const { value = [], title, action, itemSetter, setterMap } = this.props;
    const { scrollToLast } = this;
    const lastIndex = value.length - 1;
    const { drawerVisible, curItem, curIndex } = this.state;
    const list = (value && value.type === JS_JSON) ? value.value : (value || []);
    const ArrayItemContent = SetterMetaItemMap[itemSetter.componentName] || ErrorItem;
    return (
      <div className="ape-setter-array-field">
        <div className="ape-setter-array-field-head" >
          {title}
          {action}
        </div>
        <div className="ape-setter-array-field-body">
          {
            list.length > 0
              ? (
                <>
                  <Sortable itemClassName="ape-setter-array-list-card" onSort={this.onSort}>
                    {list.map((item, index) => (
                      <ArrayItem
                        key={index}
                        content={<ArrayItemContent value={list[index]} onChange={this.onItemBaseDataChange(index)} index={index} onItemChange={this.onItemChange(item, index)} {...itemSetter} />}
                        scrollIntoView={scrollToLast && index === lastIndex}
                        data={item}
                        index={index}
                        itemSetter={itemSetter}
                        onRemove={this.onRemove(item, index)}
                      />
                    ))}
                  </Sortable>
                </>
              )
              : <Alert type="info" showIcon message="当前项目为空" />
          }
          <div className="ape-setter-array-list-add">
            <Button onClick={this.onAdd}>
              <span>+ 添加一项</span>
            </Button>
          </div>
        </div>
        <ObjectSetterSection setterMap={setterMap} onChange={this.onItemValueChange} value={curItem} index={curIndex} visible={drawerVisible} itemSetter={itemSetter} onClose={this.onDrawerClose} />
      </div>
    );
  }
}
