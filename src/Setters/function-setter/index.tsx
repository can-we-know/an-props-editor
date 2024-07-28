import Icon, * as Icons from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { js_beautify } from 'js-beautify';
import React from 'react';
import MonacoEditor from '../../components/monaco-editor';
import { JS_EXPRESSION } from '../utils';
import './index.less';
// TODO: 没有engine的event，暂时无法实现绑定函数，只实现了编辑函数

const defaultEditorOption = {
  width: '100%',
  height: 200,
  options: {
    readOnly: false,
    automaticLayout: true,
    folding: true, // 默认开启折叠代码功能
    lineNumbers: 'on',
    wordWrap: 'off',
    formatOnPaste: true,
    fontSize: 12,
    tabSize: 2,
    scrollBeyondLastLine: false,
    fixedOverflowWidgets: false,
    snippetSuggestions: 'top',
    minimap: {
      enabled: false,
    },
    scrollbar: {
      vertical: 'auto',
      horizontal: 'auto',
    },
  },
};

interface FunctionSetterProps {
  value: any;
  type: string;
  defaultValue: any;
  placeholder?: string;
  hasClear: boolean;
  onChange: (val: any) => void;
  removeProp: any;
}

const FunctionSetter: React.FC<FunctionSetterProps> = (
  props: FunctionSetterProps,
) => {
  const { value, defaultValue, removeProp = () => {} } = props;
  const val = value === undefined ? defaultValue : value;
  // 如果有变量绑定，则展示默认值
  const valueObj = value && value.type === JS_EXPRESSION ? defaultValue : val;
  const [isShowModal, setIsShowModal] = React.useState(false);
  const [functionCode, setFunctionCode] = React.useState('');

  const onChange = (e: any) => {
    const { onChange } = props;
    if (onChange) {
      onChange(e);
    }
  };

  const bindFunction = () => {};

  const openModal = () => {
    setIsShowModal(true);
    setFunctionCode(valueObj.value);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  const removeFunctionBind = () => {
    removeProp();
  };

  const parseFunctionName = (functionString: string) => {
    // 因为函数格式是固定的，所以可以按照字符换去匹配获取函数名
    return functionString.split('this.')[1]?.split('.')[0];
  };

  /**
   * 渲染按钮(初始状态)
   */
  const renderButton = () => {
    return (
      <Button size="small" onClick={() => bindFunction()}>
        绑定函数
      </Button>
    );
  };

  const updateCode = (newCode: string) => {
    setFunctionCode(newCode);
  };

  const onModalOk = () => {
    onChange({
      type: 'JSFunction',
      value: functionCode,
    });

    closeModal();
  };

  /**
   * 渲染绑定函数
   */
  const renderBindFunction = () => {
    return (
      <div className="function-container">
        <img
          className="funtion-icon"
          src="https://gw.alicdn.com/tfs/TB1NXNhk639YK4jSZPcXXXrUFXa-200-200.png"
        />
        {/* <span className="function-name" onClick={() => focusFunctionName(functionName)}>
          {functionName}
        </span> */}
        <Icon
          component={(Icons as any)['SettingOutlined']}
          className="funtion-operate-icon"
          onClick={() => bindFunction()}
        />
        <Icon
          component={(Icons as any)['DeleteOutlined']}
          className="funtion-operate-icon"
          onClick={removeFunctionBind}
        />
      </div>
    );
  };

  /**
   * 渲染编辑函数按钮(可直接编辑函数内容)
   */
  const renderEditFunctionButton = () => {
    return (
      <div>
        <Button size="small" type="primary" onClick={openModal}>
          <Icon type="edit" />
          编辑函数
        </Button>
      </div>
    );
  };

  let functionName = '';
  if (valueObj && valueObj.value) {
    functionName = parseFunctionName(valueObj.value);
  }

  let renderFunction;
  if (valueObj) {
    if (functionName) {
      renderFunction = renderBindFunction;
    } else {
      renderFunction = renderEditFunctionButton;
    }
  } else {
    renderFunction = renderButton;
  }

  return (
    <div className="lc-function-setter">
      {renderFunction()}

      {valueObj && valueObj.value && (
        <Modal
          open={isShowModal}
          closable={true}
          title="函数编辑"
          onCancel={closeModal}
          onOk={onModalOk}
          onClose={() => {
            closeModal();
          }}
        >
          <div style={{ width: '500px', height: '400px' }}>
            <MonacoEditor
              value={js_beautify(valueObj.value)}
              {...defaultEditorOption}
              {...{ language: 'javascript' }}
              onChange={(newCode: string) => updateCode(newCode)}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

FunctionSetter.displayName = 'FunctionSetter';

export default FunctionSetter;
