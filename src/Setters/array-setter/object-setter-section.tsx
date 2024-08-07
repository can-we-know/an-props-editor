import React, { PureComponent } from 'react';
import { Drawer } from 'antd';
import { observer } from 'mobx-react';
import InlineItem from '../inline-item';

class ObjectSetterSection extends PureComponent<any, any> {
  onValueChange = (item) => (val) => {
    const { onChange, value } = this.props;
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

  render() {
    const { itemSetter, setterMap, value = {}, index, visible = false, onClose } = this.props;
    const { items = [] } = itemSetter?.props?.config || {};
    return (
      <Drawer
        title={`项目${index}`}
        placement="right"
        onClose={onClose}
        visible={visible}
        mask={false}
        width={visible ? 360 : 0}
        destroyOnClose
        style={{ right: 360 }}
      >
        <div className="ape-setter-object-section">
          <div className="ape-setter-object-section-body">
            { items.map(item => <InlineItem setterMap={setterMap} value={value[item.name]} onChange={this.onValueChange(item)} metaInfo={item} key={item.name} />) }
          </div>
        </div>
      </Drawer>);
  }
}

export default observer(ObjectSetterSection);
