import {
  InputNumber,
  Space,
  Radio,
  RadioChangeEvent,
  ColorPicker,
  Slider,
  Typography,
} from 'antd';
import { Color } from 'antd/es/color-picker';
import Konva from 'konva';
import { Filter } from 'konva/lib/Node';
import React, { useState } from 'react';
import { CurrentObject } from '../core/KonvaController';

type Props = {
  currentObject: CurrentObject;
  updateAttr: (key: string, value: unknown) => void;
};

const ImageOptions = ({ currentObject, updateAttr }: Props) => {
  const [imagefilters, setImageFilters] = useState<Filter[]>([]);

  const [fillColor, setFillColor] = useState(
    currentObject.attrs.fill ?? '#fff'
  );
  const [strokeColor, setStrokeColor] = useState(
    currentObject.attrs.stoke ?? '#aaa'
  );
  const [strokeWidth, setStrokeWidth] = useState(
    currentObject.attrs.strokeWidth ?? 0
  );

  const [blur, setBlur] = useState(currentObject.attrs.blur ?? 0);
  const [brightness, setBrightness] = useState(
    currentObject.attrs.brightness ?? 0
  );
  const [contrast, setContrast] = useState(currentObject.attrs.contrast ?? 0);
  const [dash, setDash] = useState(currentObject.attrs.dash ? 'dash' : 'none');
  const [grayscale, setGrayscale] = useState(
    imagefilters.find((filter) => filter.name === 'Contrast') ? 'on' : 'off'
  );

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

  const handleBlurhange = (value: number) => {
    setBlur(value);
    currentObject.cache();
    if (!imagefilters.find((filter) => filter.name === 'Blur')) {
      currentObject.filters([...imagefilters, Konva.Filters.Blur]);
      setImageFilters((state) => [...state, Konva.Filters.Blur]);
    }
    currentObject.blurRadius(value);
  };

  const handleBrightenChange = (value: number) => {
    setBrightness(value);
    currentObject.cache();
    if (!imagefilters.find((filter) => filter.name === 'Brighten')) {
      currentObject.filters([...imagefilters, Konva.Filters.Brighten]);
      setImageFilters((state) => [...state, Konva.Filters.Brighten]);
    }
    currentObject.brightness(value);
  };

  const handleContrastChange = (value: number) => {
    setContrast(value);
    currentObject.cache();
    if (!imagefilters.find((filter) => filter.name === 'Contrast')) {
      currentObject.filters([...imagefilters, Konva.Filters.Contrast]);
      setImageFilters((state) => [...state, Konva.Filters.Contrast]);
    }
    currentObject.contrast(value);
  };

  const handleGrayscaleChange = (e: RadioChangeEvent) => {
    const value = e.target.value;
    setGrayscale(value);
    currentObject.cache();
    const filteredImage = imagefilters.filter((filter) => {
      return filter.name !== 'Grayscale';
    });
    if (value === 'on') {
      currentObject.filters([...filteredImage, Konva.Filters.Grayscale]);
      setImageFilters((state) => [...state, Konva.Filters.Grayscale]);
    } else {
      currentObject.filters(filteredImage);
    }
  };

  return (
    <Space direction={'vertical'} align="start">
      <Space>
        <Typography.Text>블러:</Typography.Text>
        <Slider
          style={{ width: '200px' }}
          defaultValue={blur}
          min={0}
          max={40}
          step={0.05}
          onChange={handleBlurhange}
        />
      </Space>
      <Space>
        <Typography.Text>밝기:</Typography.Text>
        <Slider
          style={{ width: '200px' }}
          defaultValue={brightness}
          min={-1}
          max={1}
          step={0.05}
          onChange={handleBrightenChange}
        />
      </Space>
      <Space>
        <Typography.Text>대비:</Typography.Text>
        <Slider
          style={{ width: '200px' }}
          defaultValue={contrast}
          min={-100}
          max={100}
          step={1}
          onChange={handleContrastChange}
        />
      </Space>
      <Space>
        <Typography.Text>그레이스케일:</Typography.Text>
        <Radio.Group onChange={handleGrayscaleChange} value={grayscale}>
          <Radio
            type="radio"
            name="grayscale"
            value={'off'}
            onChange={handleGrayscaleChange}
          >
            없음
          </Radio>
          <Radio
            type="radio"
            name="grayscale"
            value={'on'}
            onChange={handleGrayscaleChange}
          >
            있음
          </Radio>
        </Radio.Group>
      </Space>
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

export default ImageOptions;
