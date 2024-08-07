import React, { Component, forwardRef, LegacyRef } from 'react';
import { Input, Form } from 'antd';
import MonacoEditor from '../../component/monaco-editor';
import './index.less';

const DEFAULT_FUNC_PARAMS = 'function funcName() {\n    // 可以直接调用上下文函数\n    // this.setData({});\n}';
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

class NewFunctComp extends Component<any> {
  time = null;

  componentDidMount() {
    const { curMethod } = this.props;
    if (curMethod) {
      this.setFormValues(curMethod);
    }
  }

  getFormValues = (): Promise<{ funcName: string; funcBody: string }> => {
    return new Promise((resolve, reject) => {
      const { validateFields, getFieldsValue } = this.props.form;
      validateFields(null, {}, (error, values) => {
        if (!error) {
          resolve(values);
        }
        reject(error);
      });
    });
  };

  setFormValues = (curMethod: { methodName: string; methodBody: string }) => {
    const { setFieldsValue } = this.props.form;
    if (curMethod.methodName && curMethod.methodBody) {
      setFieldsValue({
        funcName: curMethod.methodName,
        funcBody: curMethod.methodBody,
      });
    }
  };

  clearFromValues = () => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({
      funcName: null,
      funcBody: DEFAULT_FUNC_PARAMS,
    });
  };

  render() {
    const { isEdit, initialValue } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form style={{ padding: '16px 0' }} labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
        <Form.Item label="名称" required style={formItemStyle}>
          {getFieldDecorator('funcName', {
            initialValue: '',
            rules: [
              { required: true, message: '名称不能为空' },
              { pattern: /^([a-z]|\$)([a-zA-Z0-9_])*$/, message: '函数名称不规范' },
            ],
          })(<Input placeholder="请输入函数名称" disabled={isEdit} />)}
        </Form.Item>
        <Form.Item label="函数" required style={formItemStyle}>
          {getFieldDecorator('funcBody', {
            initialValue: initialValue || DEFAULT_FUNC_PARAMS,
            rules: [
              { required: true, message: '函数不能为空' },
            ],
          })(
            <MonacoEditorWithRef
              {...defaultEditorOption}
              language="javascript"
              theme="vs-dark"
              width="100%"
              height={280}
            />
          )}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({
  onFieldsChange: (props, changeFields, allFields) => {
  },
})(NewFunctComp) as any;
