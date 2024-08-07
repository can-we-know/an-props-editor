export enum DisplayType {
  ACCORDION = 'accordion',
  INLINE = 'inline',
  BLOCK = 'block',
  PLAIN = 'plain',
  POPUP = 'popup',
  ENTRY = 'entry',
}

export enum PropType {
  FIELD = 'field',
  GROUP = 'group',
}

export enum SetterType {
  MIXEDSETTER = 'MixedSetter',
  OBJECTSETTER = 'ObjectSetter',
  VARIABLESETTER = 'VariableSetter',
  ARRAYSETTER = 'ArraySetter',
  SLOTSETTER = 'SlotSetter',
  FUNCTIONSETTER = 'FunctionSetter',
  STRINGSETTER = 'StringSetter',
  SELECTSETTER = 'SelectSetter',
}

export interface SetterMetaItem {
  componentName: string;
  props?: Record<string, any>;
  isReqired?: boolean;
  initialValue?: any;
}

export interface PropsInfo {
  type?: string;
  display?: string;
  name?: string;
  isRequired?: boolean;
  title:
    | string
    | {
        label: string;
        tip: string;
      }
    | any;
  propType?: any;
  defaultValue?: any;
  setter?: string | SetterMetaItem | (string | SetterMetaItem)[];
  supportVariable?: boolean;
  condition?: any;
  extraProps?: {
    display?: string;
  };
}
