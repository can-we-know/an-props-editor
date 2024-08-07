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

export interface ObjectMetaItem {
  name: string;
  title: string;
  setter: SetterMetaItem;
}

export interface PropsInfoType {
  type?: string;
  display?: string;
  name: string;
  isRequired?: boolean;
  title:
    | string
    | {
        label: string;
        tip: string;
      }
    | any;
  label?: string;
  propType?: any;
  defaultValue?: any;
  setter: string | SetterMetaItem | (string | SetterMetaItem)[];
  supportVariable?: boolean;
  condition?: any;
  extraProps?: {
    display?: string;
  };
  items?: PropsInfoType[];
}

export interface MetaInfoType {
  componentName: string;
  title: string;
  configure: {
    component: Record<string, any>;
    supports: Record<string, any>;
    props: PropsInfoType[];
  };
}
