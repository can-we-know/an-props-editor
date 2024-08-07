import { Component } from 'react';
import * as React from 'react';
import { Input, Form, Select } from 'antd';
import { supportVariableType, supportVariableTypeOptions } from './constants';
import ValueFormItem from './valueFormItem';
import './index.less';

const { Option } = Select;

class NewVarComp extends Component<any> {
  time = null;

  state = {
    newDataType: 'string',
  };

  // 外部使用，不可删除
  clearAddNew() {
    this.setState({ newDataType: 'string' });
  }

  getFormValues = (): Promise<{ funcName: string; funcBody: string }> => {
    return new Promise((resolve, reject) => {
      const { validateFieldsAndScroll } = this.props.form;
      validateFieldsAndScroll(null, {}, (error, values) => {
        if (!error || (values.type === 'null' && !values.value)) {
          resolve(values);
        }
        reject(error);
      });
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { newDataType } = this.state;
    return (
      <Form
        className="data-create-form"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >

        {/* 变量名称 */}
        <Form.Item label="变量名称">
          {
            getFieldDecorator('key', {
              rules: [
                {
                  required: true,
                  message: '变量名称为必填项',
                },
                {
                  pattern: /^[_a-zA-Z_$][_a-zA-Z0-9]*$/,
                  message: '变量名称必须为小写字母 大写字母 _ $ 数字组合',
                },
              ],
            })(
              <Input
                placeholder="请输入合法JS变量名"
                autoComplete="off"
              />,
            )
          }
        </Form.Item>

        {/* 数据类型 */}
        <Form.Item label="数据类型">
          {
            getFieldDecorator('type', {
              rules: [
                { required: true, message: '数据类型必选' },
              ],
            })(
              <Select placeholder="请输入" onChange={this.onTypeChange}>
                { supportVariableTypeOptions?.map(i => (
                  <Option key={i.value} value={i.value}>
                    {i.label}
                  </Option>
                ))}
              </Select>,
            )
          }
        </Form.Item>

        {/* 变量值 */}
        <Form.Item label="变量值" >
          {
            getFieldDecorator('value', {
              rules: [
                { required: true, message: '变量值为必填项' },
              ],
            })(<ValueFormItem type={newDataType} />)
          }
        </Form.Item>
      </Form>
    );
  }

  private onTypeChange = (value) => {
    const { form } = this.props;
    const defaultValue = supportVariableType[value]?.default;

    form.setFieldsValue({ value: defaultValue });

    this.setState({ newDataType: value });
  };
}

export default Form.create({
  onFieldsChange: (props, changeFields, allFields) => {
    // const { setFieldsValue, getFieldValue } = props.form;
    // console.log('onFieldsChange: ', props, changeFields, allFields);
  },
})(NewVarComp) as any;
