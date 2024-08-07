import React, { PureComponent } from 'react';
import { Drawer } from 'antd';
import { StyleData } from '../../utils/types';
import { parseToStyleData, isSameStayleData } from '../../utils';
import MonacoEditor from '../../../monaco-editor';

interface CodeProps {
  visible: boolean;
  styleData: StyleData | any;
  cssCode: string;
  onStyleDataChange: (val: any) => void;
  onCssCodeChange: (cssCode: string) => void;
  changeCssCodeVisiable: (visable: boolean) => () => void;
}

const defaultEditorOption = {
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
};

export default class CssCode extends PureComponent<CodeProps> {
  updateCode = (newCode: string) => {
    const { onStyleDataChange, styleData, onCssCodeChange } = this.props;
    onCssCodeChange(newCode);
    const newStyleData = parseToStyleData(newCode);
    // 检查是否和原来的styleData完全相同
    if (isSameStayleData(newStyleData, styleData)) {
      return;
    }
    newStyleData && onStyleDataChange(newStyleData);
  };

  render() {
    const { visible, changeCssCodeVisiable, cssCode } = this.props;
    return (
      <Drawer
        width={360}
        visible={visible}
        destroyOnClose
        mask={false}
        title="css源码编辑"
        onClose={changeCssCodeVisiable(false)}
        style={{ right: 360 }}
      >
        <MonacoEditor
          value={cssCode}
          width={318}
          height={document.body.clientHeight - 90}
          language="css"
          options={{
            minimap: {
              enabled: false,
            },
            ...defaultEditorOption,
          }}
          onChange={this.updateCode}
        />
      </Drawer>
    );
  }
}
