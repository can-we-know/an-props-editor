---
nav:
  title: Setter
  order: 1
---

# RadioGroupSetter

```jsx
import { RadioGroupSetter } from '@an/props-editor';
import React from 'react';

export default () => {
  const [value, setValue] = React.useState('left');
  const onChange = (val) => {
    setValue(val);
  };

  return (
    <RadioGroupSetter
      value={value}
      options={[
        {
          title: '左',
          value: 'left',
        },
        {
          title: '右',
          value: 'right',
        },
      ]}
      onChange={onChange}
    />
  );
};
```
