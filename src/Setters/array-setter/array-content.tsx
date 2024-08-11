import VariableIcon from '@/components/variable-icon';
import { EditOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  addVariableSetter,
  getDefaultSetter,
  getInitialValue,
  JS_EXPRESSION,
} from '../../common/utils';
import MixedSetter from '../mixed-setter';
import NumberSetter from '../number-setter';
import RadioGroupSetter from '../radiogroup-setter';
import SlotSetter from '../slot-setter';
import StringSetter from '../string-setter';
import { SetterType } from '../type';

function onVariableBindClick({ onChange, value }) {
  return () => {
    const { apePropsPanel } = window as any;
    apePropsPanel.emit('variableBindDialog.openDialog', {
      pageState: apePropsPanel.pageState,
      onChange,
      value,
    });
  };
}

function ObjectItem(props: any) {
  const { index, onItemChange } = props;
  return (
    <>
      <EditOutlined
        className="ape-setter-array-list-item-edit"
        onClick={onItemChange}
      />
      <div> 项目 {index}</div>
    </>
  );
}

function StringItem(props: any) {
  const { value, onChange, initialValue } = props;
  return (
    <>
      <StringSetter
        defaultValue={getInitialValue(initialValue)}
        value={value}
        onChange={onChange}
      />
      <Tooltip title="变量绑定">
        <div
          className={`ape-inline-field-action${
            value && value.type === JS_EXPRESSION
              ? ' ape-inline-field-action-active'
              : ''
          }`}
        >
          <span onClick={onVariableBindClick(props)}>
            <VariableIcon />
          </span>
        </div>
      </Tooltip>
    </>
  );
}

function SlotItem(props: any) {
  const { value, onChange } = props;
  return (
    <>
      <SlotSetter value={value} onChange={onChange} />
      <Tooltip title="变量绑定">
        <div
          className={`ape-inline-field-action${
            value && value.type === JS_EXPRESSION
              ? ' ape-inline-field-action-active'
              : ''
          }`}
        >
          <span onClick={onVariableBindClick(props)}>
            <VariableIcon />
          </span>
        </div>
      </Tooltip>
    </>
  );
}

function NumberItem(props: any) {
  const { value, onChange } = props;
  return (
    <>
      <NumberSetter value={value} onChange={onChange} />
      <Tooltip title="变量绑定">
        <div
          className={`ape-inline-field-action${
            value && value.type === JS_EXPRESSION
              ? ' ape-inline-field-action-active'
              : ''
          }`}
        >
          <span onClick={onVariableBindClick(props)}>
            <VariableIcon />
          </span>
        </div>
      </Tooltip>
    </>
  );
}
function RadioGroupItem(props: any) {
  const { value, onChange, props: setterProps = {}, initialValue } = props;
  return (
    <>
      <RadioGroupSetter
        defaultValue={getInitialValue(initialValue)}
        value={value}
        onChange={onChange}
        {...setterProps}
      />
      <Tooltip title="变量绑定">
        <div
          className={`ape-inline-field-action${
            value && value.type === JS_EXPRESSION
              ? ' ape-inline-field-action-active'
              : ''
          }`}
        >
          <span onClick={onVariableBindClick(props)}>
            <VariableIcon />
          </span>
        </div>
      </Tooltip>
    </>
  );
}

export function ErrorItem(props: any) {
  const { componentName } = props;
  return (
    <div className="ape-array-setter-item-error">{`ArraySetter中不支持${componentName},请检查！`}</div>
  );
}

const SetterMetaItemMap: any = {
  StringSetter: StringItem,
  ObjectSetter: ObjectItem,
  SlotSetter: SlotItem,
  RadioGroupSetter: RadioGroupItem,
  NumberSetter: NumberItem,
};

const MixedSetterMap = {
  StringSetter,
  SlotSetter,
  RadioGroupSetter,
  NumberSetter,
};

export function MixedItem(props: any) {
  const { props: { initSetters = [] } = {} } = props;
  addVariableSetter(initSetters);
  const [state, setState] = useState({
    setters: initSetters,
    setterInfo: initSetters[0],
    setterKey: '',
    SetterNode: null,
  });

  useEffect(() => {
    const { setters = [], value } = props;
    addVariableSetter(setters);
    const setterInfo = state.setterInfo || setters[0];
    let setterKey =
      typeof setterInfo === 'string' ? setterInfo : setterInfo.componentName;
    const setter = getDefaultSetter(value, setters, true);
    setterKey = setter?.setterKey || setterKey;

    if (setterKey === SetterType.VARIABLESETTER) {
      setState((prevState) => ({
        ...prevState,
      }));
    } else {
      const SetterNode = MixedSetterMap[setterKey] || ErrorItem;
      setState({
        setters,
        setterKey,
        SetterNode,
        setterInfo: setter?.setterInfo || setterInfo,
      });
    }
  }, [props]);

  const onSetterChange = (key: string) => {
    const { value, onChange } = props;
    const { setters } = state;
    let setterInfo;
    setters.forEach((item) => {
      if (item === key || item.componentName === key) {
        setterInfo = item;
      }
    });
    if (setterInfo && setterInfo.initialValue !== undefined) {
      onChange(getInitialValue(setterInfo.initialValue));
    } else {
      onChange(undefined);
    }
    if (key === SetterType.VARIABLESETTER) {
      onVariableBindClick({ value, onChange })();
      return;
    }
    setState({
      ...state,
      setterKey: key,
      setterInfo,
      SetterNode: MixedSetterMap[key] || ErrorItem,
    });
  };

  const { SetterNode, setterInfo, setterKey, setters } = state;

  return (
    <>
      <SetterNode
        {...props}
        defaultValue={setterInfo?.initialValue || defaultValue}
        value={value}
        onChange={onChange}
      />
      <div className="ape-inline-field-action">
        <MixedSetter
          value={setterKey}
          setters={setters}
          onChange={onSetterChange}
        />
      </div>
    </>
  );
}

SetterMetaItemMap.MixedSetter = MixedItem;

export default SetterMetaItemMap;
