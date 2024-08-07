import React from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { Setter } from '../props-type';
import '../index.less';

const VARIABLESETTER = 'VariableSetter';

interface MixedMenuItemProps {
  setter: Setter | string;
  curSelect?: string;
}

export default function MixedMenuItem(props: MixedMenuItemProps) {
  const { setter, curSelect } = props;
  let setterName = setter as string;
  if (setter && (setter as Setter).componentName) {
    const { title, componentName } = setter as Setter;
    setterName = title || componentName;
  }
  return (
    <div className="mixed-setter-menu" >
      { curSelect === setterName ?  <CheckOutlined className="mixed-setter-menu-icon" /> : null }
      {setterName === VARIABLESETTER ? '变量输入' : setterName}
    </div>
  );
}