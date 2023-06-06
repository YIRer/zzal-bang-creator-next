import Konva from 'konva';
import { Transformer } from 'konva/lib/shapes/Transformer';

export type CurrentObject =
  | Konva.Shape
  | Konva.Image
  | Konva.Text
  | Konva.Stage;

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
  private transfomer: Konva.Transformer;
  private handleSelectObject: (target?: CurrentObject) => void;

  constructor({
    id,
    onSelectObject,
  }: {
    id: string;
    onSelectObject: (target?: CurrentObject) => void;
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
  }
  initialize = () => {
    this.constianer.tabIndex = 1;
    this.constianer.addEventListener('keydown', (e) => {
      if (e.key === 'Delete') {
        this.removeObject();
      }
    });

    this.stage.on('click tab', (e) => {
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

  getCurrentObject = () => {
    return this.currentObject;
  };

  addRect = (configs: Konva.ShapeConfig = {}) => {
    const rectNode = new Konva.Rect({
      width: 50,
      height: 50,
      x: 0,
      y: 0,
      fill: 'green',
      strokeWidth: 1,
      stroke: 'grey',
      name: 'rect',
      draggable: true,
      ...configs,
    });

    this.layer.add(rectNode);
  };

  addCircle = (configs: Konva.ShapeConfig = {}) => {
    const circleNode = new Konva.Circle({
      width: 50,
      height: 50,
      x: 25,
      y: 25,
      fill: 'green',
      strokeWidth: 1,
      stroke: 'grey',
      name: 'circle',
      draggable: true,
      ...configs,
    });

    this.layer.add(circleNode);
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
  };

  removeObject = () => {
    if (!this.currentObject.hasChildren()) {
      this.currentObject.remove();
      this.currentObject.visible(false);
      this.transfomer.nodes([]);
      this.handleSelectObject();
    }
  };
}

export default KonvaController;
