import { Button, Input, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { JS_EXPRESSION } from '../../component/utils';
import { formatObjToArr } from '../../utils/format';
import BindVar from './bindVar';
import './index.less';

const { Search } = Input;

const helpText =
  '你可以通过点击左侧区域绑定变量或处理函数，当然你也可以选择新增变量进行绑定。<br>';

export default function VariableBindDialog(props: any) {
  const newVarRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [jsCode, setJsCode] = useState('');
  const [searchValue, setSearchValue] = useState<string | null>('');
  const [variableListMap, setVariableListMap] = useState<Record<string, any>>(
    {},
  );
  const [selParentVariable, setSelParentVariable] = useState<string | null>(
    null,
  );
  const [childrenVariableList, setChildrenVariableList] = useState([]);
  const [emitEditorChange, setEmitEditorChange] = useState<(val: any) => void>(
    () => {},
  );

  const openDialog = ({ pageState = {}, onChange, value }) => {
    let jsCode = '';
    // @ts-ignore
    if (value && JS_EXPRESSION === value.type) {
      jsCode = value.value;
    }
    setJsCode(jsCode);
    setEmitEditorChange(onChange);
    setVisible(true);

    const { datasource = [], handleFns = [], state = [] } = pageState as any;
    const variableList = formatObjToArr(state);
    setSelParentVariable('stateVariableList');
    setChildrenVariableList(variableList);
    setVariableListMap({
      stateVariableList: {
        name: 'State属性',
        children: variableList,
      },
      methods: {
        name: '自定义处理函数',
        children: handleFns.map((name) => `${name}()`),
      },
      dataSource: {
        name: '数据源',
        children: datasource,
      },
      newVariable: {
        name: '新增变量',
        children: [],
      },
    });
  };

  useEffect(() => {
    (window as any).apePropsPanel.on(
      'variableBindDialog.openDialog',
      openDialog,
    );
    return () => {
      (window as any).apePropsPanel.off(
        'variableBindDialog.openDialog',
        openDialog,
      );
    };
  }, [openDialog]);

  const closeDialog = () => {
    setVisible(false);
  };

  const onOk = async () => {
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
    emitEditorChange(null);
    closeDialog();
  };

  const renderBottom = () => {
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
    const selectedVariable = variableListMap[selParentVariable as string];
    if (!selectedVariable) {
      return;
    }

    let newChildrenVariableList = [];
    newChildrenVariableList = selectedVariable.children.filter(
      (item) => item.indexOf(value) > -1,
    );
    setChildrenVariableList(newChildrenVariableList);
  };

  const onVariableSearchChange = (e) => {
    const { value } = e.currentTarget;
    setSearchValue(value);

    triggerSearch(value);
  };

  const onVariableItemClick = (key: string) => () => {
    setSelParentVariable(key);
    setChildrenVariableList(variableListMap[key].children);
    setSearchValue(null);

    // @ts-ignore
    newVarRef?.current?.clearAddNew();
  };

  const onSelectItem = (value: string) => () => {
    // @ts-ignore
    newVarRef?.current?.clearAddNew();
    setJsCode(value);
  };

  const renderTitle = () => {
    return (
      <div className="variable-dialog-title">
        <span>变量绑定</span>
      </div>
    );
  };

  const onCodeChange = (e) => {
    const { value } = e.target;
    setJsCode(value);
  };

  return (
    <Modal
      width={770}
      open={visible}
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
                  value={searchValue as string}
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
          {selParentVariable === 'newVariable' && (
            <BindVar varName={jsCode} wrappedComponentRef={newVarRef} />
          )}
        </div>
      </div>
    </Modal>
  );
}
