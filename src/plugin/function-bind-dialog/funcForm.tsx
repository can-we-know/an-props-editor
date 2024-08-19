import BaseMonacoEditor from '@/components/monaco-editor';
import { Form, Input } from 'antd';
import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
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

// const MonacoEditorWithRef = forwardRef((props: any, ref) => (
//   <div ref={ref as LegacyRef<HTMLDivElement>}>
//     <BaseMonacoEditor {...props} />
//   </div>
// ));

export interface MethodType {
  methodName: string;
  methodBody: string;
}

interface NewFunctionPropsType {
  isEdit?: boolean;
  initialValue: string;
  curMethod?: MethodType;
}

const NewFunction = forwardRef(function (props: NewFunctionPropsType, ref) {
  const { isEdit, initialValue, curMethod } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    if (curMethod) {
      const { setFieldsValue } = form;
      if (curMethod.methodName && curMethod.methodBody) {
        setFieldsValue({
          funcName: curMethod.methodName,
          funcBody: curMethod.methodBody,
        });
      }
    }
  }, [curMethod]);

  const getFormValues = async () => {
    const { validateFields } = form;
    try {
      const values = await validateFields();
      return values;
    } catch (e) {
      console.log(e);
    }
  };

  const clearFromValues = () => {
    const { setFieldsValue } = form;
    setFieldsValue({
      funcName: null,
      funcBody: DEFAULT_FUNC_PARAMS,
    });
  };

  const setMethod = (curMethod: { methodName: string; methodBody: string }) => {
    const { setFieldsValue } = form;
    if (curMethod && curMethod.methodName && curMethod.methodBody) {
      setFieldsValue({
        funcName: curMethod.methodName,
        funcBody: curMethod.methodBody,
      });
    }
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        getFormValues,
        clearFromValues,
        setMethod,
      };
    },
    [],
  );

  return (
    <Form
      style={{ padding: '16px 0' }}
      form={form}
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 22 }}
    >
      <Form.Item
        label="名称"
        name="funcName"
        initialValue=""
        rules={[
          { required: true, message: '名称不能为空' },
          { pattern: /^([a-z]|\$)([a-zA-Z0-9_])*$/, message: '函数名称不规范' },
        ]}
        required
        style={formItemStyle}
      >
        <Input placeholder="请输入函数名称" disabled={isEdit} />
      </Form.Item>
      <Form.Item
        label="函数"
        name="funcBody"
        initialValue={initialValue || DEFAULT_FUNC_PARAMS}
        rules={[{ required: true, message: '函数不能为空' }]}
        required
        style={formItemStyle}
      >
        <BaseMonacoEditor
          {...defaultEditorOption}
          language="javascript"
          width="100%"
          height={280}
        />
      </Form.Item>
    </Form>
  );
});

export default NewFunction;
