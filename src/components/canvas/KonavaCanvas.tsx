'use client';
import React, { useRef } from 'react';
import ObjectController from './ObjectController';
import useKonvaCanvas from './hooks/useKonvaCanvas';
import ObjectLayerController from './objectLayerController/ObjectLayerController';
import './canvas.css';

const KonavaCanvas = () => {
  const imageFile = useRef<HTMLInputElement>(null);
  const {
    konvaController,
    currentObject,
    cavnasWidth,
    cavnasHeight,
    objects,
    addRect,
    addCircle,
    addStar,
    addArrow,
    addTriangle,
    addText,
    updateCanvasSize,
    resizeCanvas,
    updateAttr,
    onExportImageClick,
    onFileUploadChange,
    onZoomInClick,
    onZoomOutClick,
    onZoomResetClick,
    moveToTop,
    moveToFoward,
    moveToBottom,
    moveToBackward,
    selectCurrentObject,
    removeObject,
  } = useKonvaCanvas({
    onDeleteObject: (target) => {
      if (target?.attrs.name === 'image' && imageFile.current) {
        imageFile.current.value = '';
      }
    },
  });

  return (
    <div id="konva-canvas-conainer">
      <div tabIndex={0} id="konva-canvas-wrapper">
        <div id="konva-canvas"></div>
      </div>
      <div>
        <button onClick={addRect}>add rect</button>
        <button onClick={addCircle}>add circle</button>
        <button onClick={addStar}>add star</button>
        <button onClick={addArrow}>add arrow</button>
        <button onClick={addTriangle}>add triangle</button>
        <button onClick={addText}>add text</button>
        <button onClick={onZoomInClick}>zoom in</button>
        <button onClick={onZoomOutClick}>zoom out</button>
        <button onClick={onZoomResetClick}>zoom reset</button>
        <button onClick={onExportImageClick}>export image</button>
        <input
          ref={imageFile}
          type="file"
          id="canvas-file"
          onChange={onFileUploadChange}
        />
        <div>
          <input
            onChange={(e) => updateCanvasSize(e, 'width')}
            type={'number'}
            name={'canvas-width'}
            value={cavnasWidth}
            min={1}
          />
          <input
            onChange={(e) => updateCanvasSize(e, 'height')}
            type={'number'}
            name={'canvas-height'}
            value={cavnasHeight}
            min={1}
          />
          <button onClick={resizeCanvas}>apply</button>
        </div>
      </div>
      <ObjectLayerController
        objects={objects}
        selectCurrentObject={selectCurrentObject}
        moveToTop={moveToTop}
        moveToFoward={moveToFoward}
        moveToBackward={moveToBackward}
        moveToBottom={moveToBottom}
        removeObject={removeObject}
      />
      {currentObject && konvaController && (
        <ObjectController
          currentObject={currentObject}
          updateAttr={updateAttr}
        />
      )}
    </div>
  );
};

export default KonavaCanvas;
