import { Menu, Radio, Table } from 'antd';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React, { ReactChild, ReactFragment, ReactPortal, useState } from 'react';
// import nativeEvents from './native-events';
import { JS_FUNCTION } from '@/common/utils';
import {
  DeleteOutlined,
  PaperClipOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { RadioChangeEvent } from 'antd/lib/Radio';
import './index.less';

const RadioGroup = Radio.Group;

export enum EventTypeEnum {
  componentEvent = 'componentEvent',
  nativeEvent = 'nativeEvent',
  lifeCycleEvent = 'lifeCycleEvent',
}

export const EVENT_CONTENTS = {
  COMPONENT_EVENT: EventTypeEnum.componentEvent,
  NATIVE_EVENT: EventTypeEnum.nativeEvent,
  LIFE_CYCLE_EVENT: EventTypeEnum.lifeCycleEvent,
};

export type DefinitionEventTypeEnum =
  | 'events'
  | 'nativeEvents'
  | 'lifeCycleEvent';

export const EVENTS = '__events';

export const DEFINITION_EVENT_TYPE = {
  EVENTS: 'events',
  NATIVE_EVENTS: 'nativeEvents',
  LIFE_CYCLE_EVENT: 'lifeCycleEvent',
};

export interface EventType {
  description: string;
  disabled: boolean;
  name: string;
}

export interface IProps {
  store: Record<string, any>;
  definition: any[];
}

export default observer(function EventsSetter(props: IProps) {
  const eventBtns = [
    {
      value: EVENT_CONTENTS.COMPONENT_EVENT,
      label: '组件自带事件',
    },
  ];
  const [editEventName, setEditEventName] = useState<string | undefined>(
    undefined,
  );
  const [selectType, setSelectType] = useState<string | null>(null);

  /**
   * 渲染事件信息
   */
  const renderEventInfoCell = (_value, record, _index) => {
    const eventTagText = '组';
    return (
      <div key={record.name}>
        <div className="event-cell">
          <div className="event-type-tag">{eventTagText}</div>
          {record.name}
        </div>
        <div className="event-cell" style={{ marginTop: '8px' }}>
          <PaperClipOutlined className="related-icon" />
          <span
            className="related-event-name"
            onClick={onEventEdit(record.eventName, record.name)}
          >
            {record.eventName || ''}
          </span>
        </div>
      </div>
    );
  };

  /**
   * 渲染事件操作项
   */
  const renderEventOperateCell = (_rowIndex, record, _colIndex) => {
    return (
      <div key={record.name}>
        <SettingOutlined
          className="event-operate-icon"
          style={{ marginLeft: '3px', marginRight: '4px' }}
          onClick={() => onEventEdit(record.eventName, record.name)}
        />
        <DeleteOutlined
          className="event-operate-icon"
          onClick={() => deleteEvent(record.name)}
        />
      </div>
    );
  };

  const onRadioChange = (e: RadioChangeEvent) => {
    setSelectType(e.target.value);
  };

  const onEventMenuClick = ({ key: eventName }: { key: string }) => {
    closeEventMenu();
    setEditEventName(eventName);
    onEventChange('');
    openDialog('');
  };

  const closeEventMenu = () => {
    if (selectType !== null) {
      setSelectType(null);
    }
  };

  const deleteEvent = (eventName: string) => () => {
    const { store } = props;
    const eventDataList = store[EVENTS] || [];
    const selectedMap = getEventDataMap(eventDataList);

    runInAction(() => {
      delete selectedMap[eventName];
      const newEventDataList = Object.keys(selectedMap).map(
        (key) => selectedMap[key],
      );
      store[EVENTS] = newEventDataList;
    });
  };

  const onEventChange = (event) => {
    const eventName = event && event.type === JS_FUNCTION ? event.value : event;
    // 新增函数方法Map
    const extInfo = event && event.type === JS_FUNCTION ? event.extInfo : null;
    const { store } = props;
    if (!editEventName) {
      return;
    }
    const eventDataList = store[EVENTS] || [];
    const selectedMap = getEventDataMap(eventDataList);

    runInAction(() => {
      selectedMap[editEventName] = {
        type: 'componentEvent',
        name: editEventName,
        eventName,
        extInfo,
      };
      const newEventDataList = Object.keys(selectedMap).map(
        (key) => selectedMap[key],
      );
      store[EVENTS] = newEventDataList;
    });
  };

  const onEventEdit = (value, eventName) => () => {
    setEditEventName(eventName);
    openDialog(value);
  };

  const openDialog = async (value) => {
    const { apePropsPanel } = window as any;
    apePropsPanel.emit('functionBindDialog.openDialog', {
      pageState: apePropsPanel.pageState,
      onChange: onEventChange,
      value,
      methodList: apePropsPanel.methodList,
    });
  };

  const getEventDataMap = (eventDataList: any[] = []) => {
    const selectedMap = {};
    eventDataList.forEach((item) => {
      selectedMap[item.name] = item;
    });
    return selectedMap;
  };

  const eventDataList = props.store[EVENTS] || [];
  const selectedMap = getEventDataMap(eventDataList);

  return (
    <div className="event-body lowcode-setter-events" onClick={closeEventMenu}>
      <div className="event-title">
        {eventBtns.length > 1 ? (
          <span>点击选择事件类型</span>
        ) : (
          <span>点击绑定事件</span>
        )}
      </div>

      <RadioGroup
        size="default"
        value={selectType}
        onChange={onRadioChange}
        style={{ width: '100%' }}
      >
        {eventBtns?.map(
          (e: {
            value: any;
            label: boolean | ReactChild | ReactFragment | ReactPortal;
          }) => (
            <Radio.Button value={e.value} key={e.value}>
              {e.label}
            </Radio.Button>
          ),
        )}
      </RadioGroup>
      {selectType && selectType !== EVENT_CONTENTS.NATIVE_EVENT && (
        <Menu
          defaultOpenKeys={props.definition.map((item: any) => `${item.index}`)}
          className="event-menu"
          onClick={onEventMenuClick}
          style={{
            width: document.body.clientWidth < 1860 ? '256px' : '357px',
          }}
        >
          {props.definition.map((item, index) => {
            const name: string = item.name || item;
            return (
              <Menu.Item key={name || index} disabled={selectedMap[name]}>
                {name}
              </Menu.Item>
            );
          })}
        </Menu>
      )}

      <div className="event-table">
        <Table
          dataSource={eventDataList || []}
          size="small"
          rowKey="name"
          pagination={false}
        >
          <Table.Column
            key="events"
            title="已有事件"
            render={renderEventInfoCell}
          />
          <Table.Column
            title="操作"
            render={renderEventOperateCell}
            width={70}
            key="action"
          />
        </Table>
      </div>
    </div>
  );
});
