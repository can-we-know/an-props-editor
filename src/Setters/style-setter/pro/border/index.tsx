/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { useState, useEffect } from 'react';
import Row from '../../components/row';
import Icon from '../../components/icon';
import Number from '../../components/number';
import ColorInput from '../../components/color-input';
import { StyleData, StyleDataItem, OnStyleChange } from '../../utils/types';
import { Collapse, Slider as Range, Select } from 'antd';
import fontConfig from './config.json';
import { addUnit, removeUnit } from '../../utils';

import './index.less';

const { Option } = Select;

const BORDER_MAX = 30;

const BorderDirectionMap = {
  borderLeft: 'borderLeft',
  borderRight: 'borderRight',
  borderTop: 'borderTop',
  borderBottom: 'borderBottom',
  border: 'border',
};

interface FontProps {
  styleData: StyleData | any;
  onStyleChange: OnStyleChange;
  unit?: string;
}
export default (props: FontProps) => {
  const { styleData, onStyleChange, unit } = props;
  const { borderType } = fontConfig;
  const [selBorderType, setSelBorderType] = useState<string>();
  const [borderDirection, setBorderDirection] = useState<string>();

  useEffect(() => {
    if (!borderDirection) {
      Object.keys(styleData).forEach((key: string) => {
        Object.keys(BorderDirectionMap).forEach((borderDirectionKey: string) => {
          if (key.indexOf(borderDirectionKey) >= 0) {
            setBorderDirection(borderDirectionKey);
            return;
          }
        });
      });
    }
  }, [borderDirection, styleData]);

  const onChangeBorderType = (styleDataList: StyleDataItem[]) => {
    if (styleDataList) {
      setSelBorderType(styleDataList[0].value as string);
    }
  };

  const onRangeChange = (styleKey: string, value: any, unit?: string) => {
    onStyleChange([
      {
        styleKey,
        value: unit ? addUnit(value, unit) : value,
      },
    ]);
  };

  const onIconClick = (styleKey: string) => {
    setBorderDirection(styleKey);
  };

  const onBorderTypeChange = (styleKey: string, value: string) => {
    onStyleChange([
      {
        styleKey,
        value,
      },
    ]);
  };

  return (
    <Collapse 
      defaultActiveKey={['0']}
      items={[
        {
          label: '边框',
          key: '0',
          className: 'border-style-container',
          children: <>
            <Row
              title={borderType.title}
              dataList={borderType.dataList}
              styleKey={'borderType'}
              {...props}
              onStyleChange={onChangeBorderType}
              value={selBorderType}
            />

            {selBorderType === 'fixedBorder' && (
              <Row title={' '} styleKey="borderRadius" {...props}>
                <div className="radius-container">
                  <Range
                    style={{ width: 150 }}
                    max={BORDER_MAX}
                    value={removeUnit(styleData.borderRadius) || 0}
                    onChange={(val) => onRangeChange('borderRadius', val, unit)}
                  />

                  <Number
                    styleKey="borderRadius"
                    // style={{ marginLeft: '5px' }}
                    {...props}
                    max={BORDER_MAX}
                  />
                </div>
              </Row>
            )}

            {selBorderType === 'partBorder' && (
              <>
                <Row
                  title={' '}
                  styleKey="borderRadius"
                  {...props}
                  contentStyle={{ justifyContent: 'space-between' }}
                >
                  <div className="row-item">
                    <Icon type="icon-radius-upleft" className="radius-icon" />
                    <Number
                      max={BORDER_MAX}
                      min={0}
                      styleKey="borderTopLeftRadius"
                      {...props}
                      // style={{ width: '60px' }}
                    />
                  </div>
                  <div className="row-item">
                    <Icon type="icon-radius-upright" className="radius-icon" />
                    <Number
                      max={BORDER_MAX}
                      styleKey="borderTopRightRadius"
                      {...props}
                      // style={{ width: '60px' }}
                    />
                  </div>
                </Row>
                <Row
                  title={' '}
                  styleKey="borderRadius"
                  {...props}
                  contentStyle={{ justifyContent: 'space-between' }}
                >
                  <div className="row-item">
                    <Icon type="icon-radius-bottomleft" className="radius-icon" />
                    <Number
                      max={BORDER_MAX}
                      styleKey="borderBottomLeftRadius"
                      {...props}
                      // style={{ width: '60px' }}
                    />
                  </div>
                  <div className="row-item">
                    <Icon type="icon-radius-bottomright" className="radius-icon" />
                    <Number
                      max={BORDER_MAX}
                      styleKey="borderBottomRightRadius"
                      {...props}
                      // style={{ width: '60px' }}
                    />
                  </div>
                </Row>
              </>
            )}

            <Row title={'边框'} styleKey="borderRadius" {...props}>
              <div className="border-container">
                <div className="border-icon-container">
                  <div className="top-icon-container">
                    <div
                      className={
                        borderDirection === BorderDirectionMap.borderTop
                          ? 'sel-icon icon-container'
                          : 'icon-container'
                      }
                      onClick={() => onIconClick('borderTop')}
                    >
                      <Icon type="icon--shangbiankuang" />
                    </div>
                  </div>
                  <div className="center-icon-container">
                    <div
                      className={
                        borderDirection === BorderDirectionMap.borderLeft
                          ? 'sel-icon icon-container'
                          : 'icon-container'
                      }
                      onClick={() => onIconClick('borderLeft')}
                    >
                      <Icon type="icon--zuobiankuang" />
                    </div>

                    <div
                      className={
                        borderDirection === BorderDirectionMap.border
                          ? 'sel-icon icon-container'
                          : 'icon-container'
                      }
                      onClick={() => onIconClick('border')}
                    >
                      <Icon type="icon--quanbubiankuang" />
                    </div>
                    <div
                      className={
                        borderDirection === BorderDirectionMap.borderRight
                          ? 'sel-icon icon-container'
                          : 'icon-container'
                      }
                      onClick={() => onIconClick('borderRight')}
                    >
                      <Icon type="icon--youbiankuang" />
                    </div>
                  </div>
                  <div className="bottom-icon-container">
                    <div
                      className={
                        borderDirection === BorderDirectionMap.borderBottom
                          ? 'sel-icon icon-container'
                          : 'icon-container'
                      }
                      onClick={() => onIconClick('borderBottom')}
                    >
                      <Icon type="icon--xiabiankuang" />
                    </div>
                  </div>
                </div>

                <div className="border-right-container">
                  {borderDirection && (
                    <>
                      <Number
                        min={0}
                        max={30}
                        className="border-width"
                        styleKey={`${borderDirection}Width`}
                        {...props}
                      />
                      <ColorInput styleKey={`${borderDirection}Color`} {...props} />
                      <Select
                        allowClear
                        style={{ marginTop: '10px' }}
                        value={styleData[`${borderDirection}Style`]}
                        onChange={(value: string) => {
                          onBorderTypeChange(`${borderDirection}Style`, value);
                        }}
                      >
                        <Option value="solid">solid</Option>
                        <Option value="dashed">dashed</Option>
                        <Option value="dotted">dotted</Option>
                      </Select>
                    </>
                  )}
                </div>
              </div>
            </Row>
          </>
        }
      ]}
      >
    </Collapse>
  );
};
