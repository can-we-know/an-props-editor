import React from 'react';
import { Tooltip } from 'antd';

const I18N = 'i18n';
enum i18nType {
  'EN-US'= 'en-US',
  'ZH-CN'= 'zh-CN',
}


interface TitleProps {
  title: string | { label: string | Record<string, any>; tip: string };
}

export default function Title(props: TitleProps) {
  const { title } = props;
  if (typeof title === 'string') {
    return <>{title}</>;
  }
  const { label, tip } = title;
  let name: string = label as string;
  if (typeof label !== 'string' && label.type === I18N) {
    name = label[i18nType['ZH-CN']] || label[i18nType['EN-US']];
  }
  return <Tooltip title={tip} >{name}</Tooltip>;
}
