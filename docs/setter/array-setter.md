---
nav:
  title: Setter
  order: 1
---

# ArraySetter

```jsx
import { ArraySetter } from '@an/props-editor';
import { StringSetter } from '@an/props-editor';
import { ObjectSetter } from '@an/props-editor';
import React from 'react';

const itemSetter = {
  componentName: 'ObjectSetter',
  props: {
    config: {
      items: [
        {
          name: 'title',
          description: '标题',
          setter: 'StringSetter',
        },
      ],
    },
  },
  initialValue: {
    title: 'I am title',
  },
};

const setterMap = {
  StringSetter,
  ObjectSetter,
};

export default () => {
  const [value, setValue] = React.useState([]);
  const onChange = (val) => {
    setValue(val);
  };

  return (
    <ArraySetter
      title="数据列"
      value={value}
      onChange={onChange}
      itemSetter={itemSetter}
      setterMap={setterMap}
    />
  );
};
```
