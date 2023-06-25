import React from 'react';
import {
  PlusSquareOutlined,
  PlusCircleOutlined,
  StarOutlined,
  ArrowRightOutlined,
  CaretRightOutlined,
  BoldOutlined,
} from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

type Props = {
  addRect: () => void;
  addCircle: () => void;
  addStar: () => void;
  addArrow: () => void;
  addTriangle: () => void;
  addText: () => void;
};

const Toolbox = ({
  addRect,
  addCircle,
  addStar,
  addArrow,
  addTriangle,
  addText,
}: Props) => {
  return (
    <>
      <Tooltip title="사각형 추가" placement="right">
        <Button icon={<PlusSquareOutlined />} onClick={addRect} />
      </Tooltip>
      <Tooltip title="원 추가" placement="right">
        <Button icon={<PlusCircleOutlined />} onClick={addCircle} />
      </Tooltip>
      <Tooltip title="별 추가" placement="right">
        <Button icon={<StarOutlined />} onClick={addStar} />
      </Tooltip>
      <Tooltip title="화살표 추가" placement="right">
        <Button icon={<ArrowRightOutlined />} onClick={addArrow} />
      </Tooltip>
      <Tooltip title="삼각형 추가" placement="right">
        <Button icon={<CaretRightOutlined />} onClick={addTriangle} />
      </Tooltip>
      <Tooltip title="텍스트 추가" placement="right">
        <Button icon={<BoldOutlined />} onClick={addText} />
      </Tooltip>
    </>
  );
};

export default Toolbox;
