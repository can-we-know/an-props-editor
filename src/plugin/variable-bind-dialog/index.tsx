import React, { PureComponent, createRef } from 'react';
import { Input, Button, Modal } from 'antd';
import { JS_EXPRESSION } from '../../component/utils';
import { formatObjToArr } from '../../utils/format';
import BindVar from './bindVar';
import './index.less';

const { Search } = Input;

const helpText = '你可以通过点击左侧区域绑定变量或处理函数，当然你也可以选择新增变量进行绑定。<br>';

export default class VariableBindDialog extends PureComponent<any> {
  newVarRef = createRef();

  state = {
    visiable: false,
    jsCode: '',
    searchValue: '',
    variableListMap: {}, // 变量列表
    selParentVariable: null, // 选中的父级变量
    childrenVariableList: [], // 子级变量列表
    emitEditorChange: (val: any) => {},
  };

  openDialog = ({ pageState = {}, onChange, value }) => {
    let jsCode = '';
    // @ts-ignore
    if (value && JS_EXPRESSION === value.type) {
      jsCode = value.value;
    }
    this.setState({
      visiable: true,
      jsCode,
      emitEditorChange: onChange,
    }, () => {
      const { datasource = [], handleFns = [], state = [] } = pageState as any;
      const variableList = formatObjToArr(state);
      this.setState({
        selParentVariable: 'stateVariableList',
        childrenVariableList: variableList,
        variableListMap: {
          stateVariableList: {
            name: 'State属性',
            children: variableList,
          },
          methods: {
            name: '自定义处理函数',
            children: handleFns.map(name => `${name}()`),
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
      });
    });
  };

  componentDidMount() {
    (window as any).apePropsPanel.on('variableBindDialog.openDialog', this.openDialog);
  }

  componentWillUnmount(): void {
    (window as any).apePropsPanel.off('variableBindDialog.openDialog', this.openDialog);
  }

  closeDialog = () => {
    this.setState({
      visiable: false,
    });
  };

  onOk = async () => {
    const { emitEditorChange, jsCode } = this.state;
    if (this.newVarRef?.current) {
      const { getFormValues } = this.newVarRef.current as any;
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
          this.closeDialog();
        },
      });
      return;
    }
    emitEditorChange({
      type: JS_EXPRESSION,
      value: jsCode,
    });
    this.closeDialog();
  };

  removeTheBinding = () => {
    const { emitEditorChange } = this.state as any;
    emitEditorChange(null);
    this.closeDialog();
  };

  renderBottom = () => {
    const { jsCode } = this.state;
    return (
      <div className="variable-bind-dialog-bottom">
        <div className="bottom-left-container">
          {jsCode && jsCode.length > 0 && <Button onClick={this.removeTheBinding}>移除绑定</Button>}
        </div>

        <div className="bottom-right-container">
          <Button type="primary" onClick={this.onOk}>确定</Button>&nbsp;&nbsp;
          <Button onClick={this.closeDialog}>取消</Button>
        </div>
      </div>
    );
  };

  triggerSearch = (value: string) => {
    const { variableListMap, selParentVariable } = this.state;
    const selectedVariable = variableListMap[selParentVariable];
    if (!selectedVariable) {
      return;
    }

    let newChildrenVariableList = [];
    newChildrenVariableList = selectedVariable.children.filter((item) => item.indexOf(value) > -1);
    this.setState({
      childrenVariableList: newChildrenVariableList,
    });
  };

  onVariableSearchChange = (e) => {
    const { value } = e.currentTarget;
    this.setState({ searchValue: value });

    this.triggerSearch(value);
  };

  onVariableItemClick = (key: string) => () => {
    const { variableListMap } = this.state;
    this.setState({
      selParentVariable: key,
      childrenVariableList: variableListMap[key].children,
      searchValue: null,
    });

    // @ts-ignore
    this.newVarRef?.current?.clearAddNew();
  };

  onSelectItem = (value: string) => () => {
    // @ts-ignore
    this.newVarRef?.current?.clearAddNew();
    this.setState({ jsCode: value });
  };

  renderTitle = () => {
    return (
      <div className="variable-dialog-title">
        <span>变量绑定</span>
      </div>);
  };

  onCodeChange = (e) => {
    const { value } = e.target;
    this.setState({
      jsCode: value,
    });
  };


  render() {
    const {
      visiable,
      variableListMap,
      selParentVariable,
      childrenVariableList,
      jsCode,
      searchValue,
    } = this.state;
    return (
      <Modal
        width={770}
        visible={visiable}
        title={this.renderTitle()}
        onCancel={this.closeDialog}
        footer={this.renderBottom()}
      >
        <div className="ape-plugin-variable-dialog-body">
          <div className="dialog-left-container">
            <div className="dialog-small-title">变量列表</div>
            <div className="variable-selector-inner">
              <ul className="variable-selector-category variable-selector-ul">
                {
                  Object.keys(variableListMap).map((key) => {
                    return <li onClick={this.onVariableItemClick(key)} className={selParentVariable === key ? 'active' : ''} key={key}>{variableListMap[key].name}</li>;
                  })
                }
              </ul>
              <div className="variable-selector-items-container">
                <div className="search-control">
                  <Search
                    placeholder="搜索"
                    value={searchValue}
                    style={{ width: '100%' }}
                    onChange={this.onVariableSearchChange}
                  />
                </div>
                <ul className="variable-selector-items variable-selector-ul">
                  {childrenVariableList && childrenVariableList.map((item) => (
                    <li onClick={this.onSelectItem(item)} key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="dialog-right-container">
            {selParentVariable !== 'newVariable' &&
              <div className="ape-plugin-variable-right-dialog-input">
                <Input
                  addonBefore="绑定值："
                  placeholder="请输入变量或表达式"
                  autoComplete="off"
                  onChange={this.onCodeChange}
                  value={jsCode}
                />
                <div className="dialog-help-tip-input">
                  <p className="variable-content-desc-title">用法</p>
                  <p dangerouslySetInnerHTML={{ __html: helpText }} />
                </div>
              </div>}
            { selParentVariable === 'newVariable' && <BindVar varName={jsCode} wrappedComponentRef={this.newVarRef} />}
          </div>
        </div>
      </Modal>
    );
  }
}
