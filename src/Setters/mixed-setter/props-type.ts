export interface ComponentProps {
  size?: 'sm' | 'md' | 'lg';
  prefixCls?: string;
  className?: any;
  style?: React.CSSProperties;
  title?: string;
}


export interface Setter {
  componentName: string;
  props?: object;
  title?: string;
}
