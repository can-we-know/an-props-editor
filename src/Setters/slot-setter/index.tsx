import { CloseOutlined } from '@ant-design/icons';
import { Button, Input, Select, Switch } from 'antd';
import React from 'react';
import { JS_EXPRESSION } from '../utils';
import './index.less';

interface Template {
  // 模板标签
  label: string;
  // 模板ID
  value: string;
  // 模板内容
  content: object;
}

interface SlotSetterProps {
  value: any;
  defaultValue: any;
  placeholder?: string;
  checkedText?: string;
  unCheckedText?: string;
  hideParams?: boolean;
  onChange: (val: any) => void;
  onInitial?: () => void;
  // 是否支持设置入参
  supportParams?: boolean;
  templates: Template[];
}

const SlotSetter: React.FC<SlotSetterProps> = (props: SlotSetterProps) => {
  const {
    value,
    defaultValue,
    onInitial,
    templates,
    supportParams,
    hideParams,
    checkedText = '启用',
    unCheckedText = '关闭',
  } = props;
  const val = value === undefined ? defaultValue : value;
  // 如果有变量绑定，则展示默认值
  const valueObj = value && value.type === JS_EXPRESSION ? defaultValue : val;

  const onChange = (e: any) => {
    const { onChange } = props;
    if (onChange) {
      onChange(e);
    }
  };

  const handleInitial = () => {
    if (onInitial) {
      onInitial();
      return;
    }

    onChange({
      type: 'JSSlot',
      value: null,
    });
  };

  const onChangeSwitch = (checked: boolean) => {
    if (checked) {
      handleInitial();
    } else {
      onChange(null);
    }
  };

  // 模板选择事件
  const onTemplateChange = (value: any) => {
    if (value === 'jsslot') {
      handleInitial();
    } else if (value === 'disable') {
      onChange(null);
    } else {
      const template = templates.find((item) => item.value === value);
      if (template) {
        onChange({
          ...template.content,
          name: template.value,
        });
      }
    }
  };

  const slotIsOpen = (initialValue: any) => {
    if (initialValue) {
      const { value, visible } = initialValue;
      if (value) {
        if (visible === undefined) {
          if (Array.isArray(value) && value.length === 0) {
            return false;
          } else if (value?.length > 0) {
            return true;
          }
        } else {
          return visible;
        }
      }
    }

    return false;
  };

  const isOpenSlot = slotIsOpen(valueObj);

  let switchComponent = null;
  if (templates) {
    // 模板场景下，使用下拉列表切换
    const templateName = valueObj?.name || (isOpenSlot ? 'jsslot' : 'disable');
    switchComponent = (
      <Select
        defaultValue={templateName}
        onChange={onTemplateChange}
        style={{ width: '100%' }}
      >
        {templates.map((template) => (
          <Select.Option key={template.value} value={template.value}>
            {template.label}
          </Select.Option>
        ))}
      </Select>
    );
  } else {
    // 标准场景下，使用开关进行切换
    switchComponent = (
      <Switch
        checked={!!valueObj}
        defaultChecked={isOpenSlot}
        onChange={(checked) => onChangeSwitch(checked)}
        size="small"
        checkedChildren={checkedText}
        unCheckedChildren={unCheckedText}
      />
    );
  }

  const hasParams =
    valueObj && valueObj.params && Array.isArray(valueObj.params);

  return (
    <div className="lc-setter-slot lc-setter-slot-column">
      {switchComponent}
      {!hideParams && hasParams ? (
        <Input
          className="lc-slot-params"
          addonBefore="入参"
          placeholder="插槽入参，以逗号分隔"
          value={valueObj.params!.join(',')}
          onChange={(e) => {
            const val = e.target.value.trim();
            const params = val ? val.split(/ *, */) : [];
            onChange({
              ...valueObj,
              params: params.length === 0 ? [''] : params,
            });
          }}
          addonAfter={
            <Button
              type="default"
              onClick={() => {
                onChange({
                  ...valueObj,
                  params: [''],
                });
              }}
            >
              <CloseOutlined />
            </Button>
          }
        />
      ) : supportParams ? (
        <Button
          className="lc-slot-params"
          type="primary"
          onClick={() => {
            onChange({
              ...valueObj,
              params: [],
            });
          }}
        >
          添加入参
        </Button>
      ) : null}
    </div>
  );
};

SlotSetter.displayName = 'SlotSetter';

export default SlotSetter;
