import React, { useMemo } from 'react';
import { CurrentObject } from '../core/KonvaController';

import {
  CaretRightOutlined,
  CaretLeftOutlined,
  ForwardOutlined,
  BackwardOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import { Tooltip, Button, Space, Typography } from 'antd';
import Shape from './Shape';

import styles from './layers.module.css';

type Props = {
  object: CurrentObject;
  selectCurrentObject: (id: number) => void;
  moveToTop: () => void;
  moveToFoward: () => void;
  moveToBackward: () => void;
  moveToBottom: () => void;
  removeObject: () => void;
};

const ObjectLayerItem = ({
  object,
  moveToTop,
  moveToFoward,
  moveToBottom,
  moveToBackward,
  selectCurrentObject,
  removeObject,
}: Props) => {
  const name = useMemo(() => {
    switch (object.name()) {
      case 'rect':
        return '사각형';
      case 'triangle':
        return '삼각형';
      case 'arrow':
        return '화살표';
      case 'image':
        return '이미지';
      case 'circle':
        return '원';
      default:
        return '';
    }
  }, [object]);

  const handleObjectItemClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    selectCurrentObject(object._id);
  };

  const handleObjectMoveToTopClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    selectCurrentObject(object._id);
    moveToTop();
  };
  const handleObjectMoveToForwardClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    selectCurrentObject(object._id);
    moveToFoward();
  };
  const handleObjectMoveToBottomClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    selectCurrentObject(object._id);
    moveToBottom();
  };
  const handleObjectMoveToBackwardClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    selectCurrentObject(object._id);
    moveToBackward();
  };
  const handleObjectRemoveObjecClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    selectCurrentObject(object._id);
    removeObject();
  };

  return (
    <Space onClick={handleObjectItemClick}>
      <Shape type={object.name()} fill={object.attrs.fill as string} />
      <span className={styles.name}>
        <Typography.Text ellipsis={true}>
          {object.name() !== 'text' ? name : object.attrs.text}
        </Typography.Text>
      </span>
      <Space size={4}>
        <Tooltip title="맨 뒤로" placement="top">
          <Button
            icon={<BackwardOutlined />}
            onClick={handleObjectMoveToBottomClick}
          />
        </Tooltip>
        <Tooltip title="뒤로" placement="top">
          <Button
            icon={<CaretLeftOutlined />}
            onClick={handleObjectMoveToBackwardClick}
          />
        </Tooltip>

        <Tooltip title="앞으로" placement="top">
          <Button
            icon={<CaretRightOutlined />}
            onClick={handleObjectMoveToForwardClick}
          />
        </Tooltip>
        <Tooltip title="맨 앞으로" placement="top">
          <Button
            icon={<ForwardOutlined />}
            onClick={handleObjectMoveToTopClick}
          />
        </Tooltip>

        <Tooltip title="삭제" placement="top">
          <Button
            icon={<DeleteOutlined />}
            onClick={handleObjectRemoveObjecClick}
          />
        </Tooltip>
      </Space>
    </Space>
  );
};

export default ObjectLayerItem;
