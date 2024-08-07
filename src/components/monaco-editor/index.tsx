import React from 'react';
import MonacoEditor from '@angroup/monaco-editor';
import ThemeContext from '../../theme-context';

const monacoOptions = {
  selectOnLineNumbers: true,
  fontSize: 13,
  lineHeight: 24,
  automaticLayout: true,
  formatOnPaste: true,
  formatOnType: true,
};

export default function BaseMonacoEditor(props: Record<string, any>) {
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <div className="ape-setter-monaco-editor">
          <MonacoEditor
            theme={theme === 'dark' ? 'vs-dark' : 'light'}
            options={monacoOptions}
            {...props}
          />
        </div>)}
    </ThemeContext.Consumer>);
}
