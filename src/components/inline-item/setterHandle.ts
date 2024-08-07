import {
  addVariableSetter,
  getDefaultSetter,
  hasSetterType,
} from '@/common/utils';
import { ElementType } from 'react';
import { SetterMetaItem, SetterType } from '../../types';

export enum ActionType {
  VARIABLE = 'variable',
  MIXED = 'mixed',
}

export function getSetterKeyList(setterArr: (string | SetterMetaItem)[]) {
  const result: string[] = setterArr
    .map((item) => {
      if (typeof item === 'string') {
        return item;
      }
      if (item && item.componentName) {
        return item.componentName;
      }
      return '';
    })
    .filter(Boolean);
  return result;
}

export function formatSetterState(
  setter: string | (string | SetterMetaItem)[] | SetterMetaItem,
  value: any,
  setterMap: Record<string, ElementType>,
) {
  let actionType = ActionType.VARIABLE;
  let setterList: (string | SetterMetaItem)[] = [];
  let setterInfo: string | SetterMetaItem = {} as SetterMetaItem;
  if (!setter) {
    return {
      actionType,
      setterList,
      setterInfo,
      SetterNode: null,
      setterKey: '',
    };
  }
  if (typeof setter === 'string') {
    actionType = ActionType.VARIABLE;
    setterInfo = setter;
  } else if (Array.isArray(setter)) {
    setterList = setter;
    setterInfo = setter[0];
  } else if (
    (setter as SetterMetaItem).componentName === SetterType.MIXEDSETTER
  ) {
    setterList = setter?.props?.setters || [];
    setterInfo = setterList[0] || ({} as SetterMetaItem);
  } else {
    setterList = [setter];
    setterInfo = setter;
  }
  addVariableSetter(setterList);
  if (
    setterList.length >= 3 ||
    hasSetterType(setterList, SetterType.OBJECTSETTER) ||
    hasSetterType(setterList, SetterType.ARRAYSETTER)
  ) {
    actionType = ActionType.MIXED;
  }
  let setterKey =
    typeof setterInfo === 'string' ? setterInfo : setterInfo?.componentName;
  const defaultSetter = getDefaultSetter(
    value,
    setterList,
    actionType === ActionType.MIXED,
  );
  setterKey = defaultSetter?.setterKey || setterKey;
  const SetterNode = setterMap[setterKey];
  return {
    actionType,
    setterList,
    setterInfo,
    SetterNode,
    setterKey,
  };
}
