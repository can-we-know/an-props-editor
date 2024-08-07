import React, {
  PureComponent,
  ReactChild,
  ReactFragment,
  ReactPortal,
} from 'react';
import { Radio, Menu, Table, Icon } from 'antd';
import { observer } from 'mobx-react';
import { runInAction } from 'mobx';
// import nativeEvents from './native-events';
import { RadioChangeEvent } from 'antd/lib/Radio';
import { JS_FUNCTION } from '../utils';
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

export type DefinitionEventTypeEnum = 'events' | 'nativeEvents' | 'lifeCycleEvent';

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

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IProps {
  store: Record<string, any>;
  definition: any[];
}

class EventsSetter extends PureComponent<IProps> {
  state = {
    eventBtns: [
      {
        value: EVENT_CONTENTS.COMPONENT_EVENT,
        label: '组件自带事件',
      },
    ],
    editEventName: undefined,
    selectType: null,
  } as any;

  /**
   * 渲染事件信息
   */
  renderEventInfoCell = (_value, record, _index) => {
    const eventTagText = '组';
    return (
      <div key={record.name}>
        <div className="event-cell">
          <div className="event-type-tag">{eventTagText}</div>
          {record.name}
        </div>
        <div className="event-cell" style={{ marginTop: '8px' }}>
          <Icon type="paper-clip" className="related-icon" />
          <span
            className="related-event-name"
            onClick={this.onEventEdit(record.eventName, record.name)}
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
  renderEventOperateCell = (_rowIndex, record, _colIndex) => {
    return (
      <div key={record.name}>
        <Icon
          type="setting"
          className="event-operate-icon"
          style={{ marginLeft: '3px', marginRight: '4px' }}
          onClick={this.onEventEdit(record.eventName, record.name)}
        />
        <Icon
          type="delete"
          className="event-operate-icon"
          onClick={this.deleteEvent(record.name)}
        />
      </div>
    );
  };

  onRadioChange = (e: RadioChangeEvent) => {
    this.setState({
      selectType: e.target.value,
    });
  };

  onEventMenuClick = ({ key: eventName }: { key: string }) => {
    this.closeEventMenu();
    this.setState({
      editEventName: eventName,
    }, () => {
      this.onEventChange('');
      this.openDialog('');
    });
  };

  closeEventMenu = () => {
    if (this.state.selectType !== null) {
      this.setState({
        selectType: null,
      });
    }
  };

  deleteEvent = (eventName: string) => () => {
    const { store } = this.props;
    const eventDataList = store[EVENTS] || [];
    const selectedMap = this.getEventDataMap(eventDataList);

    runInAction(() => {
      delete selectedMap[eventName];
      const newEventDataList = Object.keys(selectedMap).map(key => selectedMap[key]);
      store[EVENTS] = newEventDataList;
    });
  };

  onEventChange = (event) => {
    const eventName = (event && event.type === JS_FUNCTION) ? event.value : event;
    // 新增函数方法Map
    const extInfo = (event && event.type === JS_FUNCTION) ? event.extInfo : null;
    const { editEventName } = this.state;
    const { store } = this.props;
    if (!editEventName) {
      return;
    }
    const eventDataList = store[EVENTS] || [];
    const selectedMap = this.getEventDataMap(eventDataList);

    runInAction(() => {
      selectedMap[editEventName] = {
        type: 'componentEvent',
        name: editEventName,
        eventName,
        extInfo,
      };
      const newEventDataList = Object.keys(selectedMap).map(key => selectedMap[key]);
      store[EVENTS] = newEventDataList;
    });
  };

  onEventEdit = (value, eventName) => () => {
    this.setState({
      editEventName: eventName,
    }, () => {
      this.openDialog(value);
    });
  };

  openDialog = async (value) => {
    const { apePropsPanel } = window as any;
    apePropsPanel.emit('functionBindDialog.openDialog', { pageState: apePropsPanel.pageState, onChange: this.onEventChange, value, methodList: apePropsPanel.methodList });
  };

  getEventDataMap = (eventDataList: any[] = []) => {
    const selectedMap = {};
    eventDataList.forEach(item => {
      selectedMap[item.name] = item;
    });
    return selectedMap;
  };

  render() {
    const {
      eventBtns,
      selectType,
    } = this.state;
    const { definition, store } = this.props;
    const eventDataList = store[EVENTS] || [];
    const selectedMap = this.getEventDataMap(eventDataList);

    return (
      <div className="event-body lowcode-setter-events" onClick={this.closeEventMenu}>
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
          onChange={this.onRadioChange}
          style={{ width: '100%' }}
        >
          {eventBtns?.map(
            (e: {
              value: any;
              label: boolean | ReactChild | ReactFragment | ReactPortal;
            }) => (
              <Radio.Button value={e.value} key={e.value}>{e.label}</Radio.Button>
            )
          )}
        </RadioGroup>
        {selectType && selectType !== EVENT_CONTENTS.NATIVE_EVENT && (
          <Menu
            defaultOpenKeys={definition.map((item: any) => `${item.index}`)}
            className="event-menu"
            onClick={this.onEventMenuClick}
            style={{
              width: document.body.clientWidth < 1860 ? '256px' : '357px',
            }}
          >
            {definition.map((item, index) => {
              const name: string = item.name || item;
              return (
                <Menu.Item
                  key={name || index}
                  disabled={selectedMap[name]}
                >
                  {name}
                </Menu.Item>);
            })}
          </Menu>
        )}

        <div className="event-table">
          <Table dataSource={eventDataList || []} size="small" rowKey="name" pagination={false}>
            <Table.Column key="events" title="已有事件" render={this.renderEventInfoCell} />
            <Table.Column
              title="操作"
              render={this.renderEventOperateCell}
              width={70}
              key="action"
            />
          </Table>
        </div>
      </div >
    );
  }
}

export default observer(EventsSetter);
