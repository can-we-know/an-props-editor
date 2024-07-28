import { Input, Row, Switch } from 'antd';
import React from 'react';
import { JS_EXPRESSION } from '../utils';

interface TitleSetterProps {
  field?: any;
  prop?: any;
  value: any;
  defaultValue: string;
  defaultChecked?: boolean;
  onChange: (val: string) => void;
}

const TitleSetter: React.FC<TitleSetterProps> = (props: TitleSetterProps) => {
  const { value, defaultValue, defaultChecked, field, prop, onChange } = props;
  const val = value === undefined ? defaultValue : value;
  // 如果有变量绑定，则展示默认值
  const valueStr = value && value.type === JS_EXPRESSION ? defaultValue : val;
  const [checked, setChecked] = React.useState(defaultChecked);
  const target = field || prop;
  const theVal = target?.getHotValue?.() || defaultValue || valueStr;

  const handleToggle = (vis: boolean) => {
    onChange?.(vis ? theVal : '');
    setChecked(vis);
  };
  const handleChangeText = (text: string) => {
    onChange?.(text);
  };

  return (
    <Row className="setter-title" align="middle" gutter={10}>
      <Switch size="small" checked={checked} onChange={handleToggle} />
      {checked && (
        <Input
          size="small"
          value={theVal}
          onChange={(e) => handleChangeText(e.target.value)}
        />
      )}
    </Row>
  );
};

TitleSetter.displayName = 'TitleSetter';

export default TitleSetter;
