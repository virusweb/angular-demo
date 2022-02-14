import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fabric } from "fabric";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-fabric-example',
  templateUrl: './fabric-example.component.html',
  styleUrls: ['./fabric-example.component.css']
})
export class FabricExampleComponent implements OnInit {

  canvas: any;
  shapeform: FormGroup;
  brigthness: number = 0;
  modalRef: BsModalRef;
  shapes: string[];
  submitted = false;
  selectedObj: any;
  selectedObjShape: any;
  isSelectAll: boolean;
  error: boolean;

  constructor(private modalService: BsModalService, private fb: FormBuilder) { }

  ngOnInit() {

    this.shapeform = this.fb.group({
      shapes: ['', Validators.required]
    });

    this.shapes = ['circle', 'rectangle', 'triangle'];
    this.canvas = new fabric.Canvas('canvas');
    this.canvas.hoverCursor = 'pointer';
    this.canvas.on({ 'selection:created': this.ObjectModification });
    this.canvas.on({ 'selection:updated': this.ObjectModification });
  }

  makeGroup(): void {
    if (!this.canvas.getActiveObject()) {
      return;
    }
    if (this.canvas.getActiveObject().type !== 'activeSelection') {
      return;
    }
    this.canvas.getActiveObject().toGroup();
    this.canvas.requestRenderAll();
  }

  doUngroup(): void {
    if (!this.canvas.getActiveObject()) {
      return;
    }
    if (this.canvas.getActiveObject().type !== 'group') {
      return;
    }
    this.canvas.getActiveObject().toActiveSelection();
    this.canvas.requestRenderAll();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  submitForm() {
    this.submitted = true;
    if (this.shapeform.invalid) { return; }
    else {
      this.addShape(this.shapeform.value.shapes.toLowerCase());
      this.modalRef.hide();
    }
  }

  addShape(shape): void {
    switch (shape) {
      case 'circle':
        this.canvas.add(new fabric.Circle({ radius: 50, fill: 'green' }))
        break;
      case 'rectangle':
        this.canvas.add(new fabric.Rect({ width: 50, height: 50, fill: '#f55' }))
        break;
      case 'triangle':
        this.canvas.add(new fabric.Triangle({ width: 50, height: 100, fill: 'blue' }))
        break;
      default:
        break;
    }
  }

  ObjectModification(obj): void {
    this.selectedObjShape = obj.target.get('type');
    this.selectedObj = obj;
  }

  changeColor(e): void {
    this.selectedObj = this.canvas.getActiveObject();
    if (this.selectedObj) {
      this.error = false;
      this.canvas.getActiveObject().set("fill", e.target.value);
      this.canvas.renderAll();
    } else {
      this.error = true;
    }
  }

  changeHeight(increment: boolean): void {
    this.selectedObj = this.canvas.getActiveObject();
    let height = parseInt(this.canvas.getActiveObject().get('height'));
    height = (increment) ? height + 10 : height - 10;
    this.canvas.getActiveObject().set("height", height);
    this.canvas.renderAll();
  }

  changeWidth(increment: boolean): void {
    this.selectedObj = this.canvas.getActiveObject();
    let width = this.selectedObj.get('width');
    width = (increment) ? width + 10 : width - 10;
    this.canvas.getActiveObject().set("width", width);
    this.canvas.renderAll();
  }

  selectAll(): void {
    this.canvas.discardActiveObject();
    var sel = new fabric.ActiveSelection(this.canvas.getObjects(), {
      canvas: this.canvas,
    });
    this.canvas.setActiveObject(sel);
    this.canvas.requestRenderAll();
  }

  group(): void {
    if (!this.canvas.getActiveObject()) {
      return;
    }
    if (this.canvas.getActiveObject().type !== 'activeSelection') {
      return;
    }
    this.canvas.getActiveObject().toGroup();
    this.canvas.requestRenderAll();
  }

  ungroup(): void {
    if (!this.canvas.getActiveObject()) {
      return;
    }
    if (this.canvas.getActiveObject().type !== 'group') {
      return;
    }
    this.canvas.getActiveObject().toActiveSelection();
    this.canvas.requestRenderAll();
  }

  remove(): void {
    this.canvas.remove(this.canvas.getActiveObject());
  }

  addText(): void {
    this.canvas.add(new fabric.IText('This is simple', {
      left: 100,
      top: 150,
      fill: '#D81B60',
    }));
  }

  backword(): void {
    this.canvas.sendToBack(this.canvas.getActiveObject());
    this.canvas.renderAll();
  }

  forward(): void {
    this.canvas.bringToFront(this.canvas.getActiveObject());
    this.canvas.renderAll();
  }
}

