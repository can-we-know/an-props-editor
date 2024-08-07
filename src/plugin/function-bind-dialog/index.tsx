import { Component } from 'react';
import * as React from 'react';
import { Modal, Input, Button, Tabs, message, Tooltip } from 'antd';
// import { toJS } from 'mobx';
// import MonacoEditor from '../../component/monaco-editor';
import './index.less';
import { JS_FUNCTION } from '../../component/utils';
import FunctionForm from './funcForm';

const { Search } = Input;

enum EventType {
  NEW_EVENT = 'NEW_EVENT',
  CUSTOM_EVENT = 'CUSTOM_EVENT',
}

interface Method {
  methodName: string;
  methodBody: string;
}

export default class FunctionBindDialog extends Component<any> {
  newFuncRef = React.createRef();

  customFuncRef = React.createRef();

  methodList: Method[] = [];

  state: any = {
    visiable: false,
    eventTab: EventType.CUSTOM_EVENT,
    selectedEventName: '',
    eventName: '',
    onValueChange: () => { },
    eventList: [],
    curMethod: null,
  };

  openDialog = ({ pageState = {}, onChange, value, methodList = [], initialValue }) => {
    const { handleFns = [] } = pageState as any;
    this.methodList = methodList;
    let curMethod = null;
    if ((value && value.value) || typeof value === 'string') {
      // 遍历当前自定义方法列表，根据当前方法名进行过滤
      if (methodList?.length) {
        curMethod = this.getSelectMethodNode(value);
        if (curMethod && this.customFuncRef?.current) {
          // @ts-ignore
          this.customFuncRef.current.setFormValues(curMethod);
        }
      }
    }
    const eventName = (value && value.type) ? value.value : value;
    this.setState({
      visiable: true,
      eventTab: this.getCurrentEventTab(methodList, value), // 当前展示tab
      curMethod,
      eventName,
      selectedEventName: eventName,
      eventList: handleFns,
      onValueChange: onChange,
      initialValue,
    });
  };

  getCurrentEventTab = (methodList, selectedEventName) => {
    if (selectedEventName) {
      return EventType.CUSTOM_EVENT;
    }
    return methodList?.length ? EventType.CUSTOM_EVENT : EventType.NEW_EVENT;
  };

  componentDidMount() {
    (window as any).apePropsPanel.on('functionBindDialog.openDialog', this.openDialog);
  }

  componentWillUnmount() {
    (window as any).apePropsPanel.off('functionBindDialog.openDialog', this.openDialog);
  }

  onInputChange = (e) => {
    this.setState({
      eventName: e.target.value,
    });
  };

  onSelectItem = (eventName: string) => () => {
    // 事件选择匹配自定义事件Map: { methodName: '', methodBody: '' }
    const selectMethod = this.getSelectMethodNode(eventName);
    if (this.customFuncRef?.current && selectMethod) {
      // @ts-ignore
      this.customFuncRef.current.setFormValues(selectMethod || {});
    }
    this.setState({
      selectedEventName: eventName,
      eventName,
    });
  };


  handleTabsChange = (key: string) => {
    if (key === EventType.NEW_EVENT && this.newFuncRef?.current) {
      // @ts-ignore
      const { clearFromValues } = this.newFuncRef.current;
      clearFromValues();
    }
    this.setState({ eventTab: key });
  };

  pickupFunctionName = (codeStr) => {
    return codeStr.substr(0, codeStr.indexOf('('));
  };

  removeSpace = (str) => {
    return str.replace(/\s*/g, '');
  };

  getSelectMethodNode = (valueMap: string | any) => {
    const value = typeof valueMap === 'string' ? valueMap : valueMap?.value;
    const { length } = this.methodList;
    for (let i = 0; i < length; ++i) {
      const item = this.methodList[i];
      if (item.methodName === value) {
        return item;
      }
    }
  };

  formatEventName = (eventName) => {
    const newEventNameArr = eventName.split('');
    const index = eventName.indexOf('.');
    if (index >= 0) {
      newEventNameArr[index + 1] = newEventNameArr[index + 1].toUpperCase();
    }
    return newEventNameArr.join('').replace(/\./, '');
  };

  onOk = async () => {
    const {
      eventTab,
      onValueChange,
      eventName,
    } = this.state;

    const currentRef: any = eventTab === EventType.CUSTOM_EVENT ? this.customFuncRef?.current : this.newFuncRef?.current;
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
      const hadMethod = this.getSelectMethodNode(funcValues.funcName);
      if (!hadMethod || hadMethod.methodBody !== funcValues.funcBody) {
        result.extInfo = funcValues;
      }
      Modal.confirm({
        title: hadMethod ? '当前事件已存在, 确定覆盖？' : '确定新建事件？',
        onOk: async () => {
          onValueChange(result);
          this.closeDialog();
        },
      });
    } else {
      // 如果当前没有选择事件，并且也不是新建场景 提交提示
      if (!eventName) {
        message.info('请选择绑定事件');
        return;
      }
      const curMethod = this.getSelectMethodNode(eventName);
      // 如果是不可编辑函数表达式则直接返回
      if (!curMethod) {
        onValueChange({
          type: JS_FUNCTION,
          value: eventName,
        });
        this.closeDialog();
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
          this.closeDialog();
        },
      });
    }
  };

  closeDialog = () => {
    this.setState({
      visiable: false,
    });
  };

  renderBottom = () => {
    return (
      <div className="variable-bind-dialog-bottom">
        <div className="bottom-right-container">
          <Button type="primary" onClick={this.onOk}>确定</Button>&nbsp;&nbsp;
          <Button onClick={this.closeDialog}>取消</Button>
        </div>
      </div>
    );
  };

  renderCustomFuncForm = () => {
    const { curMethod, selectedEventName, eventName, initialValue } = this.state;
    const selectMethod = this.getSelectMethodNode(selectedEventName);
    return (
      <>
        {!selectMethod &&
        <div>
          <div className="dialog-small-title">事件名称</div>
          <Input style={{ width: '100%' }} value={eventName} onChange={this.onInputChange} />
        </div>
        }
        <div style={{ display: selectMethod ? 'block' : 'none' }}>
          <FunctionForm wrappedComponentRef={this.customFuncRef} curMethod={curMethod} isEdit initialValue={initialValue} />
        </div>
      </>
    );
  };

  render() {
    const { selectedEventName, visiable, eventList, eventTab, initialValue } = this.state;
    return (
      <Modal
        visible={visiable}
        width={850}
        title="事件绑定"
        onCancel={this.closeDialog}
        footer={this.renderBottom()}
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
                {eventTab === EventType.NEW_EVENT ? <div className="mask" /> : null}
                <ul className="event-list">
                  {eventList.map((item, index) => (
                    <li
                      key={index}
                      className={
                        (eventTab === EventType.CUSTOM_EVENT && selectedEventName == item)
                          ? 'select-item select-item-active'
                          : 'select-item'
                      }
                      onClick={this.onSelectItem(item)}
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
            <Tabs activeKey={eventTab} onChange={this.handleTabsChange}>
              <Tabs.TabPane tab="自定义事件" key={EventType.CUSTOM_EVENT}>
                {this.renderCustomFuncForm()}
              </Tabs.TabPane>
              <Tabs.TabPane tab="新建事件" key={EventType.NEW_EVENT}>
                <FunctionForm wrappedComponentRef={this.newFuncRef} initialValue={initialValue} />
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      </Modal>
    );
  }
}
