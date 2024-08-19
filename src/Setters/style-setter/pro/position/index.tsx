/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import Row from '../../components/row';
import { Collapse, InputNumber as NumberPicker, Select } from 'antd';
import { useEffect } from 'react';
import PositionBox from '../position/positionBox';
import { StyleData, OnStyleChange } from '../../utils/types';
import positionConfig from './config.json';

interface LayoutProps {
  styleData: StyleData | any;
  onStyleChange: OnStyleChange;
  positionPropsConfig?: any;
}

export default function StyleSetterLayout(props: LayoutProps) {
  const { float, clear, position } = positionConfig;

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { onStyleChange, styleData, positionPropsConfig } = props;

  const { isShowFloat, isShowClear } = positionPropsConfig;

  const onZIndexChange = (zIndex: number | null) => {
    onStyleChange([{ styleKey: 'zIndex', value: zIndex }]);
  };

  const initData = () => {};

  useEffect(() => {
    initData();
  }, []);

  return (
    <Collapse 
      defaultActiveKey={['0']}
      items={[
        {
          label: '位置',
          key: '0',
          children: <>
            <Row title={position.title} styleData={styleData} styleKey="position">
              <Select
                style={{ minWidth: 100 }}
                value={styleData.position}
                allowClear
                onChange={(val) => onStyleChange([{ styleKey: 'position', value: val }])
                }
              >
                {position.dataList?.map((d) => (
                  <Select.Option key={d.value} value={d.value}>
                    {d.value}
                  </Select.Option>
                ))}
              </Select>
            </Row>

            {styleData.position && styleData.position !== 'static' && (
              <PositionBox
                {...props}
              />
            )}

            <Row title={'层叠顺序'} styleData={styleData} styleKey="zIndex">
              <NumberPicker
                step={1}
                precision={2}
                onChange={onZIndexChange}
                value={styleData.zIndex}
              />
            </Row>

            {isShowFloat && (
              <Row
                title={float.title}
                dataList={float.dataList}
                onStyleChange={onStyleChange}
                styleData={styleData}
                styleKey="float"
              />
            )}
            {isShowClear && (
              <Row
                title={clear.title}
                dataList={clear.dataList}
                onStyleChange={onStyleChange}
                styleData={styleData}
                styleKey="clear"
              />
            )}
          </>
        }
      ]}
      >
    </Collapse>
  );
};
