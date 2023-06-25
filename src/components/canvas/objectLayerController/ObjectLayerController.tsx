import React from 'react';
import { Space } from 'antd';
import { CurrentObject } from '../core/KonvaController';

import ObjectLayerItem from './ObjectLayerItem';
import styles from './layers.module.css';

type Props = {
  objects: CurrentObject[];
  selectCurrentObject: (id: number) => void;
  moveToTop: () => void;
  moveToFoward: () => void;
  moveToBackward: () => void;
  moveToBottom: () => void;
  removeObject: () => void;
};

const ObjectLayerController = ({
  objects,
  moveToTop,
  moveToFoward,
  moveToBottom,
  moveToBackward,
  selectCurrentObject,
  removeObject,
}: Props) => {
  return (
    <div className={styles.layerWrapper}>
      <Space direction="vertical">
        {objects.map((obj) => {
          return (
            <ObjectLayerItem
              key={obj.name() + obj._id}
              object={obj}
              selectCurrentObject={selectCurrentObject}
              moveToBackward={moveToBackward}
              moveToTop={moveToTop}
              moveToBottom={moveToBottom}
              moveToFoward={moveToFoward}
              removeObject={removeObject}
            />
          );
        })}
      </Space>
    </div>
  );
};

export default ObjectLayerController;
