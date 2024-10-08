/* eslint-disable react/jsx-no-bind */
import { Collapse, Input } from 'antd';
import React, { ChangeEvent, useEffect, useState } from 'react';
import ColorInput from '../../components/color-input';
import Icon from '../../components/icon';
import Row from '../../components/row';
import { OnStyleChange, StyleData, StyleDataItem } from '../../utils/types';
import borderConfig from './config.json';

interface FontProps {
  styleData: StyleData | any;
  onStyleChange: OnStyleChange;
  unit?: string;
}

enum BgTypeEnum {
  COLOR = 'color',
  BGIMG = 'bgImg',
}

export default (props: FontProps) => {
  const { onStyleChange, styleData } = props;
  const { backgroundType } = borderConfig;
  const [bgType, setBgType] = useState<BgTypeEnum>();

  const onBgTypeChange = (styleDataList: StyleDataItem[]) => {
    if (styleDataList) {
      setBgType(styleDataList[0].value as BgTypeEnum);
    }
  };

  const formatBgImgUrl = (url: string) => {
    if (url && url !== '') {
      return `url(${url})`;
    } else {
      return null;
    }
  };

  const backToBgImgUrl = (styleUrl: string) => {
    if (styleUrl) {
      // const reg = /^url\(.*\)/;
      // var result = styleUrl.match(reg);
      const newUrl = styleUrl.substring(
        styleUrl.indexOf('(') + 1,
        styleUrl.indexOf(')'),
      );

      return newUrl;
      // return styleUrl.substring(
      //   styleUrl.indexOf("(") + 1,
      //   styleUrl.indexOf(")") - 1
      // );
    } else {
      return '';
    }
  };

  const initData = () => {
    if (styleData.backgroundColor) {
      setBgType(BgTypeEnum.COLOR);
    } else if (styleData.backgroundImage) {
      setBgType(BgTypeEnum.BGIMG);
    }
  };

  useEffect(() => {
    initData();
  }, [styleData]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onStyleChange([
      {
        styleKey: 'backgroundImage',
        value: formatBgImgUrl(value),
      },
    ]);
  };

  return (
    <Collapse
      defaultActiveKey={['0']}
      items={[
        {
          key: '0',
          label: '背景',
          className: 'font-style-container',
          children: (
            <>
              <Row
                title={backgroundType.title}
                dataList={backgroundType.dataList}
                styleKey=""
                {...props}
                onStyleChange={onBgTypeChange}
                value={bgType}
              />

              {bgType === 'color' && (
                <Row title={' '} styleKey="" {...props}>
                  <ColorInput
                    styleKey={'backgroundColor'}
                    {...props}
                    inputWidth="100%"
                  />
                </Row>
              )}

              {bgType === 'bgImg' && (
                <Row title={' '} styleKey="" {...props}>
                  <Input
                    addonBefore={
                      <Icon type="icon-suffix-url" style={{ margin: 4 }} />
                    }
                    placeholder="输入图片url"
                    style={{ width: '100%' }}
                    value={backToBgImgUrl(styleData.backgroundImage)}
                    onChange={onInputChange}
                  />
                </Row>
              )}

              {/* <Row title={"透明度"} styleKey="opacity" {...props}>
              <div className="opacity-container">
                <Range
                  style={{ marginRight: "7px" }}
                  value={
                    !isEmptyValue(styleData.opacity) ? styleData.opacity * 100 : 0
                  }
                  onChange={(val) => onNumberChange("opacity", parseInt(val) / 100)}
                />
                <NumberPicker
                  value={
                    !isEmptyValue(styleData.opacity)
                      ? Math.floor(styleData.opacity * 100)
                      : undefined
                  }
                  max={100}
                  min={0}
                  onChange={(val) =>
                    onNumberChange("opacity", isEmptyValue(val) ? null : val / 100)
                  }
                ></NumberPicker>
              </div>
            </Row> */}
            </>
          ),
        },
      ]}
    ></Collapse>
  );
};
