import { Button, Input, message, Modal, Tabs, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
// import { toJS } from 'mobx';
// import MonacoEditor from '../../component/monaco-editor';
import { JS_FUNCTION } from '@/common/utils';
import FunctionForm from './funcForm';
import './index.less';

const { Search } = Input;

enum EventType {
  NEW_EVENT = 'NEW_EVENT',
  CUSTOM_EVENT = 'CUSTOM_EVENT',
}

interface Method {
  methodName: string;
  methodBody: string;
}

export default function FunctionBindDialog(props: any) {
  const newFuncRef = useRef<any>(null);
  const customFuncRef = useRef<any>(null);

  const [methodList, setMethodList] = useState<Method[]>([]);

  const [state, setState] = useState<any>({
    visiable: false,
    eventTab: EventType.CUSTOM_EVENT,
    selectedEventName: '',
    eventName: '',
    onValueChange: () => {},
    eventList: [],
    curMethod: null,
    initialValue: '',
  });

  const openDialog = ({
    pageState = {},
    onChange,
    value,
    methodList = [],
    initialValue,
  }) => {
    const { handleFns = [] } = pageState as any;
    setMethodList(methodList);
    let curMethod = null;
    if ((value && value.value) || typeof value === 'string') {
      // 遍历当前自定义方法列表，根据当前方法名进行过滤
      if (methodList?.length) {
        curMethod = getSelectMethodNode(value);
        if (curMethod && customFuncRef?.current) {
          // @ts-ignore
          this.customFuncRef.current.setFormValues(curMethod);
        }
      }
    }
    const eventName = value && value.type ? value.value : value;
    setState({
      visiable: true,
      eventTab: getCurrentEventTab(methodList, value), // 当前展示tab
      curMethod,
      eventName,
      selectedEventName: eventName,
      eventList: handleFns,
      onValueChange: onChange,
      initialValue,
    });
  };

  const getCurrentEventTab = (methodList, selectedEventName) => {
    if (selectedEventName) {
      return EventType.CUSTOM_EVENT;
    }
    return methodList?.length ? EventType.CUSTOM_EVENT : EventType.NEW_EVENT;
  };

  useEffect(() => {
    (window as any).apePropsPanel.on(
      'functionBindDialog.openDialog',
      openDialog,
    );
    return () => {
      (window as any).apePropsPanel.off(
        'functionBindDialog.openDialog',
        openDialog,
      );
    };
  }, []);

  const onInputChange = (e) => {
    setState({
      ...state,
      eventName: e.target.value,
    });
  };

  const onSelectItem = (eventName: string) => () => {
    // 事件选择匹配自定义事件Map: { methodName: '', methodBody: '' }
    const selectMethod = getSelectMethodNode(eventName);
    if (customFuncRef?.current && selectMethod) {
      // @ts-ignore
      this.customFuncRef.current.setFormValues(selectMethod || {});
    }
    setState({
      ...state,
      selectedEventName: eventName,
      eventName,
    });
  };

  const handleTabsChange = (key: string) => {
    if (key === EventType.NEW_EVENT && newFuncRef?.current) {
      // @ts-ignore
      const { clearFromValues } = this.newFuncRef.current;
      clearFromValues();
    }
    setState({ ...state, eventTab: key });
  };

  const pickupFunctionName = (codeStr) => {
    return codeStr.substr(0, codeStr.indexOf('('));
  };

  const removeSpace = (str) => {
    return str.replace(/\s*/g, '');
  };

  const getSelectMethodNode = (valueMap: string | any) => {
    const value = typeof valueMap === 'string' ? valueMap : valueMap?.value;
    const { length } = methodList;
    for (let i = 0; i < length; ++i) {
      const item = methodList[i];
      if (item.methodName === value) {
        return item;
      }
    }
  };

  const formatEventName = (eventName) => {
    const newEventNameArr = eventName.split('');
    const index = eventName.indexOf('.');
    if (index >= 0) {
      newEventNameArr[index + 1] = newEventNameArr[index + 1].toUpperCase();
    }
    return newEventNameArr.join('').replace(/\./, '');
  };

  const onOk = async () => {
    const { eventTab, onValueChange, eventName } = state;

    const currentRef: any =
      eventTab === EventType.CUSTOM_EVENT
        ? customFuncRef?.current
        : newFuncRef?.current;
    if (!currentRef) {
      return;
    }
    if (eventTab === EventType.NEW_EVENT) {
      const { getFormValues } = currentRef;
      const funcValues = await getFormValues();
      const result: any = {
        type: JS_FUNCTION,
        value: funcValues.funcName,
      };
      const hadMethod = getSelectMethodNode(funcValues.funcName);
      if (!hadMethod || hadMethod.methodBody !== funcValues.funcBody) {
        result.extInfo = funcValues;
      }
      Modal.confirm({
        title: hadMethod ? '当前事件已存在, 确定覆盖？' : '确定新建事件？',
        onOk: async () => {
          onValueChange(result);
          closeDialog();
        },
      });
    } else {
      // 如果当前没有选择事件，并且也不是新建场景 提交提示
      if (!eventName) {
        message.info('请选择绑定事件');
        return;
      }
      const curMethod = getSelectMethodNode(eventName);
      // 如果是不可编辑函数表达式则直接返回
      if (!curMethod) {
        onValueChange({
          type: JS_FUNCTION,
          value: eventName,
        });
        closeDialog();
        return;
      }
      const { getFormValues } = currentRef;
      const funcValues = await getFormValues();
      const result: any = {
        type: JS_FUNCTION,
        value: eventName,
      };

      if (curMethod && curMethod.methodBody !== funcValues.funcBody) {
        result.extInfo = funcValues;
      }
      Modal.confirm({
        title: result.extInfo ? '确定更新当前事件？' : '确定选择当前事件？',
        onOk: async () => {
          onValueChange(result);
          closeDialog();
        },
      });
    }
  };

  const closeDialog = () => {
    setState({
      ...state,
      visiable: false,
    });
  };

  const renderBottom = () => {
    return (
      <div className="variable-bind-dialog-bottom">
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

  const renderCustomFuncForm = () => {
    const { curMethod, selectedEventName, eventName, initialValue } = state;
    const selectMethod = getSelectMethodNode(selectedEventName);
    return (
      <>
        {!selectMethod && (
          <div>
            <div className="dialog-small-title">事件名称</div>
            <Input
              style={{ width: '100%' }}
              value={eventName}
              onChange={onInputChange}
            />
          </div>
        )}
        <div style={{ display: selectMethod ? 'block' : 'none' }}>
          <FunctionForm
            wrappedComponentRef={customFuncRef}
            curMethod={curMethod}
            isEdit
            initialValue={initialValue}
          />
        </div>
      </>
    );
  };

  const { selectedEventName, visiable, eventList, eventTab, initialValue } =
    state;
  return (
    <Modal
      open={visiable}
      width={850}
      title="事件绑定"
      onCancel={closeDialog}
      footer={renderBottom()}
    >
      <div className="event-dialog-body">
        <div className="dialog-left-container">
          <div className="dialog-small-title">事件选择</div>

          <div className="dialog-left-context">
            {/* <ul className="event-type-container">
              <li className="select-item">内置函数</li>
              <li className="select-item select-item-active">自定义事件</li>
            </ul> */}

            <div className="event-select-container">
              <Search className="event-search-box" />
              {eventTab === EventType.NEW_EVENT ? (
                <div className="mask" />
              ) : null}
              <ul className="event-list">
                {eventList.map((item, index) => (
                  <li
                    key={index}
                    className={
                      eventTab === EventType.CUSTOM_EVENT &&
                      selectedEventName === item
                        ? 'select-item select-item-active'
                        : 'select-item'
                    }
                    onClick={onSelectItem(item)}
                  >
                    <Tooltip placement="topLeft" title={`事件名称：${item}`}>
                      <div className="item-func-name">{item}</div>
                    </Tooltip>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="dialog-right-container">
          <Tabs activeKey={eventTab} onChange={handleTabsChange}>
            <Tabs.TabPane tab="自定义事件" key={EventType.CUSTOM_EVENT}>
              {renderCustomFuncForm()}
            </Tabs.TabPane>
            <Tabs.TabPane tab="新建事件" key={EventType.NEW_EVENT}>
              <FunctionForm
                wrappedComponentRef={newFuncRef}
                initialValue={initialValue}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </Modal>
  );
}
