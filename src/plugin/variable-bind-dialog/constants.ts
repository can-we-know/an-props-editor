// 支持变量类型
export const supportVariableType = {
  string: {
    default: '',
  },
  number: {
    default: 0,
  },
  null: {
    default: null,
  },
  boolean: {
    default: 'false',
  },
  object: {
    default: '{}',
  },
};

export const supportVariableTypeMap = Object.keys(supportVariableType);

export const supportVariableTypeOptions = [
  { value: 'string', label: '字符串' },
  { value: 'number', label: '数字' },
  { value: 'boolean', label: '布尔值' },
  { value: 'null', label: '空值' },
  { value: 'object', label: '复杂类型' },
];

