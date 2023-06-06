'use client';
import React, { useEffect, useState } from 'react';
import KonvaController, { CurrentObject } from './lib/KonvaController';

const KonavaCanvas = () => {
  const [konvaController, setKonvaController] = useState<KonvaController>();
  const [currentObject, setCurrentObject] = useState<CurrentObject>();

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

  const addText = () => {
    if (konvaController) {
      konvaController.addText();
    }
  };

  useEffect(() => {
    const controller = new KonvaController({
      id: 'konva-canvas',
      onSelectObject: setCurrentObject,
    });
    setKonvaController(controller);
    controller.initialize();
    console.log('loead!');
  }, []);

  return (
    <>
      <div id="konva-canvas"></div>
      <div>
        <button onClick={addRect}>add rect</button>
        <button onClick={addCircle}>add circle</button>
        <button onClick={addText}>add text</button>
        <button>change text</button>
      </div>
      {currentObject && <div>controller</div>}
    </>
  );
};

export default KonavaCanvas;
