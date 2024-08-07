/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { Radio, Popover } from 'antd';
import { RadioItem, StyleData, OnStyleChange } from '../../utils/types';
import Icon from '../icon';
import './index.less';

const RadioGroup = Radio.Group;

interface RadioProps {
  dataList: RadioItem[];
  styleKey: string;
  // styleData?: StyleData | any;
  onStyleChange?: OnStyleChange;
  // 某些时候值并不是直接从StyleData中获取的，value值提供了外部定义的扩展
  value: string;
}

export default (props: RadioProps) => {
  const { dataList, styleKey, onStyleChange, value } = props;

  const onRadioChange = (key: string, val: string | number | boolean) => {
    onStyleChange([
      {
        styleKey: key,
        value: val,
      },
    ]);
  };

  const onRadioItemClick = (
    key: string,
    val: string | number | boolean,
    // eslint-disable-next-line no-shadow
    value: string
  ) => {
    if (value == val) {
      onStyleChange([
        {
          styleKey: key,
          value: null,
        },
      ]);
    }
  };

  return (
    <div className="radiogroup-style">
      {/* {value ? (
        <RadioGroup
          value={value}
          shape="button"
          onChange={(val) => onRadioChange(styleKey, val)}
          // onClick={(event) => {
          //   onRadioClick(event, styleKey, value);
          // }}
          aria-labelledby="groupId"
        >
          {dataList &&
            dataList.map((item: RadioItem) => (
              <Balloon
                trigger={
                  <Radio
                    id={item.value}
                    value={item.value}
                    onClick={(e) => {
                      onRadioItemClick(styleKey, e.currentTarget.id, value);
                    }}
                  >
                    {item.icon ? <Icon type={item.icon} size="small"></Icon> : item.title}
                  </Radio>
                }
                triggerType="hover"
                closable={false}
                align="t"
              >
                {item.tips}
              </Balloon>
            ))}
        </RadioGroup>
      ) : (
        <RadioGroup
          shape="button"
          onChange={(val) => onRadioChange(styleKey, val)}
          aria-labelledby="groupId"
        >
          {dataList &&
            dataList.map((item: RadioItem) => (
              <Balloon
                trigger={
                  <Radio id={item.value} value={item.value}>
                    {item.icon ? <Icon type={item.icon} size="small"></Icon> : item.title}
                  </Radio>
                }
                triggerType="hover"
                closable={false}
                align="t"
              >
                {item.tips}
              </Balloon>
            ))}
        </RadioGroup>
      )} */}
      <RadioGroup
        value={value}
        onChange={(e) => onRadioChange(styleKey, e.target.value)}
        aria-labelledby="groupId"
      >
        {dataList &&
          dataList.map((item: RadioItem) => (
            <Popover
              key={item.value}
              content={item.tips}
              trigger="hover"
              placement="top"
            >
              <Radio.Button
                id={item.value}
                value={item.value}
                onClick={(e) => {
                  onRadioItemClick(styleKey, e.currentTarget.id, value);
                }}
              >
                {item.icon ? (
                  <Icon type={item.icon} size="small" />
                ) : (
                  item.title
                )}
              </Radio.Button>
            </Popover>
          ))}
      </RadioGroup>
    </div>
  );
};
