import Icon, * as Icons from '@ant-design/icons';
import { Col, Input, Modal, Radio, Row } from 'antd';
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
  const [iconStyle, setIconStyle] = React.useState('outlined');

  const handleIconClick = (iconName: any) => {
    setSelectedIcon(iconName);
    if (onChange) {
      onChange(iconName);
    }
    setVisible(false);
  };

  // const renderIcons = React.useMemo(() => {
  //   return Object.keys(Icons)
  //     .filter((item) => typeof (Icons as any)[item] === 'object')
  //     .map((iconName) => {
  //       const IconComponent = (Icons as any)[iconName];
  //       return (
  //         <Col
  //           key={iconName}
  //           span={6}
  //           style={{ textAlign: 'center', margin: '10px 0' }}
  //         >
  //           <Icon
  //             component={IconComponent}
  //             style={{ fontSize: '24px', cursor: 'pointer' }}
  //             onClick={() => handleIconClick(iconName)}
  //           />
  //           <div>{iconName}</div>
  //         </Col>
  //       );
  //     });
  // }, []);
  const renderIcons = React.useMemo(() => {
    return Object.keys(Icons)
      .filter((item) => {
        const IconComponent = (Icons as any)[item];
        if (typeof IconComponent !== 'object') return false;
        if (iconStyle === 'outlined' && item.includes('Outlined')) return true;
        if (iconStyle === 'filled' && item.includes('Filled')) return true;
        if (iconStyle === 'twotone' && item.includes('TwoTone')) return true;
        return false;
      })
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
  }, [iconStyle]);

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
        <Radio.Group
          value={iconStyle}
          onChange={(e) => setIconStyle(e.target.value)}
          style={{ marginBottom: 16 }}
        >
          <Radio.Button value="outlined">线框风格</Radio.Button>
          <Radio.Button value="filled">实底风格</Radio.Button>
          <Radio.Button value="twotone">双色风格</Radio.Button>
        </Radio.Group>
        <Row>{renderIcons}</Row>
      </Modal>
    </div>
  );
};

IconSetter.displayName = 'IconSetter';

export default IconSetter;
