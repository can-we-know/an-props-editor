/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/default-props-match-prop-types */
import * as React from 'react';
import Layout from './pro/layout';
import Position from './pro/position';
import Font from './pro/font';
import Border from './pro/border';
import Background from './pro/background';
import CssCode from './components/css-code';
import { StyleData, StyleDataItem } from './utils/types';
import Icon from './components/icon';
import { ConfigProvider } from 'antd';
import './index.less';
import { parseToCssCode } from './utils';

export interface StyleSetterProps {
  // defaultValue: string;
  // placeholder: string;
  onChange: (val: any) => void;
  value: StyleData;
  // 是否展示css源码编辑面板
  isShowCssCode?: boolean;
  // 展示板块
  showModuleList?: ('background' | 'border' | 'font' | 'layout' | 'position')[];
}

export default class StyleSetterV2 extends React.PureComponent<StyleSetterProps, any> {
  static defaultProps = {
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

  constructor(props) {
    super(props);
    this.state = {
      cssCodeVisiable: false,
      cssCode: parseToCssCode(props.value),
    };
  }

  changeCssCodeVisiable = (visible: boolean) => () => {
    this.setState({
      cssCodeVisiable: visible,
    });
  };

  /**
   * style更改
   * @param styleKey
   * @param value
   */
  onStyleChange = (styleDataList: StyleDataItem[]) => {
    const { onChange, value } = this.props;
    const styleData: StyleData = Object.assign({}, value);
    styleDataList &&
      styleDataList.forEach((item) => {
        if (item.value === undefined || item.value === null) {
          delete styleData[item.styleKey];
        } else {
          styleData[item.styleKey] = item.value;
        }
      });
    this.setState({
      cssCode: parseToCssCode(styleData),
    });
    onChange && onChange(styleData);
  };

  onStyleDataChange = (styleData: StyleData) => {
    const { onChange } = this.props;
    onChange && onChange(styleData);
  };

  onCssCodeChange = (cssCode: string) => {
    this.setState({
      cssCode,
    });
  };

  render() {
    const { value: styleData = {}, isShowCssCode, showModuleList } = this.props;

    const { cssCode } = this.state;
    const showModuleMap: Record<string, boolean> = {};
    showModuleList.forEach((key) => {
      showModuleMap[key] = true;
    });
    const { cssCodeVisiable } = this.state;
    return (
      <ConfigProvider>
        <div className="lowcode-setter-style-v2">
          {isShowCssCode && (
            <div className="top-bar">
              <div
                onClick={this.changeCssCodeVisiable(true)}
                className={cssCodeVisiable ? 'top-icon-active' : 'top-icon'}
              >
                <Icon type="icon-CSS" className="top-bar-css-icon" />
              </div>
            </div>
          )}

          {showModuleMap.layout && (
            <Layout
              onStyleChange={this.onStyleChange}
              styleData={styleData}
              {...this.props}
            />
          )}

          {showModuleMap.font && (
            <Font
              onStyleChange={this.onStyleChange}
              styleData={styleData}
              {...this.props}
            />
          )}

          {showModuleMap.background && (
            <Background
              onStyleChange={this.onStyleChange}
              styleData={styleData}
              {...this.props}
            />
          )}

          {showModuleMap.position && (
            <Position
              onStyleChange={this.onStyleChange}
              styleData={styleData}
              {...this.props}
            />
          )}

          {showModuleMap.border && (
            <Border
              onStyleChange={this.onStyleChange}
              styleData={styleData}
              {...this.props}
            />
          )}

          {cssCodeVisiable && (
            <CssCode
              visible
              styleData={styleData}
              cssCode={cssCode}
              onCssCodeChange={this.onCssCodeChange}
              onStyleDataChange={this.onStyleDataChange}
              changeCssCodeVisiable={this.changeCssCodeVisiable}
            />
          )}
        </div>
      </ConfigProvider>
    );
  }
}
