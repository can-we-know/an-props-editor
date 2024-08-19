import { Form, Input, Select } from 'antd';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { supportVariableType, supportVariableTypeOptions } from './constants';
import './index.less';
import ValueFormItem from './valueFormItem';

const { Option } = Select;

type VariableTypeKey = keyof typeof supportVariableType;

const NewVarComp = forwardRef(function (props, ref) {
  const [newDataType, setNewDataType] = useState<VariableTypeKey>('string');
  const [form] = Form.useForm();

  // 外部使用，不可删除
  const clearAddNew = () => {
    setNewDataType('string');
  };

  const getFormValues = (): Promise<{
    key: string;
    type: string;
    value: string;
  }> => {
    const { validateFields } = form;
    return validateFields();
  };

  useImperativeHandle(ref, () => {
    return {
      clearAddNew,
      getFormValues,
    };
  });

  const onTypeChange = (value: VariableTypeKey) => {
    const defaultValue = supportVariableType[value]?.default;

    form.setFieldsValue({ value: defaultValue });
    setNewDataType(value);
  };

  return (
    <Form
      form={form}
      className="data-create-form"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
    >
      {/* 变量名称 */}
      <Form.Item
        label="变量名称"
        name="key"
        rules={[
          {
            required: true,
            message: '变量名称为必填项',
          },
          {
            pattern: /^[_a-zA-Z_$][_a-zA-Z0-9]*$/,
            message: '变量名称必须为小写字母 大写字母 _ $ 数字组合',
          },
        ]}
      >
        <Input placeholder="请输入合法JS变量名" autoComplete="off" />
      </Form.Item>

      {/* 数据类型 */}
      <Form.Item
        label="数据类型"
        name="type"
        rules={[{ required: true, message: '数据类型必选' }]}
      >
        <Select placeholder="请输入" onChange={onTypeChange}>
          {supportVariableTypeOptions?.map((i) => (
            <Option key={i.value} value={i.value}>
              {i.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* 变量值 */}
      <Form.Item
        label="变量值"
        name="value"
        rules={[{ required: true, message: '变量值为必填项' }]}
      >
        <ValueFormItem type={newDataType} />
      </Form.Item>
    </Form>
  );
});

export default NewVarComp;
