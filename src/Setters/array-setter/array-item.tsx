import { DeleteOutlined, MenuOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { ReactNode, useEffect, useRef } from 'react';

export default function ArrayItem(props: {
  data: any;
  index: number;
  onRemove: () => void;
  content: ReactNode;
  itemSetter: Record<string, any>;
  scrollIntoView: boolean;
}) {
  const shell = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (props.scrollIntoView && shell.current) {
      shell.current.parentElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, []);

  const getShellNode = (ref) => {
    shell.current = ref;
  };

  const { onRemove, content } = props;
  return (
    <div
      className="ape-setter-array-list-item"
      // @es-ignore
      ref={getShellNode}
    >
      <div className="ape-setter-array-list-item-actions">
        <Button
          type="link"
          draggable
          size="small"
          className="ape-setter-array-list-item-handler"
        >
          <MenuOutlined />
        </Button>
      </div>
      <div className="ape-setter-array-list-item-body">{content}</div>
      <div className="ape-setter-array-list-item-actions">
        <Button
          type="link"
          size="small"
          onClick={onRemove}
          className="ape-setter-array-list-item-action"
        >
          <DeleteOutlined />
        </Button>
      </div>
    </div>
  );
}
