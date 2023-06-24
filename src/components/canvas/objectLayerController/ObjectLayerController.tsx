import React, { ChangeEvent, useState } from 'react';
import { CurrentObject } from '../core/KonvaController';
import ObjectOptionButtons from './ObjectOptionButtons';

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
  const handleObjectItemClick = (id: number) => {
    selectCurrentObject(id);
  };

  const handleObjectMoveToTopClick = (id: number) => {
    selectCurrentObject(id);
    moveToTop();
  };
  const handleObjectMoveToForwardClick = (id: number) => {
    selectCurrentObject(id);
    moveToBottom();
  };
  const handleObjectMoveToBottomClick = (id: number) => {
    selectCurrentObject(id);
    moveToFoward();
  };
  const handleObjectMoveToBackwardClick = (id: number) => {
    selectCurrentObject(id);
    moveToBackward();
  };
  const handleObjectRemoveObjecClick = (id: number) => {
    selectCurrentObject(id);
    removeObject();
  };

  return (
    <div>
      {objects.map((obj) => {
        return (
          <div
            key={obj.name() + obj._id}
            onClick={() => {
              handleObjectItemClick(obj._id);
            }}
          >
            {obj.name()}
            <ObjectOptionButtons
              id={obj._id}
              moveToBackward={handleObjectMoveToTopClick}
              moveToTop={handleObjectMoveToForwardClick}
              moveToBottom={handleObjectMoveToBottomClick}
              moveToFoward={handleObjectMoveToBackwardClick}
              removeObject={handleObjectRemoveObjecClick}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ObjectLayerController;
