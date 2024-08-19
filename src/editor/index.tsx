import EntryContent from '@/components/entry-content';
import StyleSetterContainer from '@/components/style-setter-container';
import pluginConfig from '@/plugin-config';
import EventsSetter from '@/setters/events-setter';
import { MetaInfoType, PropsInfoType } from '@/types';
import { Empty, Tabs } from 'antd';
import classNames from 'classnames';
import EventEmitter from 'eventemitter3';
import { observe, toJS } from 'mobx';
import React, {
  ElementType,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import PropsSetter from '../components/props-setter';
import setterConfig from '../setter-config';
import metaConfig from '../simple-meta.test';
import PropsStore from './store';
import StoreContext from './store/context';
import ThemeContext, { ThemeEnum } from './theme-context';
// import { JS_SLOT } from '@/common/utils';

enum TabKey {
  PROPS = 'props',
  STYLE = 'style',
  EVENT = 'event',
}

export interface apePropsEditorPropsType {
  className?: string;
  prefixCls?: string;
  theme?: ThemeEnum;
  // metaInfo: MetaInfoType;
}

const apePropsEditor = forwardRef(function (
  props: apePropsEditorPropsType,
  ref,
) {
  const [store] = useState<PropsStore>(new PropsStore());
  const [eventer] = useState<EventEmitter>(new EventEmitter());
  const [setterMap, setSetterMap] =
    useState<Record<string, ElementType>>(setterConfig);
  const [pluginMap, setPluginMap] =
    useState<Record<string, ElementType>>(pluginConfig);
  const [entryMetaInfo, setEntryMetaInfo] = useState<PropsInfoType | null>(
    null,
  );
  const [metaInfo, setMetaInfo] = useState<MetaInfoType>(metaConfig);

  const registerSetter = (setterObj: Record<string, ElementType>) => {
    setSetterMap((oldMap) => ({
      ...oldMap,
      ...setterObj,
    }));
  };

  const registerPlugin = (myPluginMap: Record<string, ElementType>) => {
    setPluginMap((oldPlugins) => ({
      ...oldPlugins,
      ...myPluginMap,
    }));
  };

  const on = function (event: string, fn: () => void, ...rest: any[]) {
    eventer.on(event, fn, ...rest);
  };

  const off = function (event: string, fn: () => void) {
    eventer.off(event, fn);
  };

  const emit = function (event: string, ...parmas: any[]) {
    eventer.emit(event, ...parmas);
  };

  const onEntryMetaInfoChange = (metaInfo: PropsInfoType) => {
    setEntryMetaInfo(metaInfo);
  };

  const onEntryBack = () => {
    setEntryMetaInfo(null);
  };

  const refObj = {
    registerSetter,
    registerPlugin,
    on,
    off,
    emit,
    setMetaInfo,
  };

  useMemo(() => {
    window.apePropsPanel = refObj;
  }, []);

  useEffect(() => {
    return observe(store.data, (changeData: Record<string, any>) => {
      const { name, newValue } = changeData;
      console.log('change', toJS(changeData));
      emit('propChange', { propName: name, propValue: newValue });
    });
  }, []);

  useImperativeHandle(ref, () => refObj);

  if (!metaInfo) {
    return <Empty description="请选择节点" />;
  }

  const { configure, componentName } = metaInfo || {};
  const supports: any = configure?.supports || {};
  const { style, events } = supports;
  const propsInfo: PropsInfoType[] = configure?.props || [];
  const {
    className = '',
    prefixCls = 'ape-props-editor-container',
    theme = ThemeEnum.LIGHT,
  } = props;
  const cls = classNames({
    [prefixCls]: true,
    [className]: className,
  });
  const pluginList = Object.keys(pluginMap).map((key) => pluginMap[key]);

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
                children: (
                  <div className="ape-props-tab-content">
                    {!entryMetaInfo && (
                      <PropsSetter
                        key={componentName}
                        propsInfo={propsInfo}
                        onEntryMetaInfoChange={onEntryMetaInfoChange}
                        setterMap={setterMap}
                        value={store.data}
                      />
                    )}
                    {entryMetaInfo && (
                      <EntryContent
                        onBack={onEntryBack}
                        setterMap={setterMap}
                        onEntryMetaInfoChange={onEntryMetaInfoChange}
                        data={store.data}
                        metaInfo={entryMetaInfo}
                      />
                    )}
                  </div>
                ),
              },
              style && {
                label: '样式',
                key: TabKey.STYLE,
                children: (
                  <div className="ape-props-tab-content">
                    <StyleSetterContainer store={store.data} name="style" />
                  </div>
                ),
              },
              events && {
                label: '事件',
                key: TabKey.EVENT,
                children: (
                  <div className="ape-props-tab-content">
                    <EventsSetter definition={events} store={store.data} />
                  </div>
                ),
              },
            ].filter(Boolean)}
          />
        </div>
        {pluginList.map((Plugin, index) => (
          <Plugin key={index} />
        ))}
      </ThemeContext.Provider>
    </StoreContext.Provider>
  );
});

export default apePropsEditor;
