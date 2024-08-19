// import { ConfigProvider } from 'antd';
import React, { useState } from 'react';
import CssCode from './components/css-code';
import Icon from './components/icon';
import './index.less';
import Background from './pro/background';
import Border from './pro/border';
import Font from './pro/font';
import Layout from './pro/layout';
import Position from './pro/position';
import { parseToCssCode } from './utils';
import { StyleData, StyleDataItem } from './utils/types';

export interface StyleSetterProps {
  // defaultValue: string;
  // placeholder: string;
  onChange: (val: any) => void;
  value: StyleData;
  // 是否展示css源码编辑面板
  isShowCssCode?: boolean;
  // 展示板块
  showModuleList?: ('background' | 'border' | 'font' | 'layout' | 'position')[];
  [key: string]: any;
}

const defaultProps = {
  // 默认单位
  unit: 'px',
  // 默认计算尺寸缩放
  placeholderScale: 1,
  // 展示板块
  showModuleList: ['background', 'border', 'font', 'layout', 'position'],
  // 是否展示css源码编辑面板
  isShowCssCode: true,
  // layout 配置面板
  layoutPropsConfig: {
    // display 展示列表
    showDisPlayList: ['inline', 'flex', 'block', 'inline-block', 'none'],
    isShowPadding: true,
    isShowMargin: true,
    isShowWidthHeight: true,
  },

  fontPropsConfig: {
    // fontFamily列表
    fontFamilyList: [
      { value: 'Helvetica', label: 'Helvetica' },
      { value: 'Arial', label: 'Arial' },
      { value: 'serif', label: 'serif' },
    ],
  },

  // position 配置面板
  positionPropsConfig: {
    isShowFloat: true,
    isShowClear: true,
  },
};

export default function StyleSetter(props: StyleSetterProps) {
  const [cssCodeVisiable, setCssCodeVisiable] = useState(false);
  const [cssCode, setCssCode] = useState(parseToCssCode(props.value));

  const changeCssCodeVisiable = (visible: boolean) => () => {
    setCssCodeVisiable(visible);
  };

  /**
   * style更改
   * @param styleKey
   * @param value
   */
  const onStyleChange = (styleDataList: StyleDataItem[]) => {
    const { onChange, value } = props;
    const styleData: StyleData = Object.assign({}, value);
    if (styleDataList) {
      styleDataList.forEach((item) => {
        if (item.value === undefined || item.value === null) {
          delete styleData[item.styleKey];
        } else {
          styleData[item.styleKey] = item.value;
        }
      });
    }
    setCssCode(parseToCssCode(styleData));
    if (onChange) onChange(styleData);
  };

  const onStyleDataChange = (styleData: StyleData) => {
    const { onChange } = props;
    if (onChange) onChange(styleData);
  };

  const onCssCodeChange = (cssCode: string) => {
    setCssCode(cssCode);
  };

  const {
    value: styleData = {},
    isShowCssCode = defaultProps.isShowCssCode,
    showModuleList = defaultProps.showModuleList,
  } = props;
  const showModuleMap: Record<string, boolean> = {};
  showModuleList.forEach((key) => {
    showModuleMap[key] = true;
  });
  return (
    // <ConfigProvider>
      <div className="lowcode-setter-style-v2">
        {isShowCssCode && (
          <div className="top-bar">
            <div
              onClick={changeCssCodeVisiable(true)}
              className={cssCodeVisiable ? 'top-icon-active' : 'top-icon'}
            >
              <Icon type="icon-CSS" className="top-bar-css-icon" />
            </div>
          </div>
        )}

        {showModuleMap.layout && (
          <Layout
            onStyleChange={onStyleChange}
            styleData={styleData}
            {...defaultProps}
            {...props}
          />
        )}

        {showModuleMap.font && (
          <Font
            onStyleChange={onStyleChange}
            styleData={styleData}
            {...defaultProps}
            {...props}
          />
        )}

        {showModuleMap.background && (
          <Background
            onStyleChange={onStyleChange}
            styleData={styleData}
            {...defaultProps}
            {...props}
          />
        )}

        {showModuleMap.position && (
          <Position
            onStyleChange={onStyleChange}
            styleData={styleData}
            {...defaultProps}
            {...props}
          />
        )}

        {showModuleMap.border && (
          <Border
            onStyleChange={onStyleChange}
            styleData={styleData}
            {...defaultProps}
            {...props}
          />
        )}

        {cssCodeVisiable && (
          <CssCode
            visible
            styleData={styleData}
            cssCode={cssCode}
            onCssCodeChange={onCssCodeChange}
            onStyleDataChange={onStyleDataChange}
            changeCssCodeVisiable={changeCssCodeVisiable}
          />
        )}
      </div>
    // </ConfigProvider>
  );
}
