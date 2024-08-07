export default {
  componentName: 'Form.Item',
  title: '表单项',
  category: '表单',
  props: [
    {
      name: 'name',
      title: {
        label: '字段名',
        tip: 'name | 字段名',
      },
      isRequired: true,
      propType: 'string',
    },
    {
      name: 'label',
      title: {
        label: '标签',
        tip: 'label | 标签的文本',
      },
      propType: {
        type: 'oneOfType',
        value: ['string', 'node'],
      },
    },
    {
      name: 'labelAlign',
      title: {
        label: '标签对齐',
        tip: 'labelAlign | 标签文本对齐方式',
      },
      propType: {
        type: 'oneOf',
        value: ['left', 'right'],
      },
      setter: {
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
      defaultValue: 'right',
    },
    {
      name: 'colon',
      title: {
        label: '显示冒号',
        tip: 'colon | 配合 label 属性使用，表示是否显示 label 后面的冒号',
      },
      propType: 'bool',
      defaultValue: true,
    },
    {
      name: 'extra',
      title: {
        label: '提示信息',
        tip: 'extra | 额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。',
      },
      propType: {
        type: 'oneOfType',
        value: ['string', 'node'],
      },
    },
    {
      name: 'required',
      title: {
        label: '必填标记',
        tip: 'required | 必填样式设置。如不设置，则会根据校验规则自动生成',
      },
      propType: 'bool',
      defaultValue: false,
    },
    {
      name: 'initialValue',
      title: {
        label: '默认值',
        tip: 'initialValue | 设置子元素默认值，如果与 Form 的 initialValues 冲突则以 Form 为准',
      },
      propType: 'string',
    },
    {
      name: 'noStyle',
      title: {
        label: '隐藏标签',
        tip: 'noStyle | 为 true 时不带样式，作为纯字段控件使用',
      },
      propType: 'bool',
      defaultValue: false,
    },
    {
      name: 'valuePropName',
      title: {
        label: '子组件值字段',
        tip: "valuePropName | 子节点的值的字段，如 Switch 的是 'checked'",
      },
      propType: 'string',
      defaultValue: 'value',
    },
    {
      name: 'getValueFromEvent',
      title: {
        label: 'event转换器',
        tip: 'getValueFromEvent | 设置如何将 event 的值转换成字段值，如将上传组件的fileList作为value值传出',
      },
      propType: 'func',
    },
    {
      type: 'group',
      title: '布局',
      display: 'accordion',
      items: [
        {
          name: 'labelCol',
          title: '标签栅格布局设置',
          display: 'inline',
          setter: {
            componentName: 'ObjectSetter',
            props: {
              config: {
                items: [
                  {
                    name: 'span',
                    title: '宽度',
                    setter: {
                      componentName: 'NumberSetter',
                      props: {
                        min: 0,
                        max: 24,
                      },
                    },
                  },
                  {
                    name: 'offset',
                    title: '偏移',
                    setter: {
                      componentName: 'NumberSetter',
                      props: {
                        min: 0,
                        max: 24,
                      },
                    },
                  },
                ],
              },
            },
          },
          description:
            'label 标签布局，同 `<Col>` 组件，设置 span offset 值，如 {span: 8, offset: 16}，该项仅在垂直表单有效',
        },
        {
          name: 'wrapperCol',
          title: '内容栅格布局设置',
          display: 'inline',
          setter: {
            componentName: 'ObjectSetter',
            props: {
              config: {
                items: [
                  {
                    name: 'span',
                    title: '宽度',
                    setter: {
                      componentName: 'NumberSetter',
                      props: {
                        min: 0,
                        max: 24,
                      },
                    },
                  },
                  {
                    name: 'offset',
                    title: '偏移',
                    setter: {
                      componentName: 'NumberSetter',
                      props: {
                        min: 0,
                        max: 24,
                      },
                    },
                  },
                ],
              },
            },
          },
          description:
            '需要为输入控件设置布局样式时，使用该属性，用法同 labelCol',
        },
      ],
    },
    {
      name: 'requiredobj',
      title: {
        label: '必填设置',
        tip: 'requiredobj | 必填设置',
      },
      propType: {
        type: 'shape',
        value: [
          {
            name: 'required',
            title: '是否必填',
            propType: 'bool',
          },
          {
            name: 'message',
            title: '错误信息提示',
            propType: 'string',
          },
        ],
      },
    },
    {
      name: 'typeobj',
      title: {
        label: '输入类型设置',
        tip: 'typeobj | 输入类型设置',
      },
      propType: {
        type: 'shape',
        value: [
          {
            name: 'type',
            title: '输入类型',
            setter: {
              componentName: 'SelectSetter',
              props: {
                options: [
                  {
                    title: '字符串',
                    value: 'string',
                  },
                  {
                    title: '邮箱',
                    value: 'email',
                  },
                  {
                    title: '网址',
                    value: 'url',
                  },
                ],
              },
            },
            propType: {
              type: 'oneOf',
              value: ['string', 'number', 'email', 'url'],
            },
          },
          {
            name: 'message',
            title: '错误信息提示',
            propType: 'string',
          },
        ],
      },
    },
    {
      name: 'lenobj',
      title: {
        label: '长度校验设置',
        tip: 'lenobj | 长度校验设置',
      },
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
    },
    {
      name: 'patternobj',
      title: {
        label: '正则设置',
        tip: 'patternobj | 正则设置',
      },
      propType: {
        type: 'shape',
        value: [
          {
            name: 'pattern',
            title: '正则',
            propType: 'string',
          },
          {
            name: 'message',
            title: '错误信息提示',
            propType: 'string',
          },
        ],
      },
    },
    {
      name: 'validator',
      title: {
        label: '自定义校验函数',
        tip: 'validator | 自定义校验，接收 Promise 作为返回值',
      },
      propType: 'func',
    },
  ],
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
          label: 'ArraySetter 设置ObjectSetter',
          tip: 'routes | router 的路由栈信息',
        },
        name: 'routes',
        propType: {
          type: 'arrayOf',
          value: {
            type: 'shape',
            value: [
              {
                name: 'path',
                propType: 'string',
              },
              {
                name: 'breadcrumbName',
                propType: 'string',
              },
            ],
          },
        },
        setter: {
          componentName: 'MixedSetter',
          props: {
            setters: [
              {
                componentName: 'ArraySetter',
                props: {
                  itemSetter: {
                    componentName: 'ObjectSetter',
                    props: {
                      config: {
                        items: [
                          {
                            title: {
                              label: {
                                type: 'i18n',
                                'en-US': 'path',
                                'zh-CN': 'path',
                              },
                            },
                            name: 'path',
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
                              label: {
                                type: 'i18n',
                                'en-US': 'breadcrumbName',
                                'zh-CN': 'breadcrumbName',
                              },
                            },
                            name: 'breadcrumbName',
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
                    initialValue: {
                      path: '',
                      breadcrumbName: '',
                    },
                  },
                },
                initialValue: [],
              },
              'VariableSetter',
            ],
          },
        },
      },
      {
        title: {
          label: 'ArraySetter设置SlotSetter',
          tip: 'actions | 列表操作组',
        },
        name: 'actions',
        propType: {
          type: 'arrayOf',
          value: 'node',
        },
        setter: {
          componentName: 'MixedSetter',
          props: {
            setters: [
              {
                componentName: 'ArraySetter',
                props: {
                  itemSetter: {
                    componentName: 'SlotSetter',
                    title: '操作组插槽',
                    initialValue: {
                      type: 'JSSlot',
                      value: [],
                    },
                  },
                },
              },
              'VariableSetter',
            ],
          },
        },
      },
      {
        title: {
          label: 'ArraySetter设置StringSetter',
          tip: 'treeDefaultExpandedKeys | 默认展开的树节点',
        },
        name: 'treeDefaultExpandedKeys',
        propType: {
          type: 'arrayOf',
          value: 'string',
        },
        setter: {
          componentName: 'MixedSetter',
          props: {
            setters: [
              {
                componentName: 'ArraySetter',
                props: {
                  itemSetter: {
                    componentName: 'StringSetter',
                    isRequired: false,
                    initialValue: '',
                  },
                },
                initialValue: [],
              },
              'VariableSetter',
            ],
          },
        },
      },
      {
        title: {
          label: 'ArraySetter设置RadioGroupSetter',
          tip: 'trigger | 触发下拉的行为, 移动端不支持 hover',
        },
        name: 'trigger',
        propType: {
          type: 'arrayOf',
          value: {
            type: 'oneOf',
            value: ['click', 'hover', 'contextMenu'],
          },
        },
        setter: {
          componentName: 'MixedSetter',
          props: {
            setters: [
              {
                componentName: 'ArraySetter',
                props: {
                  itemSetter: {
                    componentName: 'RadioGroupSetter',
                    props: {
                      dataSource: [
                        {
                          label: 'click',
                          value: 'click',
                        },
                        {
                          label: 'hover',
                          value: 'hover',
                        },
                        {
                          label: 'contextMenu',
                          value: 'contextMenu',
                        },
                      ],
                      options: [
                        {
                          label: 'click',
                          value: 'click',
                        },
                        {
                          label: 'hover',
                          value: 'hover',
                        },
                        {
                          label: 'contextMenu',
                          value: 'contextMenu',
                        },
                      ],
                    },
                    initialValue: 'click',
                  },
                },
                initialValue: [],
              },
              'VariableSetter',
            ],
          },
        },
      },
      {
        title: {
          label: 'ArraySetter设置NumberSetter',
          tip: 'offset | 设置状态点的位置偏移 [number, number]',
        },
        name: 'offset',
        propType: {
          type: 'arrayOf',
          value: 'number',
        },
        setter: {
          componentName: 'MixedSetter',
          props: {
            setters: [
              {
                componentName: 'ArraySetter',
                props: {
                  itemSetter: {
                    componentName: 'NumberSetter',
                    isRequired: false,
                    initialValue: 0,
                  },
                },
                initialValue: [],
              },
              'VariableSetter',
            ],
          },
        },
      },
      {
        title: {
          label: 'ArraySetter设置MixedSetter',
          tip: 'defaultValue | 默认的选中项',
        },
        name: 'defaultValue',
        propType: {
          type: 'arrayOf',
          value: {
            type: 'oneOfType',
            value: ['string', 'number'],
          },
        },
        setter: {
          componentName: 'MixedSetter',
          props: {
            setters: [
              {
                componentName: 'ArraySetter',
                props: {
                  itemSetter: {
                    componentName: 'MixedSetter',
                    props: {
                      setters: [
                        {
                          componentName: 'StringSetter',
                          isRequired: false,
                          initialValue: '',
                        },
                        {
                          componentName: 'NumberSetter',
                          isRequired: false,
                          initialValue: 0,
                        },
                      ],
                    },
                  },
                },
                initialValue: [],
              },
              'VariableSetter',
            ],
          },
        },
      },
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
        name: 'variable',
        title: 'variable',
        setter: {
          componentName: 'VariableSetter',
          props: {},
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
        name: 'overlayStyle',
        title: '卡片样式',
        type: 'group',
        extraProps: {
          display: 'entry',
        },
        items: [
          {
            name: 'overlayStyle',
            title: {
              label: '样式设置',
              tip: 'overlayStyle | 卡片样式',
            },
            setter: 'StyleSetter',
            extraProps: {
              display: 'block',
            },
          },
        ],
      },
      {
        title: '外观',
        display: 'block',
        type: 'group',
        items: [
          {
            name: 'itemLayout',
            title: {
              label: '布局',
              tip: 'itemLayout  | 设置 List.Item 布局, 设置成 vertical 则竖直样式显示, 默认横排',
            },
            propType: {
              type: 'oneOf',
              value: ['horizontal', 'vertical'],
            },
            defaultValue: 'horizontal',
            setter: [
              {
                componentName: 'RadioGroupSetter',
                props: {
                  options: [
                    {
                      title: '水平',
                      value: 'horizontal',
                    },
                    {
                      title: '垂直',
                      value: 'vertical',
                    },
                  ],
                },
              },
              'VariableSetter',
            ],
          },
          {
            name: 'size',
            title: {
              label: '尺寸',
              tip: 'size  | 列表的尺寸',
            },
            propType: {
              type: 'oneOf',
              value: ['default', 'large', 'small'],
            },
            defaultValue: 'default',
            setter: [
              {
                componentName: 'RadioGroupSetter',
                props: {
                  options: [
                    {
                      title: '默认',
                      value: 'default',
                    },
                    {
                      title: '大',
                      value: 'large',
                    },
                    {
                      title: '小',
                      value: 'small',
                    },
                  ],
                },
              },
              'VariableSetter',
            ],
          },
          {
            name: 'bordered',
            title: {
              label: '显示边框',
              tip: 'bordered | 是否展示边框',
            },
            propType: 'bool',
            defaultValue: true,
            setter: 'BoolSetter',
          },
          {
            name: 'split',
            title: {
              label: '展示分割线',
              tip: 'split | 是否展示分割线',
            },
            propType: 'bool',
            defaultValue: true,
            setter: 'BoolSetter',
          },
        ],
      },
      {
        title: '布局',
        type: 'group',
        display: 'accordion',
        items: [
          {
            name: 'labelCol',
            title: '标签栅格布局设置',
            display: 'inline',
            setter: {
              componentName: 'ObjectSetter',
              props: {
                config: {
                  items: [
                    {
                      name: 'span',
                      title: '宽度',
                      setter: {
                        componentName: 'NumberSetter',
                        props: {
                          min: 0,
                          max: 24,
                          units: 'px',
                        },
                      },
                    },
                    {
                      name: 'offset',
                      title: '偏移',
                      setter: {
                        componentName: 'NumberSetter',
                        props: {
                          min: 0,
                          max: 24,
                        },
                      },
                    },
                  ],
                },
              },
            },
            description:
              'label 标签布局，同 `<Col>` 组件，设置 span offset 值，如 {span: 8, offset: 16}，该项仅在垂直表单有效',
          },
          {
            name: 'wrapperCol',
            title: '内容栅格布局设置',
            display: 'inline',
            setter: {
              componentName: 'ObjectSetter',
              props: {
                config: {
                  items: [
                    {
                      name: 'span',
                      title: '宽度',
                      setter: {
                        componentName: 'NumberSetter',
                        props: {
                          min: 0,
                          max: 24,
                        },
                      },
                    },
                    {
                      name: 'offset',
                      title: '偏移',
                      setter: {
                        componentName: 'NumberSetter',
                        props: {
                          min: 0,
                          max: 24,
                        },
                      },
                    },
                  ],
                },
              },
            },
            description:
              '需要为输入控件设置布局样式时，使用该属性，用法同 labelCol',
          },
        ],
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
          label: '必填设置',
          tip: 'requiredobj | 必填设置',
        },
        name: 'requiredobj',
        propType: {
          type: 'shape',
          value: [
            {
              name: 'required',
              title: '是否必填',
              propType: 'bool',
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
                        title: '是否必填',
                        name: 'required',
                        propType: 'bool',
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
                initialValue: {},
              },
              'VariableSetter',
            ],
          },
        },
      },
      {
        title: {
          label: '输入类型设置',
          tip: 'typeobj | 输入类型设置',
        },
        name: 'typeobj',
        propType: {
          type: 'shape',
          value: [
            {
              name: 'type',
              title: '输入类型',
              setter: {
                componentName: 'SelectSetter',
                props: {
                  options: [
                    {
                      title: '字符串',
                      value: 'string',
                    },
                    {
                      title: '邮箱',
                      value: 'email',
                    },
                    {
                      title: '网址',
                      value: 'url',
                    },
                  ],
                },
              },
              propType: {
                type: 'oneOf',
                value: ['string', 'number', 'email', 'url'],
              },
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
                        title: '输入类型',
                        name: 'type',
                        setter: {
                          componentName: 'MixedSetter',
                          props: {
                            setters: [
                              {
                                componentName: 'SelectSetter',
                                props: {
                                  options: [
                                    {
                                      title: '字符串',
                                      value: 'string',
                                    },
                                    {
                                      title: '邮箱',
                                      value: 'email',
                                    },
                                    {
                                      title: '网址',
                                      value: 'url',
                                    },
                                  ],
                                },
                              },
                              'VariableSetter',
                            ],
                          },
                        },
                        propType: {
                          type: 'oneOf',
                          value: ['string', 'number', 'email', 'url'],
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
                initialValue: {},
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
                initialValue: {
                  type: 'LowCodeFunction',
                  value:
                    'function(e){var t={};return n.forEach((function(l){var a=l.defaultValue;null==a&&l.setter&&"object"==typeof l.setter&&(a=l.setter.initialValue),t[l.name]=a?"function"==typeof a?a(e):a:null})),t}',
                },
              },
              'VariableSetter',
            ],
          },
        },
      },
      {
        title: {
          label: '正则设置',
          tip: 'patternobj | 正则设置',
        },
        name: 'patternobj',
        propType: {
          type: 'shape',
          value: [
            {
              name: 'pattern',
              title: '正则',
              propType: 'string',
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
                        title: '正则',
                        name: 'pattern',
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
                initialValue: {
                  type: 'LowCodeFunction',
                  value:
                    'function(e){var t={};return n.forEach((function(l){var a=l.defaultValue;null==a&&l.setter&&"object"==typeof l.setter&&(a=l.setter.initialValue),t[l.name]=a?"function"==typeof a?a(e):a:null})),t}',
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
