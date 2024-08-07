/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import './index.less';
import { Input } from 'antd';
import { StyleData, OnStyleChange } from '../../utils/types';
import { addUnit, removeUnit } from '../../utils';

const KEY_ARROW_DOWN = 'ArrowDown';
const KEY_ARROW_UP = 'ArrowUp';

interface LayoutBoxProps {
  styleData: StyleData | any;
  onStyleChange: OnStyleChange;
  unit?: 'px';
  layoutPropsConfig: any;
}

export default (props: LayoutBoxProps) => {
  const { onStyleChange, unit = 'px', styleData, layoutPropsConfig } = props;

  const onInputChange = (styleKey: string, value: string) => {
    if (value !== '') {
      // 判断是否是数字
      if (!isNaN(value as unknown as number)) {
        onStyleChange([
          {
            styleKey,
            value: addUnit(value, unit),
          },
        ]);
      }
    } else {
      onStyleChange([
        {
          styleKey,
          value: null,
        },
      ]);
    }
  };

  const onInputKeyDown = (key: string, styleKey: string) => {
    const value = styleData[styleKey] || 0;
    if (key == KEY_ARROW_DOWN) {
      onStyleChange([
        {
          styleKey,
          value: addUnit(parseInt(value) - 1, unit),
        },
      ]);
    } else if (key == KEY_ARROW_UP) {
      onStyleChange([
        {
          styleKey,
          value: addUnit(parseInt(value) + 1, unit),
        },
      ]);
    }
  };

  return (
    <div className="layout-box-container">
      {layoutPropsConfig.isShowMargin && (
        <>
          <div className="margin-top-div">
            <span className="next-input next-medium next-noborder">
              <Input
                className="next-noborder"
                placeholder="0"
                maxLength={3}
                value={removeUnit(styleData.marginTop)}
                onChange={(e) => onInputChange('marginTop', e.target.value)}
                onKeyDown={(e) => onInputKeyDown(e.key, 'marginTop')}
              />
            </span>
          </div>
          <div className="margin-right-div">
            <span className="next-input next-medium next-noborder">
              <Input
                className="next-noborder"
                placeholder="0"
                maxLength={3}
                value={removeUnit(styleData.marginRight)}
                onChange={(e) => onInputChange('marginRight', e.target.value)}
                onKeyDown={(e) => onInputKeyDown(e.key, 'marginRight')}
              />
            </span>
          </div>
          <div className="margin-bottom-div">
            <span className="help-txt">MARGIN</span>
            <span className="next-input next-medium next-noborder">
              <Input
                className="next-noborder"
                placeholder="0"
                maxLength={3}
                value={removeUnit(styleData.marginBottom)}
                onChange={(e) => onInputChange('marginBottom', e.target.value)}
                onKeyDown={(e) => onInputKeyDown(e.key, 'marginBottom')}
              />
            </span>
          </div>
          <div className="margin-left-div">
            <span className="next-input next-medium next-noborder">
              <Input
                className="next-noborder"
                placeholder="0"
                maxLength={3}
                value={removeUnit(styleData.marginLeft)}
                onChange={(e) => onInputChange('marginLeft', e.target.value)}
                onKeyDown={(e) => onInputKeyDown(e.key, 'marginLeft')}
              />
            </span>
          </div>
        </>
      )}

      {layoutPropsConfig.isShowPadding && (
        <>
          <div className="padding-top-div">
            <span className="next-input next-medium next-noborder">
              <Input
                className="next-noborder"
                placeholder="0"
                maxLength={3}
                value={removeUnit(styleData.paddingTop)}
                onChange={(e) => onInputChange('paddingTop', e.target.value)}
                onKeyDown={(e) => onInputKeyDown(e.key, 'paddingTop')}
              />
            </span>
          </div>
          <div className="padding-right-div">
            <span className="next-input next-medium next-noborder">
              <Input
                className="next-noborder"
                placeholder="0"
                maxLength={3}
                value={removeUnit(styleData.paddingRight)}
                onChange={(e) => onInputChange('paddingRight', e.target.value)}
                onKeyDown={(e) => onInputKeyDown(e.key, 'paddingRight')}
              />
            </span>
          </div>
          <div className="padding-bottom-div">
            <span className="help-txt">PADDING</span>
            <span className="next-input next-medium next-noborder">
              <Input
                className="next-noborder"
                placeholder="0"
                maxLength={3}
                value={removeUnit(styleData.paddingBottom)}
                onChange={(e) => onInputChange('paddingBottom', e.target.value)}
                onKeyDown={(e) => onInputKeyDown(e.key, 'paddingBottom')}
              />
            </span>
          </div>
          <div className="padding-left-div">
            <span className="next-input next-medium next-noborder">
              <Input
                className="next-noborder"
                placeholder="0"
                maxLength={3}
                value={removeUnit(styleData.paddingLeft)}
                onChange={(e) => onInputChange('paddingLeft', e.target.value)}
                onKeyDown={(e) => onInputKeyDown(e.key, 'paddingLeft')}
              />
            </span>
          </div>
        </>
      )}
    </div>
  );
};
