import React, { ChangeEvent, useState } from 'react';
import { CurrentObject } from './core/KonvaController';

type Props = {
  objects: CurrentObject[];
  moveToTop: () => void;
  moveToFoward: () => void;
  moveToBackward: () => void;
  moveToBottom: () => void;
};

const ObjectLayerController = ({
  objects,
  moveToTop,
  moveToFoward,
  moveToBottom,
  moveToBackward,
}: Props) => {
  return (
    <div>
      {objects.map((obj) => {
        return (
          <div key={obj.name()}>
            {obj.name()}
            <button onClick={moveToTop}>맨 앞으로</button>
            <button onClick={moveToFoward}>앞으로</button>
            <button onClick={moveToBottom}>맨 뒤로</button>
            <button onClick={moveToBackward}>뒤로</button>
          </div>
        );
      })}
    </div>
  );
};

export default ObjectLayerController;
