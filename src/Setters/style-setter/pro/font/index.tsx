/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import Row from '../../components/row';
import Number from '../../components/number';
import { StyleData, OnStyleChange } from '../../utils/types';
import {
  Collapse,
  InputNumber as NumberPicker,
  Select,
  Slider as Range,
} from 'antd';
import ColorInput from '../../components/color-input';
import fontConfig from './config.json';
import { addUnit, isEmptyValue } from '../../utils';
import './index.less';

interface FontProps {
  styleData: StyleData | any;
  onStyleChange: OnStyleChange;
  fontPropsConfig?: any;
  unit?: string;
}
export default (props: FontProps) => {
  const { styleData, onStyleChange, fontPropsConfig } = props;
  const defaultFontPropsConfig = {
    // display 展示列表
    fontFamilyList: [
      { value: 'Helvetica', label: 'Helvetica' },
      { value: 'Arial', label: 'Arial' },
      { value: 'serif', label: 'serif' },
    ],
  };

  // 配置合并
  const propsConfig = { ...defaultFontPropsConfig, ...fontPropsConfig };

  const { fontWeight, textAlign } = fontConfig;

  const onNumberChange = (styleKey: string, value: number, unit?: string) => {
    onStyleChange([
      {
        styleKey,
        value: unit ? addUnit(value, unit) : value,
      },
    ]);
  };

  return (
    <Collapse 
      defaultActiveKey={['0']}
      items={[
        {
          key: '0',
          className: 'font-style-container',
          label: '文字',
          children: <>
            <div className="inner-row-contaienr">
              <div className="row-item">
                <span className="row-item-title">字号</span>
                <Number
                  max={100}
                  min={0}
                  styleKey="fontSize"
                  {...props}
                  style={{ marginRight: '10px', width: '100%' }}
                  // useComputedStyle={true}
                />
              </div>
              <div className="row-item">
                <span className="row-item-title">行高</span>
                <Number
                  min={0}
                  styleKey="lineHeight"
                  {...props}
                  style={{ width: '100%' }}
                  // useComputedStyle={true}
                />
              </div>
            </div>
            <Row title={'字重'} styleData={styleData} styleKey="">
              <Select
                style={{ width: '100%' }}
                value={styleData.fontWeight}
                allowClear
                onChange={(val) => onStyleChange([{ styleKey: 'fontWeight', value: val }])
                }
              >
                {fontWeight.dataList?.map((d) => (
                  <Select.Option key={d.value} value={d.value}>
                    {d.label}
                  </Select.Option>
                ))}
              </Select>
            </Row>
            <Row title={'字体'} styleData={styleData} styleKey="">
              <Select
                style={{ width: '100%' }}
                value={styleData.fontFamily}
                allowClear
                onChange={(val) => onStyleChange([{ styleKey: 'fontFamily', value: val }])
                }
              >
                {propsConfig.fontFamilyList?.map((d: { value: any, label: string }) => (
                  <Select.Option key={d.value} value={d.value}>
                    {d.label}
                  </Select.Option>
                ))}
              </Select>
            </Row>

            <Row title={'文字颜色'} styleKey="" {...props}>
              <ColorInput styleKey={'color'} {...props} inputWidth="100%" />
            </Row>

            <Row
              title={textAlign.title}
              dataList={textAlign.dataList}
              styleKey="textAlign"
              {...props}
            />

            <Row title={'透明度'} styleKey="opacity" {...props}>
              <div className="opacity-container">
                <Range
                  style={{ marginRight: '7px', width: '100%' }}
                  value={
                    !isEmptyValue(styleData.opacity) ? styleData.opacity * 100 : 0
                  }
                  onChange={(val) => onNumberChange(
                    'opacity',
                    parseInt(val as unknown as string) / 100
                  )
                  }
                />
                <NumberPicker
                  value={
                    !isEmptyValue(styleData.opacity)
                      ? Math.floor(styleData.opacity * 100)
                      : undefined
                  }
                  max={100}
                  min={0}
                  onChange={(val: number | null) => onNumberChange('opacity', isEmptyValue(val as number) ? 0 : val as number / 100)
                  }
                />
              </div>
            </Row>
          </>
        }
      ]}
      >
    </Collapse>
  );
};
