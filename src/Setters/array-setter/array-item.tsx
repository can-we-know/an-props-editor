import React, { PureComponent, ReactNode } from 'react';
import { Button, Icon } from 'antd';


export default class ArrayItem extends PureComponent<{
  data: any;
  index: number;
  onRemove: () => void;
  content: ReactNode;
  itemSetter: Record<string, any>;
  scrollIntoView: boolean;
}> {
  private shell: HTMLDivElement | null;

  componentDidMount() {
    if (this.props.scrollIntoView && this.shell) {
      this.shell.parentElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  getShellNode = (ref) => {
    this.shell = ref;
  };

  render() {
    const { onRemove, content } = this.props;
    return (
      <div
        className="ape-setter-array-list-item"
        // @es-ignore
        ref={this.getShellNode}
      >
        <div className="ape-setter-array-list-item-actions">
          <Button type="link" draggable size="small" className="ape-setter-array-list-item-handler">
            <Icon type="menu" />
          </Button>
        </div>
        <div className="ape-setter-array-list-item-body">
          {content}
        </div>
        <div className="ape-setter-array-list-item-actions">
          <Button type="link" size="small" onClick={onRemove} className="ape-setter-array-list-item-action">
            <Icon type="delete" />
          </Button>
        </div>
      </div>
    );
  }
}
