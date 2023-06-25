import React, { useMemo } from 'react';
import {
  StarOutlined,
  ArrowRightOutlined,
  FileImageFilled,
  CaretRightOutlined,
  BoldOutlined,
} from '@ant-design/icons';
import styles from './layers.module.css';

type Props = {
  type: string;
  fill?: string;
};

const Shape = ({ type, fill }: Props) => {
  const shapeClass = useMemo(() => {
    switch (type) {
      case 'rect':
        return styles.rect;
      case 'circle':
        return styles.circle;
      default:
        return '';
    }
  }, [type]);

  if (type === 'arrow') {
    return <ArrowRightOutlined />;
  }
  if (type === 'star') {
    return <StarOutlined />;
  }
  if (type === 'image') {
    return <FileImageFilled />;
  }

  if (type === 'triangle') {
    return <CaretRightOutlined />;
  }
  if (type === 'text') {
    return <BoldOutlined />;
  }

  return (
    <div
      className={shapeClass}
      style={{
        backgroundColor: fill ?? 'transparent',
      }}
    />
  );
};

export default Shape;
