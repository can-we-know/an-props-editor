export default {
  componentName: 'Form.Item',
  title: '表单项',
  category: '表单',
  configure: {
    component: {
      isContainer: true,
      nestingRule: {
        childWhitelist: [],
        parentWhitelist: [],
      },
    },
    supports: {
      style: true,
      events: [
        {
          name: 'onChange',
        },
        {
          name: 'onOpenChange',
        },
        {
          name: 'onPanelChange',
        },
      ],
    },
    props: [
      {
        title: {
          label: 'string',
          tip: 'name | 字段名',
        },
        name: 'name',
        isRequired: true,
        propType: 'string',
        setter: {
          componentName: 'MixedSetter',
          props: {
            setters: [
              {
                componentName: 'StringSetter',
                isRequired: false,
                initialValue: '',
              },
              'VariableSetter',
            ],
          },
        },
      },
      {
        title: {
          label: 'slot',
          tip: 'label | 标签的文本',
        },
        name: 'slot',
        propType: {
          type: 'oneOfType',
          value: ['string', 'node'],
        },
        setter: {
          componentName: 'MixedSetter',
          props: {
            setters: [
              {
                componentName: 'SlotSetter',
                props: {
                  mode: 'node',
                },
                isRequired: false,
                initialValue: {
                  type: 'JSSlot',
                  value: [],
                },
              },
              'VariableSetter',
            ],
          },
        },
      },
      {
        title: {
          label: 'radioGroup',
          tip: 'labelAlign | 标签文本对齐方式',
        },
        name: 'labelAlign',
        propType: {
          type: 'oneOf',
          value: ['left', 'right'],
        },
        setter: {
          componentName: 'MixedSetter',
          props: {
            setters: [
              {
                componentName: 'RadioGroupSetter',
                props: {
                  options: [
                    {
                      title: '左',
                      value: 'left',
                    },
                    {
                      title: '右',
                      value: 'right',
                    },
                  ],
                },
              },
              'VariableSetter',
            ],
          },
        },
        defaultValue: 'right',
      },
      {
        title: {
          label: 'bool',
          tip: 'colon | 配合 label 属性使用，表示是否显示 label 后面的冒号',
        },
        name: 'colon',
        propType: 'bool',
        defaultValue: true,
        setter: {
          componentName: 'MixedSetter',
          props: {
            setters: [
              {
                componentName: 'BoolSetter',
                isRequired: false,
                initialValue: false,
              },
              'VariableSetter',
            ],
          },
        },
      },
      {
        title: {
          label: 'mixed',
          tip: 'extra | 额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。',
        },
        name: 'extra',
        propType: {
          type: 'oneOfType',
          value: ['string', 'node'],
        },
        setter: {
          componentName: 'MixedSetter',
          props: {
            setters: [
              {
                componentName: 'StringSetter',
                isRequired: false,
                initialValue: '',
              },
              {
                componentName: 'SlotSetter',
                props: {
                  mode: 'node',
                },
                isRequired: false,
                initialValue: {
                  type: 'JSSlot',
                  value: [],
                },
              },
              'VariableSetter',
            ],
          },
        },
      },
      {
        title: {
          label: {
            type: 'i18n',
            'en-US': 'color',
            'zh-CN': '颜色',
          },
          tip: 'color | 颜色',
        },
        name: 'color',
        description: '颜色',
        propType: 'string',
        setter: {
          componentName: 'MixedSetter',
          props: {
            setters: ['ColorSetter', 'VariableSetter'],
          },
        },
      },
      {
        title: {
          label: 'select',
          tip: 'gapPosition | 仪表盘进度条缺口位置',
        },
        name: 'select',
        condition: {
          type: 'LowCodeFunction',
          value: 'e=>"dashboard"===e.getProps().getPropValue("type")',
        },
        propType: {
          type: 'oneOf',
          value: ['top', 'bottom', 'left', 'right'],
        },
        defaultValue: 'bottom',
        setter: {
          componentName: 'MixedSetter',
          props: {
            setters: [
              {
                componentName: 'SelectSetter',
                props: {
                  dataSource: [
                    {
                      label: 'top',
                      value: 'top',
                    },
                    {
                      label: 'bottom',
                      value: 'bottom',
                    },
                    {
                      label: 'left',
                      value: 'left',
                    },
                    {
                      label: 'right',
                      value: 'right',
                    },
                  ],
                  options: [
                    {
                      label: 'top',
                      value: 'top',
                    },
                    {
                      label: 'bottom',
                      value: 'bottom',
                    },
                    {
                      label: 'left',
                      value: 'left',
                    },
                    {
                      label: 'right',
                      value: 'right',
                    },
                  ],
                },
                initialValue: 'top',
              },
              'VariableSetter',
            ],
          },
        },
      },
      {
        name: 'number',
        title: 'number',
        setter: {
          componentName: 'NumberSetter',
          props: {
            min: 0,
            max: 24,
          },
        },
      },
      {
        name: 'json',
        title: {
          label: 'json',
          tip: 'dataSource | 表格数据',
        },
        propType: 'object',
        setter: 'JsonSetter',
      },
      {
        title: {
          label: {
            type: 'i18n',
            'en-US': 'icon',
            'zh-CN': 'icon',
          },
          tip: 'type | 图标',
        },
        name: 'icon',
        description: '图标',
        propType: 'string',
        setter: {
          componentName: 'MixedSetter',
          props: {
            setters: ['IconSetter', 'VariableSetter'],
          },
        },
      },
      {
        name: 'variable',
        title: 'variable',
        setter: {
          componentName: 'VariableSetter',
          props: {},
        },
      },
      {
        title: {
          label: 'function',
          tip: 'getValueFromEvent | 设置如何将 event 的值转换成字段值，如将上传组件的fileList作为value值传出',
        },
        name: 'function',
        propType: 'func',
        setter: {
          componentName: 'MixedSetter',
          props: {
            setters: [
              {
                componentName: 'FunctionSetter',
                isRequired: false,
              },
              'VariableSetter',
            ],
          },
        },
      },
      {
        title: {
          label: 'textArea',
          tip: 'textarea',
        },
        name: 'textArea',
        propType: 'string',
        setter: {
          componentName: 'MixedSetter',
          props: {
            setters: [
              {
                componentName: 'TextAreaSetter',
                isRequired: false,
              },
              'VariableSetter',
            ],
          },
        },
      },
      {
        title: {
          label: '长度校验设置',
          tip: 'lenobj | 长度校验设置',
        },
        name: 'lenobj',
        propType: {
          type: 'shape',
          value: [
            {
              name: 'max',
              title: '最大长度',
              propType: 'number',
            },
            {
              name: 'min',
              title: '最小长度',
              propType: 'number',
            },
            {
              name: 'message',
              title: '错误信息提示',
              propType: 'string',
            },
          ],
        },
        setter: {
          componentName: 'MixedSetter',
          props: {
            setters: [
              {
                componentName: 'ObjectSetter',
                props: {
                  config: {
                    items: [
                      {
                        title: '最大长度',
                        name: 'max',
                        propType: 'number',
                        setter: {
                          componentName: 'MixedSetter',
                          props: {
                            setters: [
                              {
                                componentName: 'NumberSetter',
                                isRequired: false,
                                initialValue: 0,
                              },
                              'VariableSetter',
                            ],
                          },
                        },
                      },
                      {
                        title: '最小长度',
                        name: 'min',
                        propType: 'number',
                        setter: {
                          componentName: 'MixedSetter',
                          props: {
                            setters: [
                              {
                                componentName: 'NumberSetter',
                                isRequired: false,
                                initialValue: 0,
                              },
                              'VariableSetter',
                            ],
                          },
                        },
                      },
                      {
                        title: '错误信息提示',
                        name: 'message',
                        propType: 'string',
                        setter: {
                          componentName: 'MixedSetter',
                          props: {
                            setters: [
                              {
                                componentName: 'StringSetter',
                                isRequired: false,
                                initialValue: '',
                              },
                              'VariableSetter',
                            ],
                          },
                        },
                      },
                    ],
                    extraSetter: {
                      componentName: 'MixedSetter',
                      isRequired: false,
                      props: {},
                    },
                  },
                },
              },
              'VariableSetter',
            ],
          },
        },
      },
    ],
  },
  experimental: {
    callbacks: {
      onNodeRemove: {
        type: 'LowCodeFunction',
        value:
          '(e,t)=>{if(!e||!t)return;const l=t.children;l&&0===l.length&&t.remove()}',
      },
    },
  },
  snippets: [
    {
      title: '表单项',
      screenshot:
        'https://gw.alipayobjects.com/zos/wenyu-lowcode/kwcwhk3r/form-item-1.jpg',
      schema: {
        componentName: 'Form.Item',
        props: {
          label: '表单项',
        },
      },
    },
  ],
  npm: {
    package: 'antd/lib/form',
    version: '0.2.0',
    exportName: 'Form',
    destructuring: true,
    subName: 'item',
  },
};
