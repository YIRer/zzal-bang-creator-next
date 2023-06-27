'use client';
import React, { useEffect, useRef } from 'react';
import {
  FileImageFilled,
  DownloadOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import { Button, InputNumber, Space, Tooltip } from 'antd';
import ObjectController from './objectController/ObjectController';
import useKonvaCanvas from './hooks/useKonvaCanvas';
import ObjectLayerController from './objectLayerController/ObjectLayerController';
import TemplateList from './templateList/TemplateList';
import Toolbox from './Toolbox';

import styles from './canvas.module.css';

const KonavaCanvas = () => {
  const imageFile = useRef<HTMLInputElement>(null);
  const {
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
    addTemplate,
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

  const handleCanvasWidthUpdate = (value: number | null) => {
    if (value) {
      updateCanvasSize(value, 'width');
    }
  };
  const handleCanvasHeightUpdate = (value: number | null) => {
    if (value) {
      updateCanvasSize(value, 'height');
    }
  };

  const handleUploadIconClick = () => {
    if (imageFile.current) {
      imageFile.current.click();
    }
  };

  return (
    <div>
      <div className={styles.editorWrapper}>
        <div tabIndex={0} className={styles.canvasWrapper}>
          <div id="konva-canvas" className={styles.canvas}></div>
        </div>

        <div className={styles.toolboxWrapper}>
          <Toolbox
            addRect={addRect}
            addCircle={addCircle}
            addStar={addStar}
            addArrow={addArrow}
            addTriangle={addTriangle}
            addText={addText}
          />
          <Tooltip title="이미지 업로드" placement="right">
            <span className={styles.fileUploadWrapper}>
              <Button
                icon={<FileImageFilled />}
                onClick={handleUploadIconClick}
              ></Button>
              <input
                className={styles.fileInput}
                ref={imageFile}
                type="file"
                accept="image/*"
                id="canvas-file"
                onChange={onFileUploadChange}
              />
            </span>
          </Tooltip>
          <Tooltip title="이미지 다운로드(png)" placement="right">
            <Button icon={<DownloadOutlined />} onClick={onExportImageClick} />
          </Tooltip>
        </div>
        <div className={styles.resizeCanvasWrapper}>
          <Space>
            <InputNumber
              onChange={handleCanvasWidthUpdate}
              prefix="W"
              type={'number'}
              name={'canvas-width'}
              value={cavnasWidth}
              min={1}
            />
            <InputNumber
              onChange={handleCanvasHeightUpdate}
              prefix="H"
              type={'number'}
              name={'canvas-height'}
              value={cavnasHeight}
              min={1}
            />
            <Button onClick={resizeCanvas} type="text">
              변경
            </Button>
          </Space>
        </div>
        <div className={styles.zoomBoxWrapper}>
          <Space>
            <Tooltip title="줌 인" placement="top">
              <Button icon={<ZoomInOutlined />} onClick={onZoomInClick} />
            </Tooltip>
            <Tooltip title="줌 아웃" placement="top">
              <Button icon={<ZoomOutOutlined />} onClick={onZoomOutClick} />
            </Tooltip>
            <Tooltip title="줌 리셋" placement="top">
              <Button icon={<UndoOutlined />} onClick={onZoomResetClick} />
            </Tooltip>
          </Space>
        </div>
        {objects.length > 0 && (
          <ObjectLayerController
            objects={objects}
            selectCurrentObject={selectCurrentObject}
            moveToTop={moveToTop}
            moveToFoward={moveToFoward}
            moveToBackward={moveToBackward}
            moveToBottom={moveToBottom}
            removeObject={removeObject}
          />
        )}
        {currentObject && (
          <ObjectController
            currentObject={currentObject}
            updateAttr={updateAttr}
          />
        )}
      </div>

      <TemplateList addTemplate={addTemplate} />
    </div>
  );
};

export default KonavaCanvas;
