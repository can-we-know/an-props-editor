import VariableIcon from '@/components/variable-icon';
import { PropsInfoType, SetterMetaItem, SetterType } from '@/types';
import { EditOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React, { ElementType, useEffect, useState } from 'react';
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

function onVariableBindClick({
  onChange,
  value,
}: {
  value: any;
  onChange: (val: any) => undefined;
}) {
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

const MixedSetterMap: Record<string, ElementType> = {
  StringSetter,
  SlotSetter,
  RadioGroupSetter,
  NumberSetter,
};

interface MixedItemPropsType {
  props: {
    setters: SetterMetaItem[];
  };
  value: any;
  onChange: (val: any) => undefined;
  defaultValue?: any;
}

function getSetterState(props: MixedItemPropsType) {
  const { props: { setters = [] } = {}, value } = props;
  addVariableSetter(setters);
  const setterInfo = setters[0];
  let setterKey =
    typeof setterInfo === 'string' ? setterInfo : setterInfo.componentName;
  const setter = getDefaultSetter(value, setters, true);
  setterKey = setter?.setterKey || setterKey;
  const SetterNode = MixedSetterMap[setterKey] || ErrorItem;
  return {
    setters,
    setterKey,
    SetterNode,
    setterInfo: setter?.setterInfo || setterInfo,
  };
}

export function MixedItem(props: MixedItemPropsType) {
  const [state, setState] = useState(getSetterState(props));

  useEffect(() => {
    setState(getSetterState(props));
  }, [props.props]);

  const onSetterChange = (key: string) => {
    const { value, onChange } = props;
    const { setters = [] } = state;
    let setterInfo: PropsInfoType['setter'] | undefined;
    setters.forEach((item: PropsInfoType['setter']) => {
      if (item === key || (item as SetterMetaItem).componentName === key) {
        setterInfo = item;
      }
    });
    if (
      setterInfo &&
      (setterInfo as SetterMetaItem).initialValue !== undefined
    ) {
      onChange(getInitialValue((setterInfo as SetterMetaItem).initialValue));
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
  const { defaultValue, value, onChange } = props;
  if (!SetterNode) {
    return null;
  }
  return (
    <>
      <SetterNode
        {...props}
        defaultValue={getInitialValue(setterInfo?.initialValue || defaultValue)}
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
