import React, { useState, ReactNode, useEffect } from 'react';
import { Select } from 'antd';
import { JS_EXPRESSION } from '@/common/utils';
import { formatObjToArr } from '@/common/format';
import './index.less';

const { Option, OptGroup } = Select;

interface VariableSetterProps{
  placeholder?: string;
  onChange: (value: any) => void;
  value: any;
}

interface SelectOptionType {
  fnOptions: ReactNode[];
  varOptions: ReactNode[];
}

/**
   * 生成options
  */
function generateOptions(key?: string) {
  const { apePropsPanel: { pageState } = {} } = window;
  const { handleFns = [], state = {} } = pageState || {};
  const fnOptions = [];
  const varOptions = [];

  for (const i of handleFns) {
    if (!key || (key && i.startsWith(key))) {
      fnOptions.push(
        <Option key={i} value={`${i}()`}>
          <div className="variable-setter-code-input-value">{i}()</div>
        </Option>,
      );
    }
  }

  // 仅当用户输入后，进行深层遍历
  const stateArr = key ? formatObjToArr(state) : Object.keys(state);
  for (const i of stateArr) {
    if (!key || (key && i.startsWith(key))) {
      varOptions.push(
        <Option key={i} value={i}>
          <div className="variable-setter-code-input-value">{i}</div>
        </Option>,
      );
    }
  }
  return { fnOptions, varOptions };
}

export default function VariableSetter(props: VariableSetterProps) {
  const { placeholder = '请输入表达式', value, onChange } = props;
  const [ selectOption, setSelectOption ]  = useState<SelectOptionType>(() => generateOptions(value));
  const [ curInput, setCurINput ] = useState<string>('');

  useEffect(() => {
    setSelectOption(() => generateOptions(value));
  }, [value]);

  const onValueChange = (inputValue: string) => {
    if (onChange) {
      onChange({
        type: JS_EXPRESSION,
        value: inputValue,
      });
    }
  };

  const onSearch = (val: string) => {
    const option = generateOptions(val);
    setSelectOption(option);
    setCurINput(val);
  };

  const { fnOptions, varOptions } = selectOption;
  const valStr = (value && value.type === JS_EXPRESSION) ? value.value : value;
  return (
    <div className="ape-setter-variable">
      <Select
        className="variable-setter-select"
        showSearch
        placeholder={placeholder}
        value={valStr}
        onChange={onValueChange}
        onSearch={onSearch}
      >
        {
          curInput ? (
            <Option key={curInput} value={curInput} >
              <div className="variable-setter-code-input-value">{curInput}</div>
            </Option>
          ) : null
        }
        {
          varOptions.length ? (
            <OptGroup label="变量" key="varOptions">
              {varOptions}
            </OptGroup>
          ) : null
        }
        {
          fnOptions.length ? (
            <OptGroup label="函数" key="fnOptions">
              {fnOptions}
            </OptGroup>
          ) : null
        }
      </Select>
    </div>
  );
}
