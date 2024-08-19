import React, { ElementType, useEffect, useState } from 'react';
import { Empty, Tabs } from 'antd';
import classNames from 'classnames';
// import EventEmitter from 'eventemitter3';
import { observe, toJS } from 'mobx';
import setterConfig from '../setter-config';
import PropsSetter from '../components/props-setter';
import PropsStore from './store';
import StoreContext from './store/context';
import ThemeContext, { ThemeEnum } from '../theme-context';
import { MetaInfoType, PropsInfoType } from '@/types';
import EntryContent from '@/components/entry-content';
import StyleSetterContainer from '@/components/style-setter-container';
import EventsSetter from '@/setters/events-setter';
// import { JS_SLOT } from '@/common/utils';

// const defaultProps = {
//   title: '',
//   prefixCls: 'an-props-editor-container',
//   theme: 'light',
// }

enum TabKey {
  PROPS = 'props',
  STYLE = 'style',
  EVENT = 'event',
}

export interface apePropsEditorPropsType {
  className?: string;
  prefixCls?: string; 
  theme?: ThemeEnum;
  metaInfo: MetaInfoType;
}


export default function AnPropsEditor(props: apePropsEditorPropsType) {

  const [ store ] = useState<PropsStore>(new PropsStore()); 
  const [ setterMap, setSetterMap ] = useState<Record<string, ElementType>>(setterConfig);
  const [ entryMetaInfo, setEntryMetaInfo ] = useState<PropsInfoType | null>(null);
  const { metaInfo } = props;
  useEffect(() => {
    return observe(store.data, (changeData: Record<string, any>) => {
      // const { name, newValue } = changeData;
      console.log('change', toJS(changeData));
      // this.emit('propChange', { propName: name, propValue: newValue });
    });
  }, []);

  if (!metaInfo) {
    return <Empty description="请选择节点" />;
  }

  const onEntryMetaInfoChange = (metaInfo: PropsInfoType) => {
    setEntryMetaInfo(metaInfo);
  };

  const onEntryBack = () => {
    setEntryMetaInfo(null);
  };

  const { configure, componentName } = metaInfo || {};
  const supports: any = configure?.supports || {};
  const { style, events } = supports;
  const propsInfo: PropsInfoType[] = configure?.props || [];
  const { className ='', prefixCls = 'ape-props-editor-container', theme = ThemeEnum.LIGHT } = props;
  const cls = classNames({
    [prefixCls]: true,
    [className]: className,
  });
  return (
    <StoreContext.Provider value={store}>
        <ThemeContext.Provider value={theme}>
          <div className={cls}>
            <Tabs 
              defaultActiveKey={TabKey.PROPS}
              items={[
                {
                  label: '属性',
                  key: TabKey.PROPS,
                  children: <div className="ape-props-tab-content">
                    {!entryMetaInfo && <PropsSetter key={componentName} propsInfo={propsInfo} onEntryMetaInfoChange={onEntryMetaInfoChange} setterMap={setterMap} value={store.data} />}
                    {entryMetaInfo && <EntryContent onBack={onEntryBack} setterMap={setterMap} onEntryMetaInfoChange={onEntryMetaInfoChange} data={store.data} metaInfo={entryMetaInfo} />}
                  </div>,
                },
                style && {
                  label: '样式',
                  key: TabKey.STYLE,
                  children: <div className="ape-props-tab-content">
                    <StyleSetterContainer store={store.data} name="style" />
                  </div>
                },
                events && {
                  label: '事件',
                  key: TabKey.EVENT,
                  children:  <div className="ape-props-tab-content">
                    <EventsSetter
                      definition={events}
                      store={store.data}
                    />
                </div>
                }
              ].filter(Boolean)}
            />
          </div>
        </ThemeContext.Provider>
    </StoreContext.Provider>
  );
}