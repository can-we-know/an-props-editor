import { createContext } from 'react';

export enum ThemeEnum {
  LIGHT = 'light',
  DARK = 'dark',
}

const ThemeContext = createContext<'light' | 'dark'>(ThemeEnum.LIGHT);

export default ThemeContext;
