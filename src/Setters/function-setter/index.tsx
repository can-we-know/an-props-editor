import {
  DeleteOutlined,
  PaperClipOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import './index.less';

export interface FunctionSetterPropsType {
  onChange: (val: any) => void;
  value: any;
  initialValue?: string;
}

export default function FunctionSetter(props: FunctionSetterPropsType) {
  const { onChange = () => null, value, initialValue } = props;

  const onClick = () => {
    const { apePropsPanel } = window as any;
    apePropsPanel.emit('functionBindDialog.openDialog', {
      pageState: apePropsPanel.pageState,
      onChange,
      value,
      methodList: apePropsPanel.methodList,
      initialValue,
    });
  };

  const onDelete = () => {
    onChange(null);
  };

  const name = value && value.value ? value.value : value;
  return (
    <div className="ape-function-setter">
      {!value && <Button onClick={onClick}>绑定函数</Button>}
      {value && (
        <div className="ape-function-bind-content">
          <PaperClipOutlined className="related-icon" />
          <span className="ape-function-name">{name}</span>

          <SettingOutlined
            className="event-operate-icon"
            onClick={onClick}
            style={{ marginLeft: 3, marginRight: 4 }}
          />
          <DeleteOutlined onClick={onDelete} className="event-operate-icon" />
        </div>
      )}
    </div>
  );
}
