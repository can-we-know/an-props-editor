import { formatObjToArr } from '@/common/format';
import { JS_EXPRESSION } from '@/common/utils';
import { Button, Input, Modal } from 'antd';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import BindVar from './bindVar';
import './index.less';

const { Search } = Input;

const helpText =
  '你可以通过点击左侧区域绑定变量或处理函数，当然你也可以选择新增变量进行绑定。<br>';

interface VariableBindStateType {
  visiable: boolean;
  jsCode: string;
  searchValue: string;
  variableListMap: Record<string, any>; // 变量列表
  selParentVariable: string;
  childrenVariableList: string[]; // 子级变量列表
  emitEditorChange: (val: any) => void;
}

interface NewRefType {
  clearAddNew: () => void;
  getFormValues: () => Promise<{ key: string; type: string; value: string }>;
}

interface OpenDialogStateType {
  pageState: Record<string, any>;
  onChange: (val: any) => void;
  value: any;
}

export default function VariableBindDialog() {
  const newVarRef = useRef<NewRefType>();
  const [state, setState] = useState<VariableBindStateType>({
    visiable: false,
    jsCode: '',
    searchValue: '',
    variableListMap: {}, // 变量列表
    selParentVariable: '', // 选中的父级变量
    childrenVariableList: [], // 子级变量列表
    emitEditorChange: () => {},
  });

  const openDialog = ({
    pageState = {},
    onChange,
    value,
  }: OpenDialogStateType) => {
    let jsCode = '';

    if (value && JS_EXPRESSION === value.type) {
      jsCode = value.value;
    }

    const {
      datasource = [],
      handleFns = [],
      state: curState = [],
    } = pageState as any;
    const variableList = formatObjToArr(curState);
    setState((oldState) => ({
      ...oldState,
      visiable: true,
      jsCode,
      emitEditorChange: onChange,
      selParentVariable: 'stateVariableList',
      childrenVariableList: variableList,
      variableListMap: {
        stateVariableList: {
          name: 'State属性',
          children: variableList,
        },
        methods: {
          name: '自定义处理函数',
          children: handleFns.map((name: string) => `${name}()`),
        },
        dataSource: {
          name: '数据源',
          children: datasource,
        },
        newVariable: {
          name: '新增变量',
          children: [],
        },
      },
    }));
  };

  useEffect(() => {
    (window as any).apePropsPanel.on(
      'variableBindDialog.openDialog',
      openDialog,
    );
    return () => {
      (window as any).apePropsPanel.off(
        'functionBindDialog.openDialog',
        openDialog,
      );
    };
  }, []);

  const closeDialog = () => {
    setState((oldState) => ({
      ...oldState,
      visiable: false,
    }));
  };

  const onOk = async () => {
    const { emitEditorChange, jsCode } = state;
    if (newVarRef?.current) {
      const { getFormValues } = newVarRef.current as any;
      const formFileds = await getFormValues();
      Modal.confirm({
        title: '确定更新当前绑定变量？',
        onOk: async () => {
          // @ts-ignore
          emitEditorChange({
            type: JS_EXPRESSION,
            value: formFileds.key,
            extInfo: formFileds,
          });
          closeDialog();
        },
      });
      return;
    }
    emitEditorChange({
      type: JS_EXPRESSION,
      value: jsCode,
    });
    closeDialog();
  };

  const removeTheBinding = () => {
    const { emitEditorChange } = state;
    emitEditorChange(null);
    closeDialog();
  };

  const renderBottom = () => {
    const { jsCode } = state;
    return (
      <div className="variable-bind-dialog-bottom">
        <div className="bottom-left-container">
          {jsCode && jsCode.length > 0 && (
            <Button onClick={removeTheBinding}>移除绑定</Button>
          )}
        </div>

        <div className="bottom-right-container">
          <Button type="primary" onClick={onOk}>
            确定
          </Button>
          &nbsp;&nbsp;
          <Button onClick={closeDialog}>取消</Button>
        </div>
      </div>
    );
  };

  const triggerSearch = (value: string) => {
    const { variableListMap, selParentVariable } = state;
    const selectedVariable = variableListMap[selParentVariable];
    if (!selectedVariable) {
      return;
    }

    let newChildrenVariableList = [];
    newChildrenVariableList = selectedVariable?.children?.filter(
      (item: string) => item.indexOf(value) > -1,
    );
    setState((oldState) => ({
      ...oldState,
      childrenVariableList: newChildrenVariableList,
    }));
  };

  const onVariableSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setState((oldState) => ({
      ...oldState,
      searchValue: value,
    }));

    triggerSearch(value);
  };

  const onVariableItemClick = (key: string) => () => {
    const { variableListMap } = state;
    setState((oldState) => ({
      ...oldState,
      selParentVariable: key,
      childrenVariableList: variableListMap[key].children,
      searchValue: '',
    }));
    newVarRef?.current?.clearAddNew();
  };

  const onSelectItem = (value: string) => () => {
    newVarRef?.current?.clearAddNew();
    setState((oldState) => ({
      ...oldState,
      jsCode: value,
    }));
  };

  const renderTitle = () => {
    return (
      <div className="variable-dialog-title">
        <span>变量绑定</span>
      </div>
    );
  };

  const onCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setState((oldState) => ({
      ...oldState,
      jsCode: value,
    }));
  };

  const {
    visiable,
    variableListMap,
    selParentVariable,
    childrenVariableList,
    jsCode,
    searchValue,
  } = state;
  return (
    <Modal
      width={770}
      open={visiable}
      title={renderTitle()}
      onCancel={closeDialog}
      footer={renderBottom()}
    >
      <div className="ape-plugin-variable-dialog-body">
        <div className="dialog-left-container">
          <div className="dialog-small-title">变量列表</div>
          <div className="variable-selector-inner">
            <ul className="variable-selector-category variable-selector-ul">
              {Object.keys(variableListMap).map((key) => {
                return (
                  <li
                    onClick={onVariableItemClick(key)}
                    className={selParentVariable === key ? 'active' : ''}
                    key={key}
                  >
                    {variableListMap[key].name}
                  </li>
                );
              })}
            </ul>
            <div className="variable-selector-items-container">
              <div className="search-control">
                <Search
                  placeholder="搜索"
                  value={searchValue}
                  style={{ width: '100%' }}
                  onChange={onVariableSearchChange}
                />
              </div>
              <ul className="variable-selector-items variable-selector-ul">
                {childrenVariableList &&
                  childrenVariableList.map((item) => (
                    <li onClick={onSelectItem(item)} key={item}>
                      {item}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="dialog-right-container">
          {selParentVariable !== 'newVariable' && (
            <div className="ape-plugin-variable-right-dialog-input">
              <Input
                addonBefore="绑定值："
                placeholder="请输入变量或表达式"
                autoComplete="off"
                onChange={onCodeChange}
                value={jsCode}
              />
              <div className="dialog-help-tip-input">
                <p className="variable-content-desc-title">用法</p>
                <p dangerouslySetInnerHTML={{ __html: helpText }} />
              </div>
            </div>
          )}
          {selParentVariable === 'newVariable' && <BindVar ref={newVarRef} />}
        </div>
      </div>
    </Modal>
  );
}
