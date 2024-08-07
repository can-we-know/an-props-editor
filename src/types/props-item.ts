import type { ElementType } from 'react';
import { PropsInfoType } from './index';

export interface PropsItemPropsType {
  metaInfo: PropsInfoType;
  value: Record<string, any>;
  setterMap: Record<string, ElementType>;
}
