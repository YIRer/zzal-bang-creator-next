import React, { ChangeEvent, useState } from 'react';
import { CurrentObject } from './core/KonvaController';

type Props = {
  currentObject: CurrentObject;
  updateAttr: (key: string, value: unknown) => void;
};

const ObjectController = ({ currentObject, updateAttr }: Props) => {
  const [fillColor, setFillColor] = useState(
    currentObject.attrs.fill ?? '#fff'
  );
  const [strokeColor, setStrokeColor] = useState(
    currentObject.attrs.stoke ?? '#aaa'
  );
  const [strokeWidth, setStrokeWidth] = useState(
    currentObject.attrs.strokeWidth ?? 0
  );
  const [starPoint, setStarPoint] = useState(
    currentObject.attrs.numPoints ?? 5
  );
  const [innerRadius, setInnerRadius] = useState(
    currentObject.attrs.innerRadius ?? 40
  );
  const [outerRadius, setOuterRadius] = useState(
    currentObject.attrs.outerRadius ?? 70
  );
  const [width, setWidth] = useState(currentObject.attrs.width);
  const [height, setHeight] = useState(currentObject.attrs.height);
  const [hasDash, setDash] = useState(
    currentObject.attrs.dash ? 'dash' : 'none'
  );

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFillColor(e.target.value);
    updateAttr('fill', e.target.value);
  };

  const handleStrokeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStrokeColor(e.target.value);
    updateAttr('stroke', e.target.value);
  };

  const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value)) {
      return;
    }
    setWidth(value);
    updateAttr('width', value);
  };

  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value)) {
      return;
    }
    setHeight(value);
    updateAttr('height', value);
  };

  const handleStarPointChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value)) {
      return;
    }
    setStarPoint(value);
    updateAttr('numPoints', value);
  };

  const handleStarInnerRadiusChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value)) {
      return;
    }
    setInnerRadius(value);
    updateAttr('innerRadius', value);
  };

  const handleStarOuterRadiusChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value)) {
      return;
    }
    setOuterRadius(value);
    updateAttr('outerRadius', value);
  };

  const handleStrokeWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value)) {
      return;
    }
    setStrokeWidth(value);
    updateAttr('strokeWidth', value);
  };

  const handleDashChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setDash(value);
    if (value === 'dash') {
      updateAttr('dash', [2]);
    } else {
      updateAttr('dash', []);
    }
  };

  return (
    <div>
      <input
        type="text"
        name="rect-width"
        value={width}
        onChange={handleWidthChange}
      />
      <input
        type="text"
        name="rect-height"
        value={height}
        onChange={handleHeightChange}
      />
      {currentObject.attrs.name === 'star' && (
        <>
          <input
            type="text"
            name="star-point"
            value={starPoint}
            onChange={handleStarPointChange}
          />
          <input
            type="text"
            name="star-inner-radius"
            value={innerRadius}
            onChange={handleStarInnerRadiusChange}
          />
          <input
            type="text"
            name="star-outer-radius"
            value={outerRadius}
            onChange={handleStarOuterRadiusChange}
          />
        </>
      )}
      <input
        type="color"
        name="rect-fill-color"
        value={fillColor}
        onChange={handleColorChange}
      />
      <input
        type="color"
        name="rect-stroke-color"
        value={strokeColor}
        onChange={handleStrokeChange}
      />
      <input
        type="text"
        name="rect-stroke-width"
        value={strokeWidth}
        onChange={handleStrokeWidthChange}
      />
      <div>
        <label>
          <input
            type="radio"
            name="rect-dash"
            value={'none'}
            checked={hasDash === 'none'}
            onChange={handleDashChange}
          />
          <span>점선 없음</span>
        </label>
        <label>
          <input
            type="radio"
            name="rect-dash"
            value={'dash'}
            checked={hasDash === 'dash'}
            onChange={handleDashChange}
          />
          <span>점선 추가</span>
        </label>
      </div>
      <div>
        <select>
          <option>aa</option>
          <option>aa</option>
          <option>aa</option>
          <option>aa</option>
          <option>aa</option>
          <option>aa</option>
        </select>
      </div>
    </div>
  );
};

export default ObjectController;
