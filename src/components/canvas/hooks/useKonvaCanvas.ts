'use client';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import KonvaController, { CurrentObject } from '../core/KonvaController';

type Props = {
  onDeleteObject: (target?: CurrentObject) => void;
};

const useKonvaCanvas = ({ onDeleteObject }: Props) => {
  const [konvaController, setKonvaController] = useState<KonvaController>();
  const [currentObject, setCurrentObject] = useState<CurrentObject>();
  const [cavnasWidth, setCanvasWidth] = useState<number>(500);
  const [cavnasHeight, setCanvasHeight] = useState<number>(500);
  const [objects, setObjects] = useState<CurrentObject[]>([]);

  const addRect = () => {
    if (konvaController) {
      konvaController.addRect();
    }
  };

  const addCircle = () => {
    if (konvaController) {
      konvaController.addCircle();
    }
  };

  const addStar = () => {
    if (konvaController) {
      konvaController.addStar();
    }
  };

  const addText = () => {
    if (konvaController) {
      konvaController.addText();
    }
  };

  const addArrow = () => {
    if (konvaController) {
      konvaController.addArrow();
    }
  };

  const addTriangle = () => {
    if (konvaController) {
      konvaController.addTriangle();
    }
  };

  const updateCanvasSize = (
    e: ChangeEvent<HTMLInputElement>,
    type: 'width' | 'height'
  ) => {
    const targetValue = Number(e.target.value);
    const value = targetValue === 0 ? 1 : targetValue;
    switch (type) {
      case 'width':
        setCanvasWidth(value);
        break;
      case 'height':
        setCanvasHeight(value);
        break;
      default:
        break;
    }
  };

  const resizeCanvas = () => {
    if (konvaController) {
      konvaController.resizeCanvase({
        width: cavnasWidth,
        height: cavnasHeight,
      });
    }
  };

  const onZoomInClick = () => {
    if (konvaController) {
      konvaController.zoomIn();
    }
  };

  const onZoomOutClick = () => {
    if (konvaController) {
      konvaController.zoomOut();
    }
  };

  const onZoomResetClick = () => {
    if (konvaController) {
      konvaController.zoomReset();
    }
  };

  const onExportImageClick = () => {
    if (konvaController) {
      konvaController.exportImage();
    }
  };

  const onFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      const image = new Image();
      image.onload = () => {
        konvaController?.addImage(image);
      };
      image.src = (e.target as FileReader).result as string;
    };
    fileReader.readAsDataURL((e.target.files as FileList)[0]);
  };

  const updateAttr = (key: string, value: unknown) => {
    currentObject?.setAttr(key, value);
  };

  const moveToTop = () => {
    if (konvaController) {
      konvaController.moveToTopObject();
    }
  };
  const moveToFoward = () => {
    if (konvaController) {
      konvaController.moveToForwardObject();
    }
  };

  const moveToBottom = () => {
    if (konvaController) {
      konvaController.moveToBottomObject();
    }
  };

  const moveToBackward = () => {
    if (konvaController) {
      konvaController.moveToBackwardObject();
    }
  };

  const selectCurrentObject = (id: number) => {
    if (konvaController) {
      const currentObject = konvaController.selectCurrentObjectById(id);
      setCurrentObject(currentObject);
    }
  };

  const onUpdateObjects = (currentObjects: CurrentObject[]) => {
    setObjects(currentObjects);
  };

  const removeObject = () => {
    if (konvaController) {
      konvaController.removeObject();
    }
  };

  const addTemplate = (templateName: string) => {
    if (konvaController) {
      konvaController.addTemplate(templateName);
    }
  };

  useEffect(() => {
    const controller = new KonvaController({
      id: 'konva-canvas',
      onSelectObject: setCurrentObject,
      onDeleteObject: onDeleteObject,
      handleUpdateObjects: onUpdateObjects,
    });
    setKonvaController(controller);
    controller.initialize();
    console.log('loead!');
  }, []);

  return {
    konvaController,
    currentObject,
    cavnasWidth,
    cavnasHeight,
    objects,
    addRect,
    addCircle,
    addStar,
    addText,
    addArrow,
    addTriangle,
    addTemplate,
    updateCanvasSize,
    resizeCanvas,
    updateAttr,
    onZoomInClick,
    onZoomOutClick,
    onZoomResetClick,
    onExportImageClick,
    onFileUploadChange,
    moveToTop,
    moveToFoward,
    moveToBottom,
    moveToBackward,
    selectCurrentObject,
    removeObject,
  };
};

export default useKonvaCanvas;
