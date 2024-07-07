import { SetterItem, SetterType } from './type';

export const JS_EXPRESSION = 'JSExpression';
export const JS_SLOT = 'JSSlot';
export const LOW_CODE_FUNCTION = 'LowCodeFunction';
export const JS_FUNCTION = 'JSFunction';
export const JS_JSON = 'JSJson';

export const initialValueMap = {
  [SetterType.VARIABLESETTER]: {
    type: JS_EXPRESSION,
    value: '',
  },
  [SetterType.SLOTSETTER]: {
    type: JS_SLOT,
  },
};

export function hasSetterType(
  setters: (string | SetterItem)[],
  targetSetter: string,
) {
  if (!setters || setters.length === 0) {
    return false;
  }
  for (let i = 0; i < setters.length; ++i) {
    const item = setters[i];
    if (
      item === targetSetter ||
      (item as SetterItem)?.componentName === targetSetter
    ) {
      return item;
    }
  }
  return false;
}

export function addVariableSetter(setters: (string | SetterItem)[]) {
  if (!hasSetterType(setters, SetterType.VARIABLESETTER)) {
    setters.push(SetterType.VARIABLESETTER);
  }
}

export function getDefaultSetter(
  value: { type: string; value: any } | null | undefined,
  setterList: any[],
  isMixed: boolean,
): { setterInfo: any; setterKey: string } | undefined {
  if (value === undefined || value === null || !isMixed) {
    return;
  }
  if (value.type === JS_JSON) {
    if (Array.isArray(value.value)) {
      const setterInfo = hasSetterType(setterList, SetterType.ARRAYSETTER);
      if (setterInfo) {
        return {
          setterInfo,
          setterKey: SetterType.ARRAYSETTER,
        };
      }
    }
    if (typeof value.value === 'object') {
      const setterInfo = hasSetterType(setterList, SetterType.OBJECTSETTER);
      if (setterInfo) {
        return {
          setterInfo,
          setterKey: SetterType.OBJECTSETTER,
        };
      }
    }
  }
  if (value.type === JS_SLOT) {
    const setterInfo = hasSetterType(setterList, SetterType.SLOTSETTER);
    if (setterInfo) {
      return {
        setterInfo,
        setterKey: SetterType.SLOTSETTER,
      };
    }
  }
  if (value.type === JS_EXPRESSION) {
    const setterInfo = hasSetterType(setterList, SetterType.VARIABLESETTER);
    if (setterInfo) {
      return {
        setterInfo,
        setterKey: SetterType.VARIABLESETTER,
      };
    }
  }
  if (typeof value === 'string') {
    const selectSetterInfo = hasSetterType(setterList, SetterType.SELECTSETTER);
    if (selectSetterInfo) {
      const { options = [] } = (selectSetterInfo as SetterItem)?.props || {};
      for (let i = 0; i < options.length; ++i) {
        if (options[i].value === value) {
          return {
            setterInfo: selectSetterInfo,
            setterKey: SetterType.SELECTSETTER,
          };
        }
      }
    }
    const setterInfo = hasSetterType(setterList, SetterType.STRINGSETTER);
    if (setterInfo) {
      return {
        setterInfo,
        setterKey: SetterType.STRINGSETTER,
      };
    }
  }
}

export function getInitialValue(initialValue: any) {
  if (initialValue && initialValue.type === LOW_CODE_FUNCTION) {
    const { value } = initialValue;
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function(`return (${value})();`);
      return fn();
    } catch (e) {
      console.log('initialValue error', e);
    }
    return;
  }
  return initialValue;
}
