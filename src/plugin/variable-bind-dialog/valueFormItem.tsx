import BaseMonacoEditor from '@/components/monaco-editor';
import { Input, InputNumber, Select } from 'antd';
import React, { Component } from 'react';
import './index.less';

const { Option } = Select;

// 模板变量占位
const monacoOptions = {
  style: { width: '100%', height: '297px' },
  readOnly: false,
  automaticLayout: true,
  folding: true, // 默认开启折叠代码功能
  lineNumbers: 'on',
  wordWrap: 'off',
  formatOnPaste: true,
  fontSize: 12,
  tabSize: 2,
  scrollBeyondLastLine: false,
  fixedOverflowWidgets: false,
  snippetSuggestions: 'top',
  minimap: {
    enabled: false,
  },
  scrollbar: {
    vertical: 'auto',
    horizontal: 'auto',
  },
};

interface Props {
  type: string;
  value?: any;
}

export default class ValueFormItem extends Component<Props> {
  render() {
    const { type, ...restProps } = (this as any).props;
    let comp = null;

    switch (type) {
      case 'string':
        comp = <Input {...restProps} />;
        break;
      case 'number':
        comp = (
          <InputNumber
            className="data-create-form-inputNumber"
            {...restProps}
          />
        );
        break;
      case 'boolean':
        comp = (
          <Select {...restProps}>
            <Option value="true">true</Option>
            <Option value="false">false</Option>
          </Select>
        );
        break;
      case 'null':
        comp = <span>null</span>;
        break;
      case 'object':
        comp = (
          <BaseMonacoEditor
            height={200}
            language="json"
            options={monacoOptions}
            {...restProps}
          />
        );
        break;
      default:
        comp = null;
    }
    return comp;
  }
}
