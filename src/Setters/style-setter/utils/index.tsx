/* eslint-disable radix */
import { StyleData } from './types';
import { toCSS, toJSON } from 'cssjson';

export function removeUnit(value: string) {
  if (value !== undefined && value !== null) {
    return parseInt(value);
  }

  return;
}

export function addUnit(value: number | string, unit: string) {
  if (value !== undefined && value !== null) {
    return value + unit;
  } else {
    return null;
  }
}

export function isEmptyValue(value: string | number | boolean) {
  if (value === undefined || value === null) {
    return true;
  }

  return false;
}

/**
 * 将驼峰写法改成xx-xx的css命名写法
 * @param styleKey
 */
export function toLine(styleKey: string) {
  return styleKey.replace(/([A-Z])/g, '-$1').toLowerCase();
}

export function toHump(name: string) {
  // eslint-disable-next-line no-useless-escape
  return name.replace(/\-(\w)/g, (all, letter) => {
    return letter.toUpperCase();
  });
}

/**
 * rgba转16进制
 * @param color
 */
export function hexify(color: string) {
  const values = color
    .replace(/rgba?\(/, '')
    .replace(/\)/, '')
    .replace(/[\s+]/g, '')
    .split(',');
  const a = parseFloat(values[3]);
  const r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255);
  const g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255);
  const b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
  return `#${`0${r.toString(16)}`.slice(-2)}${`0${g.toString(16)}`.slice(
    -2
  )}${`0${b.toString(16)}`.slice(-2)}`;
}

export function parseToCssCode(styleData: StyleData) {
  const parseStyleData: any = {};
  Object.keys(styleData).forEach(styleKey => {
    parseStyleData[toLine(styleKey)] = styleData[styleKey];
  });

  const cssJson = {
    children: {
      '#main': {
        children: {},
        attributes: parseStyleData,
      },
    },
  };

  return toCSS(cssJson);
}

export function parseToStyleData(cssCode: string) {
  const styleData: Record<string, any> = {};
  try {
    const cssJson = toJSON(cssCode);
    const cssJsonData = cssJson?.children?.['#main']?.attributes;
    for (const key in cssJsonData) {
      if (cssJsonData[key] !== '') {
        styleData[toHump(key)] = cssJsonData[key];
      }
    }
    // 转化key
  } catch (e: any) {
    console.error(e.message);
  }

  return styleData;
}

export function isSameStayleData(newData: Record<string, any>, data: Record<string, any>) {
  const newKeys = Object.keys(newData);
  const keys = Object.keys(data);
  if (newKeys.length !== keys.length) {
    return false;
  }
  for (let i = 0; i < newKeys.length; ++i) {
    const key = newKeys[i];
    if (newData[key] !== data[key]) {
      return false;
    }
  }
  return true;
}
