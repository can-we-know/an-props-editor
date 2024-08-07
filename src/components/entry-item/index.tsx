import React from 'react';
import Title from '../title';
import { RightOutlined } from '@ant-design/icons';
import './index.less';
import { PropsInfoType } from '../../types';

interface EntryItemProps  {
  onClick: () => void;
  metaInfo: PropsInfoType;
}

export default function EntryItem(props: EntryItemProps) {

  const { metaInfo, onClick } = props;
    const { title, label } = metaInfo || {};
    return (
      <div className="ape-props-field ape-entry-field" onClick={onClick}>
        <div className="ape-entry-title"><Title title={title || label} /></div>
        <RightOutlined />
      </div>);
}


