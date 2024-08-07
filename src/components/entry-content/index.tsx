import React from 'react';
import { LeftOutlined, ExportOutlined } from '@ant-design/icons';
import Title from '../title';
import PropsSetter from '../props-setter';
import './index.less';

export default function EntryContent(props: any)  {
  const { metaInfo = {}, onBack, setterMap, data, onEntryMetaInfoChange } = props;
  const { title, label } = metaInfo;
  return (
    <div className="ape-entry-content" >
      <div className="ape-entry-content-head" onClick={onBack}>
        <LeftOutlined />
        <div className="ape-entry-content-head-title"><Title title={title || label} /></div>
        <ExportOutlined />
      </div>
      <div >
        <PropsSetter onEntryMetaInfoChange={onEntryMetaInfoChange} propsInfo={metaInfo.items} setterMap={setterMap} value={data} />
      </div>
    </div>);
}

