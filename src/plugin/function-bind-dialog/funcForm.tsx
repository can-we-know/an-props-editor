import MonacoEditor from '@/components/monaco-editor';
import { Form, Input } from 'antd';
import React, { forwardRef, LegacyRef, useEffect } from 'react';
import './index.less';

const DEFAULT_FUNC_PARAMS =
  'function funcName() {\n    // 可以直接调用上下文函数\n    // this.setData({});\n}';
const formItemStyle: React.CSSProperties = {
  // marginBottom: 8,
  // marginLeft: 0,
};

// 模板变量占位
const defaultEditorOption = {
  style: { width: '100%', height: '319px' },
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

const MonacoEditorWithRef = forwardRef((props: any, ref) => (
  <div ref={ref as LegacyRef<HTMLDivElement>}>
    <MonacoEditor {...props} />
  </div>
));

export default function NewFunctComp(props: any) {
  const [form] = Form.useForm();

  useEffect(() => {
    const { curMethod } = props;
    if (curMethod) {
      setFormValues(curMethod);
    }
  }, []);

  const getFormValues = async () => {
    const values = await form.validateFields();
    return values;
  };

  const setFormValues = (curMethod: {
    methodName: string;
    methodBody: string;
  }) => {
    if (curMethod.methodName && curMethod.methodBody) {
      form.setFieldsValue({
        funcName: curMethod.methodName,
        funcBody: curMethod.methodBody,
      });
    }
  };

  const clearFromValues = () => {
    form.setFieldsValue({
      funcName: null,
      funcBody: DEFAULT_FUNC_PARAMS,
    });
  };

  const { isEdit, initialValue } = props;
  return (
    <Form
      form={form}
      style={{ padding: '16px 0' }}
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 22 }}
    >
      <Form.Item
        label="名称"
        name="funcName"
        rules={[
          { required: true, message: '名称不能为空' },
          { pattern: /^([a-z]|\$)([a-zA-Z0-9_])*$/, message: '函数名称不规范' },
        ]}
        style={formItemStyle}
      >
        <Input placeholder="请输入函数名称" disabled={isEdit} />
      </Form.Item>
      <Form.Item
        label="函数"
        name="funcBody"
        initialValue={initialValue || DEFAULT_FUNC_PARAMS}
        rules={[{ required: true, message: '函数不能为空' }]}
        style={formItemStyle}
      >
        <MonacoEditorWithRef
          {...defaultEditorOption}
          language="javascript"
          theme="vs-dark"
          width="100%"
          height={280}
        />
      </Form.Item>
    </Form>
  );
}
