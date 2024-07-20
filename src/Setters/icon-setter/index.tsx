import Icon, * as Icons from '@ant-design/icons';
import { Col, Input, Modal, Row } from 'antd';
import React from 'react';
import { JS_EXPRESSION } from '../utils';

interface IconSetterProps {
  value: any;
  defaultValue: string;
  placeholder?: string;
  onChange: (val: string) => void;
}

const IconSetter: React.FC<IconSetterProps> = (props: IconSetterProps) => {
  const { placeholder, value, defaultValue, onChange } = props;
  const val = value === undefined ? defaultValue : value;
  const [visible, setVisible] = React.useState(false);
  const [selectedIcon, setSelectedIcon] = React.useState(
    value && value.type === JS_EXPRESSION ? defaultValue : val,
  );

  const handleIconClick = (iconName: any) => {
    setSelectedIcon(iconName);
    if (onChange) {
      onChange(iconName);
    }
    setVisible(false);
  };

  const renderIcons = React.useMemo(() => {
    return Object.keys(Icons)
      .filter((item) => typeof (Icons as any)[item] === 'object')
      .map((iconName) => {
        const IconComponent = (Icons as any)[iconName];
        return (
          <Col
            key={iconName}
            span={6}
            style={{ textAlign: 'center', margin: '10px 0' }}
          >
            <Icon
              component={IconComponent}
              style={{ fontSize: '24px', cursor: 'pointer' }}
              onClick={() => handleIconClick(iconName)}
            />
            <div>{iconName}</div>
          </Col>
        );
      });
  }, []);

  const SelectedIconComponent = (Icons as any)[selectedIcon];

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ marginRight: '20px' }}>
        {SelectedIconComponent && (
          <SelectedIconComponent style={{ fontSize: '24px' }} />
        )}
      </div>
      <Input
        style={{ width: '200px' }}
        value={selectedIcon}
        readOnly
        placeholder={placeholder || ''}
        onClick={() => setVisible(true)}
      />
      <Modal
        title="Select an Icon"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Row>{renderIcons}</Row>
      </Modal>
    </div>
  );
};

IconSetter.displayName = 'IconSetter';

export default IconSetter;
