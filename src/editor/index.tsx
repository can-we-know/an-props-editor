import React, { useEffect, useState } from 'react';
import { Empty, Tabs } from 'antd';
import classNames from 'classnames';
// import EventEmitter from 'eventemitter3';
// import { observe, toJS } from 'mobx';
// import { setterConfig } from './setter-config';
import PropsStore from './store';
import StoreContext from './store/context';
import ThemeContext from '../theme-context';

const { TabPane } = Tabs;

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

export default function PropsEditor(props: any) {

  const [ store, setStore ] = useState<PropsStore>(); 

  useEffect(() => {
    const newStore = new PropsStore();
    setStore(newStore);
  }, []);

  const { metaInfo } = props;
  if (!metaInfo) {
    return <Empty description="请选择节点" />;
  }

  const { className, prefixCls, theme } = props;
  const cls = classNames({
    [prefixCls]: true,
    [className]: className,
  });
  return (
    <StoreContext.Provider value={store as PropsStore}>
        <ThemeContext.Provider value={theme}>
          <div className={cls}>
            <Tabs>
              <TabPane key={TabKey.PROPS} tab="属性">
                <div className="domino-props-tab-content">
                  {/* {!entryMetaInfo && (
                    <PropsSetter
                      key={componentName}
                      propsInfo={propsInfo}
                      onEntryMetaInfoChange={this.onEntryMetaInfoChange}
                      setterMap={setterMap}
                      value={this.store.data}
                    />
                  )} */}
                </div>
              </TabPane>
              </Tabs>
          </div>
        </ThemeContext.Provider>
    </StoreContext.Provider>
  );
}
