import { JS_EXPRESSION, JS_JSON } from '@/common/utils';
import { Tooltip } from 'antd';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import StyleSetter from '../../setters/style-setter';
import Title from '../title';
import VariableIcon from '../variable-icon';
import './index.less';

interface StyleSetterProps {
  title?: any;
  name: string;
  store: Record<string, any>;
}

export default observer(function StyleSetterContainer(props: StyleSetterProps) {
  const { title, name = 'style', store = {} } = props;

  const onStyleChange = (val: any) => {
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

  const onVariableBindClick = () => {
    const { apePropsPanel } = window as any;
    apePropsPanel.emit('variableBindDialog.openDialog', {
      pageState: apePropsPanel.pageState,
      onChange: onStyleChange,
      value: store.style || {},
    });
  };

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
          <div
            className={`ape-block-field-action${
              isVariableBind ? ' ape-inline-field-action-active' : ''
            }`}
          >
            <span onClick={onVariableBindClick}>
              <VariableIcon />
            </span>
          </div>
        </Tooltip>
      </div>
      <div className="ape-block-field-body">
        <StyleSetter
          unit="px"
          value={isVariableBind ? {} : value}
          onChange={onStyleChange}
        />
      </div>
    </div>
  );
});
