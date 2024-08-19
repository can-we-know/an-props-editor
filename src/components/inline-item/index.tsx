import MixedSetter from '@/setters/mixed-setter';
import { Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { ElementType, useEffect, useState } from 'react';
import Title from '../title';
import VariableIcon from '../variable-icon';
// import ExtensionContext from '../../extension-context';
import { PropsItemPropsType } from '@/types/props-item';
import { JS_EXPRESSION, getInitialValue } from '../../common/utils';
import { SetterMetaItem, SetterType } from '../../types';
import './index.less';
import { ActionType, formatSetterState } from './setterHandle';

const BlockSetterKeys = ['ObjectSetter', 'ArraySetter'];

interface PropsInlineItemProps extends PropsItemPropsType {
  onChange: (val: any) => void;
}

interface SetterStateType {
  actionType: ActionType;
  setterList: (string | SetterMetaItem)[];
  setterInfo: string | SetterMetaItem;
  SetterNode: ElementType | null;
  setterKey: string;
}

const InlineItem = observer((props: PropsInlineItemProps) => {
  // static contextType = ExtensionContext;
  const { metaInfo, setterMap, value, onChange } = props;
  const { setter } = metaInfo;
  const [setterState, setSetterState] = useState<SetterStateType>(() =>
    formatSetterState(setter, value, setterMap),
  );

  const { actionType, setterList, setterInfo, SetterNode, setterKey } =
    setterState;

  useEffect(() => {
    setSetterState(() => formatSetterState(setter, value, setterMap));
  }, [setter]);

  const onSetterChange = (key: string) => {
    let info: string | SetterMetaItem = {} as SetterMetaItem;
    setterList.forEach((item) => {
      if (item === key || (item as SetterMetaItem).componentName === key) {
        info = item;
      }
    });
    if (typeof info === 'object' && info.initialValue !== undefined) {
      onChange(getInitialValue(info.initialValue));
    } else {
      onChange(undefined);
    }
    setSetterState((state) => ({
      ...state,
      setterKey: key,
      setterInfo: info,
      SetterNode: setterMap[key],
    }));
  };
  const onVariableBindClick = () => {
    const { apePropsPanel } = window as any;
    apePropsPanel.emit('variableBindDialog.openDialog', {
      pageState: apePropsPanel.pageState,
      onChange,
      value,
    });
  };
  if (!SetterNode) {
    if (setterKey) {
      console.error(
        new Error(
          `当前【setter】： ${setterKey}不存在，请检查低代码描述是否正确！`,
        ),
      );
    }
    return;
  }

  const { title, supportVariable, defaultValue } = metaInfo;

  const { props: propsFields = {}, initialValue } =
    setterInfo as SetterMetaItem;
  if (BlockSetterKeys.indexOf(setterKey) !== -1) {
    return (
      <SetterNode
        className="ape-props-field"
        title={<Title title={title} />}
        setterMap={setterMap}
        onChange={onChange}
        metaInfo={metaInfo}
        value={value}
        action={
          <MixedSetter
            value={setterKey}
            setters={setterList}
            onChange={onSetterChange}
          />
        }
        {...propsFields}
      />
    );
  }
  return (
    <div className="ape-props-field ape-inline-field">
      <div className="ape-inline-field-head">
        <Title title={title} />
      </div>
      <div className="ape-inline-field-body">
        <div className="ape-inline-field-setter">
          {SetterNode && (
            <SetterNode
              {...propsFields}
              defaultValue={getInitialValue(initialValue) || defaultValue}
              value={value}
              metaInfo={metaInfo}
              onChange={onChange}
            />
          )}
        </div>
        {actionType === ActionType.VARIABLE &&
          setterKey !== SetterType.FUNCTIONSETTER &&
          supportVariable !== false && (
            <Tooltip title="变量绑定">
              <div
                className={`ape-inline-field-action${
                  value && value.type === JS_EXPRESSION
                    ? ' ape-inline-field-action-active'
                    : ''
                }`}
              >
                <span onClick={onVariableBindClick}>
                  <VariableIcon />
                </span>
              </div>
            </Tooltip>
          )}
        {actionType === ActionType.MIXED && (
          <div className="ape-inline-field-action">
            <MixedSetter
              value={setterKey}
              setters={setterList}
              onChange={onSetterChange}
            />
          </div>
        )}
      </div>
    </div>
  );
});

export default InlineItem;
