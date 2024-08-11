export interface StyleData {
  [key: string]: string | number | boolean;
}

export interface StyleDataItem {
  styleKey: string;
  value: string | number | boolean | null;
}

export interface RadioItem {
  value: string;
  icon?: string;
  title?: string;
  tips: string;
}

export type OnStyleChange = (styleDataList: StyleDataItem[]) => void;
