import { createFromIconfontCN } from '@ant-design/icons';
import * as React from 'react';

const ICON_URL = '//at.alicdn.com/t/font_2761185_gdpwg9vnz7.js';

const CustomIcon = createFromIconfontCN({
  scriptUrl: ICON_URL,
});

// document.addEventListener('DOMContentLoaded', () => {
//   console.log('DOMContentLoaded========');
//   CustomIcon = Icon.createFromIconfontCN({
//     scriptUrl: ICON_URL,
//   });
// });

// window.onload = function () {
//   CustomIcon = Icon.createFromIconfontCN({
//     scriptUrl: ICON_URL,
//   });
// };

interface IconProps {
  type: string;
  size?:
    | number
    | 'small'
    | 'xxs'
    | 'xs'
    | 'medium'
    | 'large'
    | 'xl'
    | 'xxl'
    | 'xxxl'
    | 'inherit';
  className?: string;
  style?: any;
}

export default (props: IconProps) => {
  const { type, size, className = '', style = {} } = props;

  return (
    <>
      {CustomIcon && (
        <CustomIcon type={type} className={className} style={style} />
      )}
    </>
  );
};
