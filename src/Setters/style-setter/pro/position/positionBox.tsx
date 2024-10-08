/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { Input } from 'antd';
import { StyleData, StyleDataItem, OnStyleChange } from '../../utils/types';
import positionConfig from './config.json';
import Row from '../../components/row';
import { addUnit, removeUnit } from '../../utils';
import './index.less';

const KEY_ARROW_DOWN = 'ArrowDown';
const KEY_ARROW_UP = 'ArrowUp';

interface PositionBoxProps {
  styleData: StyleData | any;
  onStyleChange: OnStyleChange;
  unit?: 'px';
}

export default (props: PositionBoxProps) => {
  const { onStyleChange, styleData, unit = 'px' } = props;
  const { positionTemplete } = positionConfig;
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
    if (key === KEY_ARROW_DOWN) {
      onStyleChange([
        {
          styleKey,
          value: addUnit(parseInt(value) - 1, unit),
        },
      ]);
    } else if (key === KEY_ARROW_UP) {
      onStyleChange([
        {
          styleKey,
          value: addUnit(parseInt(value) + 1, unit),
        },
      ]);
    }
  };

  const onPositionTempleteChange = (styleDataList: StyleDataItem[]) => {
    // 解析模板的值
    styleDataList.forEach((item) => {
      if (item.value === 'topLeft') {
        onStyleChange([
          {
            styleKey: 'top',
            value: 0,
          },
          {
            styleKey: 'left',
            value: 0,
          },
          {
            styleKey: 'bottom',
            value: null,
          },
          {
            styleKey: 'right',
            value: null,
          },
        ]);
      } else if (item.value === 'topRight') {
        onStyleChange([
          {
            styleKey: 'top',
            value: 0,
          },
          {
            styleKey: 'left',
            value: null,
          },
          {
            styleKey: 'bottom',
            value: null,
          },
          {
            styleKey: 'right',
            value: 0,
          },
        ]);
      } else if (item.value === 'bottomLeft') {
        onStyleChange([
          {
            styleKey: 'top',
            value: null,
          },
          {
            styleKey: 'left',
            value: 0,
          },
          {
            styleKey: 'bottom',
            value: 0,
          },
          {
            styleKey: 'right',
            value: null,
          },
        ]);
      } else if (item.value === 'bottomRight') {
        onStyleChange([
          {
            styleKey: 'top',
            value: null,
          },
          {
            styleKey: 'left',
            value: null,
          },
          {
            styleKey: 'bottom',
            value: 0,
          },
          {
            styleKey: 'right',
            value: 0,
          },
        ]);
      }
    });
  };

  return (
    <div>
      {styleData.position && styleData.position === 'absolute' && (
        <Row
          dataList={positionTemplete.dataList}
          onStyleChange={onPositionTempleteChange}
          styleKey={'positionTemplete'}
        />
      )}

      <div className="position-box-container">
        <div className="top-div">
          <span className="next-input next-medium next-noborder">
            <Input
              className="next-noborder"
              placeholder="auto"
              maxLength={4}
              value={removeUnit(styleData.top)}
              onChange={(e) => onInputChange('top', e.target.value)}
              onKeyDown={(e) => onInputKeyDown(e.key, 'top')}
            />
          </span>
        </div>
        <div className="right-div">
          <span className="next-input next-medium next-noborder">
            <Input
              className="next-noborder"
              placeholder="auto"
              maxLength={4}
              value={removeUnit(styleData.right)}
              onChange={(e) => onInputChange('right', e.target.value)}
              onKeyDown={(e) => onInputKeyDown(e.key, 'right')}
            />
          </span>
        </div>
        <div className="bottom-div">
          <span className="next-input next-medium next-noborder">
            <Input
              className="next-noborder"
              placeholder="auto"
              maxLength={4}
              value={removeUnit(styleData.bottom)}
              onChange={(e) => onInputChange('bottom', e.target.value)}
              onKeyDown={(e) => onInputKeyDown(e.key, 'bottom')}
            />
          </span>
        </div>
        <div className="left-div">
          <span className="next-input next-medium next-noborder">
            <Input
              className="next-noborder"
              placeholder="auto"
              maxLength={4}
              value={removeUnit(styleData.left)}
              onChange={(e) => onInputChange('left', e.target.value)}
              onKeyDown={(e) => onInputKeyDown(e.key, 'left')}
            />
          </span>
        </div>
      </div>
    </div>
  );
};
