import React, { useState } from 'react';
import {
  InputNumber,
  Space,
  Radio,
  RadioChangeEvent,
  ColorPicker,
  Typography,
} from 'antd';
import { Color } from 'antd/es/color-picker';
import { CurrentObject } from '../core/KonvaController';

type Props = {
  currentObject: CurrentObject;
  updateAttr: (key: string, value: unknown) => void;
};

const ArrowOptions = ({ currentObject, updateAttr }: Props) => {
  const [fillColor, setFillColor] = useState(
    currentObject.attrs.fill ?? '#fff'
  );
  const [strokeColor, setStrokeColor] = useState(
    currentObject.attrs.stoke ?? '#aaa'
  );
  const [strokeWidth, setStrokeWidth] = useState(
    currentObject.attrs.strokeWidth ?? 0
  );
  const [dash, setDash] = useState(currentObject.attrs.dash ? 'dash' : 'none');

  const handleColorChange = (value: Color) => {
    const formattedColor = value.toHexString();
    setFillColor(formattedColor);
    updateAttr('fill', formattedColor);
  };

  const handleStrokeChange = (value: Color) => {
    const formattedColor = value.toHexString();
    setStrokeColor(formattedColor);
    updateAttr('stroke', formattedColor);
  };

  const handleStrokeWidthChange = (value: number | null) => {
    setStrokeWidth(value);
    updateAttr('strokeWidth', value);
  };

  const handleDashChange = (e: RadioChangeEvent) => {
    const value = e.target.value;
    setDash(value);
    if (value === 'dash') {
      updateAttr('dash', [2]);
    } else {
      updateAttr('dash', []);
    }
  };

  return (
    <Space direction={'vertical'} align="start">
      <Space>
        <Typography.Text>배경색:</Typography.Text>
        <ColorPicker
          value={fillColor}
          format={'hex'}
          onChange={handleColorChange}
        />
        <Typography.Text>{fillColor}</Typography.Text>
      </Space>
      <Space>
        <Typography.Text>선 색:</Typography.Text>
        <ColorPicker
          value={strokeColor}
          format={'hex'}
          onChange={handleStrokeChange}
        />
        <Typography.Text>{strokeColor}</Typography.Text>
      </Space>
      <Space>
        <Typography.Text>선 두께:</Typography.Text>
        <InputNumber
          type="text"
          name="rect-stroke-width"
          addonAfter="px"
          value={strokeWidth}
          onChange={handleStrokeWidthChange}
        />
      </Space>
      <Radio.Group onChange={handleDashChange} value={dash}>
        <Radio
          type="radio"
          name="rect-dash"
          value={'none'}
          onChange={handleDashChange}
        >
          점선 없음
        </Radio>
        <Radio
          type="radio"
          name="rect-dash"
          value={'dash'}
          onChange={handleDashChange}
        >
          점선 추가
        </Radio>
      </Radio.Group>
    </Space>
  );
};

export default ArrowOptions;
