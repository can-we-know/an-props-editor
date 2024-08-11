import classNames from 'classnames';
import React, { ReactElement, useEffect, useRef } from 'react';
import './sortable.less';

export interface SortablePropsType {
  className?: string;
  itemClassName?: string;
  onSort?: (sortedIds: (string | number)[]) => void;
  dragImageSourceHandler?: (elem: Element) => Element;
  children: ReactElement[] | ReactElement;
}

export default function Sortable(props: SortablePropsType) {
  const shell = useRef<HTMLDivElement | null>(null);
  const items = useRef<(string | number)[]>([]);

  useEffect(() => {
    const box = shell.current;

    let isDragEnd = false;

    /**
     * target node to be dragged
     */
    let source: Element | null;

    /**
     * node to be placed
     */
    let ref: Element | null;

    /**
     * next sibling of the source node
     */
    let origRef: Element | null;

    /**
     * accurately locate the node from event
     */
    const locate = (e: DragEvent) => {
      let y = e.clientY;
      if (e.view !== window && e.view?.frameElement) {
        y += e.view?.frameElement.getBoundingClientRect().top;
      }
      let node = box.firstElementChild as HTMLDivElement;
      while (node) {
        if (node !== source && node.dataset.id) {
          const rect = node.getBoundingClientRect();

          if (rect.height <= 0) continue;
          if (y < rect.top + rect.height / 2) {
            break;
          }
        }
        node = node.nextElementSibling as HTMLDivElement;
      }
      return node;
    };

    /**
     * find the source node
     */
    const getSource = (e: DragEvent) => {
      const target = e.target as Element;
      if (!target || !box.contains(target) || target === box) {
        return null;
      }

      let node = box.firstElementChild;
      while (node) {
        if (node.contains(target)) {
          return node;
        }
        node = node.nextElementSibling;
      }

      return null;
    };

    const sort = (beforeId: string | number | null | undefined) => {
      if (!source) return;

      const sourceId = (source as HTMLDivElement).dataset.id;
      const origIndex = items.current.findIndex((id) => id === sourceId);

      let newIndex = beforeId
        ? items.current.findIndex((id) => id === beforeId)
        : items.current.length;

      if (origIndex < 0 || newIndex < 0) return;
      if (props.onSort) {
        if (newIndex > origIndex) {
          newIndex -= 1;
        }
        if (origIndex === newIndex) return;
        const item = items.current.splice(origIndex, 1);
        items.current.splice(newIndex, 0, item[0]);

        props.onSort(items.current);
      }
    };

    const dragstart = (e: DragEvent) => {
      isDragEnd = false;
      source = getSource(e);
      if (!source) {
        return false;
      }
      origRef = source.nextElementSibling;
      const rect = source.getBoundingClientRect();
      let dragSource = source;
      if (props.dragImageSourceHandler) {
        dragSource = props.dragImageSourceHandler(source);
      }
      if (e.dataTransfer) {
        e.dataTransfer.setDragImage(
          dragSource,
          e.clientX - rect.left,
          e.clientY - rect.top,
        );
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.dropEffect = 'move';
        try {
          e.dataTransfer.setData('application/json', {} as any);
        } catch (ex) {
          // eslint-disable-line
        }
      }

      setTimeout(() => {
        source?.classList.add('ape-setter-dragging');
      }, 0);
      return true;
    };

    const placeAt = (beforeRef: Element | null) => {
      if (beforeRef) {
        if (beforeRef !== source) {
          box.insertBefore(source, beforeRef);
        }
      } else {
        box.appendChild(source);
      }
    };

    const adjust = (e: DragEvent) => {
      if (isDragEnd) return;
      ref = locate(e);
      placeAt(ref);
    };

    let lastDragEvent: DragEvent | null;
    const drag = (e: DragEvent) => {
      if (!source) return;
      e.preventDefault();
      if (lastDragEvent) {
        if (
          lastDragEvent.clientX === e.clientX &&
          lastDragEvent.clientY === e.clientY
        ) {
          return;
        }
      }
      lastDragEvent = e;
      if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'move';
      }
      adjust(e);
    };

    const dragend = (e: DragEvent) => {
      isDragEnd = true;
      if (!source) return;
      e.preventDefault();
      source.classList.remove('ape-setter-dragging');
      placeAt(origRef);
      sort(ref ? (ref as HTMLDivElement).dataset.id : null);
      source = null;
      ref = null;
      origRef = null;
      lastDragEvent = null;
    };

    box.addEventListener('dragstart', dragstart);
    document.addEventListener('dragover', drag);
    document.addEventListener('drag', drag);
    document.addEventListener('dragend', dragend);

    return () => {
      box.removeEventListener('dragstart', dragstart);
      document.removeEventListener('dragover', drag);
      document.removeEventListener('drag', drag);
      document.removeEventListener('dragend', dragend);
    };
  }, [props.dragImageSourceHandler, props.onSort]);

  const getShellNode = (ref) => {
    shell.current = ref;
  };

  const { className, itemClassName, children } = props;
  const newitems: (string | number)[] = [];
  const cards = React.Children.map(children, (child) => {
    const { key: id } = child as ReactElement<{ key: string }>;
    newitems.push(id);
    return (
      <div
        key={id}
        data-id={id}
        className={classNames('ape-setter-sortable-card', itemClassName)}
      >
        {child}
      </div>
    );
  });
  items.current = newitems;

  return (
    <div
      className={classNames('ape-setter-sortable', className)}
      ref={getShellNode}
    >
      {cards}
    </div>
  );
}
