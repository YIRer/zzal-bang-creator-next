import React from 'react';
import { Space } from 'antd';
import { CurrentObject } from '../core/KonvaController';
import ArrowOptions from './ArrowOptions';
import CircleOptions from './CircleOptions';
import styles from './controller.module.css';
import ImageOptions from './ImageOptions';
import RectOptions from './RectOptions';
import StarOptions from './StarOptions';
import TextOptions from './TextOptions';
import TriangleOptions from './TriangleOptions';

type Props = {
  currentObject: CurrentObject;
  updateAttr: (key: string, value: unknown) => void;
};

const ObjectController = ({ currentObject, updateAttr }: Props) => {
  return (
    <div className={styles.controllerWrapper}>
      <Space direction={'vertical'} align="start">
        {currentObject.attrs.name === 'rect' && (
          <RectOptions currentObject={currentObject} updateAttr={updateAttr} />
        )}

        {currentObject.attrs.name === 'circle' && (
          <CircleOptions
            currentObject={currentObject}
            updateAttr={updateAttr}
          />
        )}

        {currentObject.attrs.name === 'star' && (
          <StarOptions currentObject={currentObject} updateAttr={updateAttr} />
        )}
        {currentObject.attrs.name === 'arrow' && (
          <ArrowOptions currentObject={currentObject} updateAttr={updateAttr} />
        )}
        {currentObject.attrs.name === 'triangle' && (
          <TriangleOptions
            currentObject={currentObject}
            updateAttr={updateAttr}
          />
        )}
        {currentObject.attrs.name === 'text' && (
          <TextOptions currentObject={currentObject} updateAttr={updateAttr} />
        )}
        {currentObject.attrs.name === 'image' && (
          <ImageOptions currentObject={currentObject} updateAttr={updateAttr} />
        )}
      </Space>
    </div>
  );
};

export default ObjectController;
