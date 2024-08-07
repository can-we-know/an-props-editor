import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { FormOutlined } from '@ant-design/icons'
import { JS_JSON } from '@/common/utils';
import BaseMonacoEditor from '@/components/monaco-editor';
import './index.less';

const { error } = Modal;

interface JsonInfoType {
  type: string;
  value: Record<string, any>;
}
export interface JsonSetterPropsType {
  value?: JsonInfoType;
  onChange: (val: JsonInfoType | null) => void;
}

export default function JsonSetter(props: JsonSetterPropsType) {
  const [ visible, setVisible ] = useState<boolean>(false);
  const [ curValue, setCurValue ] = useState<string>('');
  const { value, onChange } = props;


  const onClick = () => {
    let code = '';
    if (value && value.type === JS_JSON) {
      code = JSON.stringify(value.value, null, 2);
    }
    setVisible(true);
    setCurValue(code);
  };

  const onModalCancel = () => {
    setVisible(false);
  };

  const onOk = () => {
    if (curValue === '') {
      return onChange(null);
    }
    let result: JsonInfoType;
    try {
      result = {
        type: JS_JSON,
        value: JSON.parse(curValue),
      };
    } catch (e) {
      error({
        title: '保存失败',
        content: `${e} \n 不符合JSON格式，请检查`,
      });
      return;
    }
    onChange(result);
    setVisible(false);
  };

  const onValueChange = (val: string) => {
    setCurValue(val);
  };

  const hasData = !!(value && value.type === JS_JSON);

  return (
    <div className="ape-json-setter">
      {!hasData && <Button onClick={onClick}>绑定数据</Button>}
      {hasData && <Button type="primary" icon={<FormOutlined />} onClick={onClick}>编辑数据</Button> }
      <Modal
        title="数据编辑"
        open={visible}
        okText="确定"
        cancelText="取消"
        width="600px"
        onOk={onOk}
        onCancel={onModalCancel} >
        <div className="ape-setter-monaco-editor">
          <BaseMonacoEditor
            value={curValue}
            width={560}
            height={200}
            language="json"
            onChange={onValueChange}
          />
        </div>
      </Modal>
    </div>);
}
