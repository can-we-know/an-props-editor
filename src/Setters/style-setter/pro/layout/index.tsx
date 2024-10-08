import * as React from 'react';
import Row from '../../components/row';
import LayoutBox from './layoutBox';
import { Collapse } from 'antd';
import Number from '../../components/number';
import { StyleData, OnStyleChange } from '../../utils/types';
import layoutConfig from './config.json';

const { Panel } = Collapse;

interface LayoutProps {
  styleData: StyleData | any;
  onStyleChange: OnStyleChange;
  layoutPropsConfig?: any;
}

const defaultLayoutPropsConfig = {
  // display 展示列表
  showDisPlayList: ['inline', 'flex', 'block', 'inline-block', 'none'],
  isShowPadding: true,
  isShowMargin: true,
  isShowWidthHeight: true,
};

export default (props: LayoutProps) => {
  const { onStyleChange, styleData = {}, layoutPropsConfig } = props;

  // 配置合并
  const propsConfig = { ...defaultLayoutPropsConfig, ...layoutPropsConfig };

  // 传入配置
  const { showDisPlayList, isShowWidthHeight } = propsConfig;
  // 静态配置
  const { display, flexDirection, justifyContent, alignItems, flexWrap } =
    layoutConfig;

  const displayDataList = display.dataList.filter(
    (item) => showDisPlayList.indexOf(item.value) >= 0
  );

  return (
    <Collapse 
      defaultActiveKey={['0']}     
      items={[
        {
          label: '布局',
          key: '0',
          className: 'layout-style-container',
          children: <>
            <Row
              title={display.title}
              dataList={displayDataList}
              styleKey="display"
              {...props}
            />

            {styleData.display === 'flex' && (
              <>
                <Row
                  title={flexDirection.title}
                  dataList={flexDirection.dataList}
                  styleKey="flexDirection"
                  {...props}
                />
                <Row
                  title={justifyContent.title}
                  dataList={justifyContent.dataList}
                  styleKey="justifyContent"
                  {...props}
                />
                <Row
                  title={alignItems.title}
                  dataList={alignItems.dataList}
                  styleKey="alignItems"
                  {...props}
                />
                <Row
                  title={flexWrap.title}
                  dataList={flexWrap.dataList}
                  styleKey="flexWrap"
                  {...props}
                />
          </>
        )}

        <LayoutBox
          styleData={styleData}
          onStyleChange={onStyleChange}
          layoutPropsConfig={propsConfig}
        />

        {isShowWidthHeight && (
          <div className="inner-row-contaienr">
            <div className="row-item">
              <span className="row-item-title">宽度</span>
              <Number
                style={{ marginRight: '10px', width: '100%' }}
                min={0}
                styleKey="width"
                {...props}
                // useComputedStyle={true}
              />
            </div>
            <div className="row-item">
              <span className="row-item-title">高度</span>
              <Number
                styleKey="height"
                min={0}
                {...props}
                style={{ width: '100%' }}
                // useComputedStyle={true}
              />
            </div>
          </div>
        )}
          </>
        }
      ]}
      >
    </Collapse>
  );
};
