---
nav:
  title: Setter
  order: 1
---

# SlotSetter

```jsx
import { SlotSetter } from '@an/props-editor';
import React from 'react';

export default () => {
  const [value, setValue] = React.useState(null);
  const onInitial = () => {
    setValue({
      type: 'JSSlot',
      params: ['module'],
      value: [],
    });
  };
  const onChange = (val) => setValue(val);

  return <SlotSetter value={value} onInitial={onInitial} onChange={onChange} />;
};
```
