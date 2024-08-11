import * as antdIcons from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import { Input, Popover, Radio, RadioChangeEvent } from 'antd';
import React, {
  ChangeEvent,
  ElementType,
  SyntheticEvent,
  useMemo,
  useState,
} from 'react';

import './index.less';

const { Search } = Input;

type IconGroup = 'outlined' | 'filled' | 'two-tone' | 'iconfont';

const IconGroupNameMap: Record<IconGroup, string> = {
  outlined: '线框风格',
  filled: '实底风格',
  'two-tone': '双色风格',
  iconfont: 'Iconfont',
};

function getIconfontIconList() {
  // iconfont的js会在页面中添加svg元素
  const symbols = Array.prototype.slice.call(
    document.querySelectorAll(
      'svg[style="position: absolute; width: 0px; height: 0px; overflow: hidden;"][aria-hidden="true"] > symbol',
    ),
  );

  // const Icon = antdIcons.createFromIconfontCN();

  return symbols.map((symbol) => {
    const { id } = symbol;
    return {
      name: id,
      group: 'iconfont',
      icon: () => (
        <span role="img" className="anticon">
          <svg
            viewBox="64 64 896 896"
            width="1em"
            height="1em"
            fill="currentColor"
            dangerouslySetInnerHTML={{ __html: symbol.innerHTML }}
          />
        </span>
      ),
    };
  });
}

interface IconInfoType {
  name: string;
  group: keyof typeof IconGroupNameMap;
  icon: ElementType;
}

function getAntdIconList(): IconInfoType[] {
  return Object.keys(antdIcons)
    .map((key) => {
      const item = (antdIcons as any)[key];

      if (typeof item !== 'object') {
        return null;
      }

      const name = item?.displayName || item?.render?.displayName || key;
      let group: IconGroup = 'outlined';

      const lowercaseName = name.toLowerCase();

      if (/outlined$/.test(lowercaseName)) {
        group = 'outlined';
      } else if (/filled$/.test(lowercaseName)) {
        group = 'filled';
      } else if (/twotone$/.test(lowercaseName)) {
        group = 'two-tone';
      } else {
        return null;
      }

      return {
        name,
        group,
        icon: item,
      };
    })
    .filter(Boolean) as IconInfoType[];
}

function getIconList() {
  const iconfontIconList = getIconfontIconList();
  const antdIconList = getAntdIconList();

  return [...antdIconList, ...iconfontIconList];
}

const Icon = (props: any) => {
  const { type, icons = {}, ...rest } = props;
  const Comp = icons[type];
  if (!Comp) return null;
  return <Comp {...rest} />;
};

interface IconSetterProps {
  value: string;
  // type: string;
  defaultValue: string;
  placeholder: string;
  hasClear: boolean;
  onChange: (icon: string | object) => undefined;
  // icons: string[];
  metaInfo: Record<string, any>;
}

export default function IconSetter(props: IconSetterProps) {
  const {
    iconsMap: icons,
    curGroup: currentGroup,
    _groups: groups,
    selected: initSelectedGroup,
  } = useMemo(() => {
    const iconList = getIconList();
    const _groups: { group: IconGroup; list: any[] }[] = [];
    const iconsMap: any = {};
    iconList.forEach((item) => {
      const { group } = item || {};
      if (_groups.every((ele) => ele.group !== group)) {
        _groups.push({ group: group as IconGroup, list: [] });
      }
      const target = _groups.find((ele) => ele.group === group);
      target?.list?.push(item);
      iconsMap[item.name] = item?.icon;
    });
    const selected = _groups[0]?.group;
    const curGroup = _groups.find((item) => item.group === selected);
    return {
      iconsMap,
      curGroup,
      selected,
      _groups,
    };
  }, []);

  const [search, setSearch] = useState<string>('');
  const [list, setList] = useState<IconInfoType[]>(currentGroup?.list || []);
  const [selectedGroup, setSelectGroup] = useState<string>(initSelectedGroup);

  const {
    hasClear = false,
    placeholder = '请点击选择 Icon',
    metaInfo,
    onChange,
    value,
    defaultValue,
  } = props;

  const handleChange = (val: string) => () => {
    const { propType } = metaInfo || {};
    if (propType === 'string') {
      onChange(val);
    } else if (propType === 'node') {
      onChange({
        componentName: 'Icon',
        props: {
          type: val,
        },
      });
    }
  };

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    const curGroup = groups.find((item) => item.group === selectedGroup);
    const result = (curGroup?.list || []).filter((item) => {
      return search
        ? item.name.toLowerCase().indexOf((search as string).toLowerCase()) > -1
        : true;
    });
    setSearch(search);
    setList(result);
  };

  const onTabChange = (e: RadioChangeEvent) => {
    const selectedGroup = e.target.value;
    const currentGroup = groups.find((item) => item.group === selectedGroup);
    const list = (currentGroup?.list || []).filter((item) => {
      return search
        ? item.name.toLowerCase().indexOf((search as string).toLowerCase()) > -1
        : true;
    });
    setList(list);
    setSelectGroup(selectedGroup);
  };

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const renderContent = () => {
    return (
      <div className="ape-icon-content">
        <div className="ape-icon-content-header">
          <Radio.Group
            className="ape-icon-content-header-style"
            value={selectedGroup}
            onChange={onTabChange}
          >
            {groups.map((item) => (
              <Radio.Button key={item.group} value={item.group}>
                {IconGroupNameMap[item.group]}
              </Radio.Button>
            ))}
          </Radio.Group>
          <Search
            className="ape-icon-content-header-search"
            onChange={onSearch}
          />
        </div>
        <div className="ape-icon-content-content">
          <ul className="ape-icon-content-list">
            {list.map((item) => (
              <li
                key={item.name}
                className="ape-icon-content-list-item"
                onClick={handleChange(item.name)}
              >
                <Icon type={item.name} icons={icons} />
                <div className="ape-icon-content-list-item-name">
                  {item.name}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const onClearClick = (e: SyntheticEvent) => {
    e.preventDefault();
    // e.stopPropagation();
    handleChange('');
  };

  const currentIcon = (
    <Icon type={value} icons={icons} style={{ fontSize: 16 }} />
  );
  const clearIcon = hasClear && <DeleteOutlined onClick={onClearClick} />;
  return (
    <div className="ape-icon-setter">
      <Popover placement="leftTop" content={renderContent()}>
        <Input
          placeholder={placeholder}
          addonBefore={currentIcon}
          onChange={onValueChange}
          value={value}
          defaultValue={defaultValue}
          readOnly
          addonAfter={clearIcon}
        />
      </Popover>
    </div>
  );
}
