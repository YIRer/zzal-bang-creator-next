import Konva from 'konva';
import { Transformer } from 'konva/lib/shapes/Transformer';

export type CurrentObject =
  | Konva.Shape
  | Konva.Image
  | Konva.Text
  | Konva.Stage
  | Konva.Star
  | Konva.RegularPolygon;

class KonvaController {
  private id: string;
  private stage: Konva.Stage;
  private layer: Konva.Layer;
  private constianer: HTMLDivElement;
  private currentObject: Konva.Shape | Konva.Image | Konva.Text | Konva.Stage;
  private size = {
    width: 500,
    height: 500,
  };
  private zoomLevel: number = 1;
  private transfomer: Konva.Transformer;
  private handleSelectObject: (target?: CurrentObject) => void;
  private handleDeleteObject: (target?: CurrentObject) => void;
  private handleUpdateObjects?: (objects: CurrentObject[]) => void;

  constructor({
    id,
    onSelectObject,
    onDeleteObject,
    handleUpdateObjects,
  }: {
    id: string;
    onSelectObject: (target?: CurrentObject) => void;
    onDeleteObject: (target?: CurrentObject) => void;
    handleUpdateObjects?: (objects: CurrentObject[]) => void;
  }) {
    this.id = id;
    this.stage = new Konva.Stage({
      container: this.id,
      width: this.size.width,
      height: this.size.height,
    });

    this.transfomer = new Transformer({
      boundBoxFunc: function (_oldBox, newBox) {
        newBox.width = Math.max(30, newBox.width);
        return newBox;
      },
    });

    this.layer = new Konva.Layer({
      name: 'main-layer',
    });

    this.layer.add(this.transfomer);

    this.stage.add(this.layer);

    this.constianer = this.stage.container();

    this.currentObject = this.stage;
    this.handleSelectObject = onSelectObject;
    this.handleDeleteObject = onDeleteObject;
    if (handleUpdateObjects) {
      this.handleUpdateObjects = handleUpdateObjects;
    }
  }

  initialize = () => {
    this.constianer.tabIndex = 1;

    this.constianer.addEventListener('keydown', (e) => {
      if (e.key === 'Delete') {
        this.removeObject();
      }
    });

    this.stage.on('click tab touch', (e) => {
      if (e.target.name().length > 0) {
        this.currentObject = e.target;
      }
      if (e.target === this.stage) {
        this.transfomer.nodes([]);
        this.handleSelectObject(undefined);
        return;
      }

      this.transfomer.nodes([e.target]);
      this.handleSelectObject(e.target);
    });
  };

  getStage = () => {
    return this.stage;
  };

  getLayers = () => {
    return this.stage.getLayers();
  };

  getObjects = () => {
    return this.getLayers()[0]
      .getChildren()
      .filter(
        (object) => object.className !== 'Transformer'
      ) as CurrentObject[];
  };

  getCurrentObject = () => {
    return this.currentObject;
  };

  addRect = (configs: Konva.ShapeConfig = {}) => {
    const rectNode = new Konva.Rect({
      width: 50,
      height: 50,
      x: 0,
      y: 0,
      fill: 'white',
      strokeWidth: 1,
      stroke: 'grey',
      name: 'rect',
      draggable: true,
      ...configs,
    });

    this.layer.add(rectNode);

    this.onUpdateObjects();
  };

  addCircle = (configs: Konva.ShapeConfig = {}) => {
    const circleNode = new Konva.Circle({
      width: 50,
      height: 50,
      x: 25,
      y: 25,
      fill: 'white',
      strokeWidth: 1,
      stroke: 'grey',
      name: 'circle',
      draggable: true,
      ...configs,
    });

    this.layer.add(circleNode);
    this.onUpdateObjects();
  };

  addStar = (configs: Konva.ShapeConfig = {}) => {
    const circleNode = new Konva.Star({
      width: 50,
      height: 50,
      x: 100,
      y: 100,
      fill: 'yellow',
      strokeWidth: 1,
      stroke: 'grey',
      name: 'star',
      numPoints: 5,
      innerRadius: 40,
      outerRadius: 70,
      draggable: true,
      ...configs,
    });

    this.layer.add(circleNode);
    this.onUpdateObjects();
  };

  addText = (configs: Konva.TextConfig = {}) => {
    const textNode = new Konva.Text({
      x: 0,
      y: 0,
      text: 'text',
      name: 'text',
      fontSize: 20,
      draggable: true,
      ...configs,
    });

    textNode.on('transform', () => {
      textNode.setAttrs({
        width: textNode.width() * textNode.scaleX(),
        scaleX: 1,
      });
    });

    textNode.on('dblclick dbltap', () => {
      textNode.hide();
      this.transfomer.hide();
      const textPosition = textNode.getAbsolutePosition();

      const stageBox = this.constianer.getBoundingClientRect();

      const areaPosition = {
        x: stageBox.left + textPosition.x,
        y: stageBox.top + textPosition.y,
      };

      const textarea = document.createElement('textarea');
      document.body.appendChild(textarea);

      textarea.value = textNode.text();
      textarea.style.position = 'absolute';
      textarea.style.top = areaPosition.y + 'px';
      textarea.style.left = areaPosition.x + 'px';
      textarea.style.height =
        textNode.height() - textNode.padding() * 2 + 5 + 'px';
      textarea.style.fontSize = textNode.fontSize() + 'px';
      textarea.style.border = 'none';
      textarea.style.padding = '0px';
      textarea.style.margin = '0px';
      textarea.style.overflow = 'hidden';
      textarea.style.background = 'none';
      textarea.style.outline = 'none';
      textarea.style.resize = 'none';
      textarea.style.fontFamily = textNode.fontFamily();
      textarea.style.transformOrigin = 'left top';
      textarea.style.textAlign = textNode.align();
      textarea.style.color = textNode.fill();
      textarea.style.fontWeight = textNode.fontStyle();

      const rotation = textNode.rotation();

      let transform = '';
      if (rotation) {
        transform += 'rotateZ(' + rotation + 'deg)';
      }

      let px = 0;
      const isFirefox =
        navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

      if (isFirefox) {
        px += 2 + Math.round(textNode.fontSize() / 20);
      }

      transform += 'translateY(-' + px + 'px)';

      textarea.style.transform = transform;

      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 3 + 'px';

      textarea.focus();
      const transfomer = this.transfomer;

      function handleOutsideClick(e: MouseEvent) {
        if (e.target !== textarea) {
          textNode.text(textarea.value);
          removeTextarea();
        }
      }

      function removeTextarea() {
        textarea.parentNode?.removeChild(textarea);
        window.removeEventListener('click', handleOutsideClick);
        textNode.show();
        transfomer.show();
        transfomer.forceUpdate();
      }

      textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          textNode.text(textarea.value);
          removeTextarea();
          return;
        }

        if (e.key === 'Escape') {
          removeTextarea();
          return;
        }
      });

      textarea.addEventListener('keyup', () => {
        textarea.style.height = 'auto';
        textarea.style.height =
          textarea.scrollHeight + textNode.fontSize() + 'px';
      });

      setTimeout(() => {
        window.addEventListener('click', handleOutsideClick);
      }, 0);
    });

    this.layer.add(textNode);
    this.onUpdateObjects();
  };

  addImage = (image: HTMLImageElement, isTempalte?: boolean) => {
    const stage = this.getStage();

    const stageWitdh = stage.width();
    const stageHeight = stage.height();

    const widthRatio = image.width / stageWitdh;
    const heightRaio = image.height / stageHeight;

    const imageRatio = image.width / image.height;

    const imageConfig: Pick<Konva.ImageConfig, 'width' | 'height'> = {};

    if (isTempalte) {
      imageConfig.width = image.width;
      imageConfig.height = image.height;
    } else if (image.width > image.height) {
      imageConfig.width = image.width / widthRatio;
      imageConfig.height = (image.height / heightRaio) * imageRatio;
    } else {
      imageConfig.width = (image.width / widthRatio) * imageRatio;
      imageConfig.height = image.height / heightRaio;
    }

    const konvaImage = new Konva.Image({
      ...imageConfig,
      image,
      x: 0,
      y: 0,
      draggable: true,
      name: 'image',
    });

    if (isTempalte) {
      this.resizeCanvase({
        width: image.width,
        height: image.height,
      });
      konvaImage.moveToBottom();
    }

    this.layer.add(konvaImage);
    this.layer.draw();
    this.onUpdateObjects();
  };

  addArrow = (
    configs: Konva.ArrowConfig = {
      points: [20, 60, 100, 60],
    }
  ) => {
    const arrowNode = new Konva.Arrow({
      x: 0,
      y: 0,
      pointerLength: 10,
      pointerWidth: 10,
      fill: 'white',
      stroke: 'black',
      strokeWidth: 1,
      name: 'arrow',
      draggable: true,
      ...configs,
    });

    this.layer.add(arrowNode);
    this.onUpdateObjects();
  };

  addTriangle = (configs: Omit<Konva.RegularPolygonConfig, 'sides'> = {}) => {
    const arrowNode = new Konva.RegularPolygon({
      x: 80,
      y: 120,
      sides: 3,
      radius: 50,
      fill: 'white',
      stroke: 'black',
      strokeWidth: 1,
      name: 'triangle',
      draggable: true,
      ...configs,
    });

    this.layer.add(arrowNode);
    this.onUpdateObjects();
  };

  addTemplate = (templateName: string) => {
    const image = new Image();
    image.onload = () => {
      this.removeAllObjects();
      this.addImage(image, true);
    };
    image.src = templateName;
  };

  removeObject = () => {
    if (!this.currentObject.hasChildren()) {
      this.handleDeleteObject(this.currentObject);
      this.currentObject.destroy();
      this.currentObject.visible(false);
      this.transfomer.nodes([]);
    }
    this.onUpdateObjects();
  };

  removeAllObjects = () => {
    const objects = this.getObjects();
    objects.forEach((obj) => {
      if (!obj.hasChildren()) {
        obj.destroy();
        obj.visible(false);
      }
    });

    this.transfomer.nodes([]);
    this.onUpdateObjects();
  };

  resizeCanvase = (size: { width: number; height: number }) => {
    const stage = this.getStage();
    stage.width(size.width);
    stage.height(size.height);
    stage.scale({ x: 1, y: 1 });
    this.setSize(size);
  };

  zoomIn = () => {
    const stage = this.getStage();
    const oldScaleX = stage.scaleX();
    const oldScaleY = stage.scaleY();

    stage.width(stage.width() * 2);
    stage.height(stage.height() * 2);
    stage.scale({ x: oldScaleX * 2, y: oldScaleY * 2 });
    this.zoomLevel += 1;
  };

  zoomOut = () => {
    const stage = this.getStage();
    const oldScaleX = stage.scaleX();
    const oldScaleY = stage.scaleY();

    stage.width(stage.width() / 2);
    stage.height(stage.height() / 2);
    stage.scale({ x: oldScaleX / 2, y: oldScaleY / 2 });
    this.zoomLevel -= 1;
  };

  zoomReset = () => {
    const stage = this.getStage();
    const originSize = this.size;
    stage.width(originSize.width);
    stage.height(originSize.height);
    stage.scale({ x: 1, y: 1 });
    this.zoomLevel = 1;
  };

  onChangeIndex = (index: number) => {
    if (this.currentObject) {
      this.currentObject.setZIndex(index);
    }
  };

  moveToForwardObject = () => {
    if (this.currentObject) {
      this.currentObject.moveUp();
      this.onUpdateObjects();
    }
  };

  moveToBackwardObject = () => {
    if (this.currentObject) {
      this.currentObject.moveDown();
      this.onUpdateObjects();
    }
  };

  moveToTopObject = () => {
    if (this.currentObject) {
      this.currentObject.moveToTop();
      this.onUpdateObjects();
    }
  };

  moveToBottomObject = () => {
    if (this.currentObject) {
      this.currentObject.moveToBottom();
      this.onUpdateObjects();
    }
  };

  setSize = (size: { width: number; height: number }) => {
    this.size = size;
  };

  exportImage = () => {
    const imageUrl = this.layer.toDataURL({
      mimeType: 'png',
      x: 0,
      y: 0,
      width: 300,
      height: 300,
    });
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = new Date().getTime().toString();
    link.click();
  };

  selectCurrentObjectById = (id: number): CurrentObject | undefined => {
    const targetObject = this.getObjects().find((obj) => obj._id === id);

    if (targetObject) {
      this.currentObject = targetObject as CurrentObject;
      this.transfomer.nodes([targetObject]);
    }
    return targetObject as CurrentObject | undefined;
  };

  onUpdateObjects = () => {
    if (this.handleUpdateObjects) {
      this.transfomer.moveToTop();
      const objects = this.getObjects();
      this.handleUpdateObjects(objects);
    }
  };
}

export default KonvaController;
