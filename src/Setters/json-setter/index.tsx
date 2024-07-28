import { EditOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { js_beautify } from 'js-beautify';
import React, { useEffect } from 'react';
import MonacoEditor from '../../components/monaco-editor';
import { JS_EXPRESSION } from '../utils';

const defaultEditorOption = {
  width: '100%',
  height: '400px',
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
  throttle: 0,
  scrollbar: {
    vertical: 'auto',
    horizontal: 'auto',
  },
};

interface JsonSetterProps {
  value: any;
  defaultValue: string;
  placeholder?: string;
  onChange: (val: string) => void;
  removeProp: any;
}

const JsonSetter: React.FC<JsonSetterProps> = (props: JsonSetterProps) => {
  const { value, defaultValue, removeProp = () => {} } = props;
  const val = value === undefined ? defaultValue : value;
  // 如果有变量绑定，则展示默认值
  const [valueStr, setValueStr] = React.useState(
    value && value.type === JS_EXPRESSION ? defaultValue : val,
  );
  const [isShowModal, setIsShowModal] = React.useState(false);
  const [datasourceCode, setDatasourcenCode] = React.useState('');

  useEffect(() => {
    const nextValue = JSON.stringify(value);
    if (nextValue !== valueStr) {
      setValueStr(nextValue);
    }
  }, [value, valueStr]);

  const onChange = (e: any) => {
    const { onChange } = props;
    if (onChange) {
      onChange(e);
    }
  };

  const openModal = () => {
    setIsShowModal(true);
    setDatasourcenCode(valueStr);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  /**
   * 渲染按钮
   */
  const renderButton = (value: string) => {
    return !value ? (
      <Button size="small" type="default" onClick={openModal}>
        绑定数据
      </Button>
    ) : (
      <Button size="small" type="primary" onClick={openModal}>
        <EditOutlined />
        编辑数据
      </Button>
    );
  };

  const updateCode = (newCode: string) => {
    setDatasourcenCode(newCode);
  };

  const onModalOk = () => {
    if (datasourceCode && datasourceCode !== '') {
      try {
        onChange(JSON.parse(datasourceCode));
        closeModal();
      } catch (e: any) {
        console.log('数据保存失败', e.message);
      }
    } else {
      removeProp();
      closeModal();
    }
  };

  /**
   * 渲染编辑函数按钮(可直接编辑函数内容)
   */
  // const renderEditFunctionButton = () => {
  //   return (
  //     <div>
  //       <Button size="small" type="primary" onClick={openModal}>
  //         <EditOutlined />
  //         编辑数据
  //       </Button>
  //     </div>
  //   );
  // };

  return (
    <div>
      {renderButton(valueStr)}
      {
        <Modal
          open={isShowModal}
          closable={true}
          title={'编辑数据'}
          onCancel={closeModal}
          onOk={onModalOk}
          onClose={closeModal}
          cancelText={'取消'}
          okText={'确定'}
        >
          <div style={{ width: '500px', height: '400px' }}>
            <MonacoEditor
              value={js_beautify(value)}
              {...defaultEditorOption}
              {...{ language: 'json' }}
              onChange={(newCode: string) => updateCode(newCode)}
            />
          </div>
        </Modal>
      }
    </div>
  );
};

JsonSetter.displayName = 'JsonSetter';

export default JsonSetter;
