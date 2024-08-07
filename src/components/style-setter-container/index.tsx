import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import { runInAction } from 'mobx';
import { Tooltip } from 'antd';
import { JS_EXPRESSION, JS_JSON } from '../utils';
import StyleSetter from '../../setters/style-setter';
import Title from '../title';
import VariableIcon from '../variable-icon';
import './index.less';


// interface StyleSetterProps {

// }

class StyleSetterContainer extends PureComponent<any, any> {
  onVariableBindClick = () => {
    const { store = {} } = this.props;
    const { apePropsPanel } = window as any;
    apePropsPanel.emit('variableBindDialog.openDialog', { pageState: apePropsPanel.pageState, onChange: this.onStyleChange, value: store.style || {} });
  };

  onStyleChange = (val) => {
    const { name, store = {} } = this.props;
    runInAction(() => {
      if (name === 'style') {
        store[name] = val;
        return;
      }
      store[name] = {
        type: JS_JSON,
        value: val,
      };
    });
  };

  render() {
    const { title, name = 'style', store = {} } = this.props;
    let value = store[name] || {};
    if (value && value.type === JS_JSON) {
      value = value.value;
    }
    const isVariableBind = value && value.type === JS_EXPRESSION;
    return (
      <div className="ape-block-field">
        <div className="ape-block-field-head">
          {title ? <Title title={title} /> : '行内样式'}
          <Tooltip title="变量绑定">
            <div className={`ape-block-field-action${isVariableBind ? ' ape-inline-field-action-active' : ''}`}>
              <span onClick={this.onVariableBindClick} >
                <VariableIcon />
              </span>
            </div>
          </Tooltip>
        </div>
        <div className="ape-block-field-body" >
          <StyleSetter unit="px" value={isVariableBind ? {} : value} onChange={this.onStyleChange} />
        </div>
      </div>);
  }
}

export default observer(StyleSetterContainer);
