import {Component, computed, ElementRef, HostListener, inject, OnInit, viewChildren} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BoxComponent} from './components/box/box';
import {TreeNodeStore} from './app.store';
import {TreeNodeDto} from '@ptc-api-models/treeNodeDto';

interface Box {
  treeNode: TreeNodeDto;
  bounds: DOMRect;
  isOverlapped?: boolean;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule, BoxComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  boxElements = viewChildren('boxEl', { read: ElementRef });

  boxes: Box[] = [];

  draggingBox: Box | null = null;
  offsetX = 0;
  offsetY = 0;

  treeNodeStore = inject(TreeNodeStore)

  levels = [];

  nodes = computed(() => {
    let result: TreeNodeDto[] = [];
    this.getAllNodes(this.treeNodeStore.treeNode() ?? {}, result);
    return result;
  });

  private getAllNodes(node: TreeNodeDto, result: TreeNodeDto[] = []) {
    result.push(node);
    node.children?.forEach(child => this.getAllNodes(child, result));
  }

  ngOnInit() {
    const boxWidth = 120;
    const boxHeight = 80;
    this.nodes().forEach((node, index) => this.boxes.push({
      treeNode: node,
      bounds: {
        x: index * boxWidth + 20,
        y: 50,
        left: index * boxWidth + 20,
        top: 50,
        right: 0,
        bottom: 0,
        width: boxWidth,
        height: boxHeight,
        toJSON(): any {}
      }
    }));
  }

  addBox() {
    console.log(this.nodes())
    const boxWidth = 120;
    const boxHeight = 80;
    this.boxes.push({
      treeNode: {
        id: this.nodes().length + 1,
        name: 'new',
        content: 'New node',
        children: []
      },
      bounds: {
        x: (this.nodes().length + 1) * boxWidth + 20,
        y: 50,
        left: (this.nodes().length + 1) * boxWidth + 20,
        top: 50,
        right: 0,
        bottom: 0,
        width: boxWidth,
        height: boxHeight,
        toJSON(): any {}
      }
    });
  }

  startDrag(event: MouseEvent, box: Box) {
    const element = event.target as HTMLElement;
    console.log(element.getBoundingClientRect());
    this.draggingBox = box;
    this.offsetX = event.clientX - box.bounds.x;
    this.offsetY = event.clientY - box.bounds.y;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.draggingBox) return;

    this.draggingBox.bounds.x = event.clientX - this.offsetX;
    this.draggingBox.bounds.y = event.clientY - this.offsetY;

    this.detectOverlaps();
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.draggingBox = null;
    this.boxes.forEach(b => b.isOverlapped = false);
    this.boxElements().forEach(el => console.log(el, el.nativeElement?.getBoundingClientRect()));
  }


  detectOverlaps() {
    if (!this.draggingBox) return;

    const a = this.draggingBox;
    const aw = 120;
    const ah = 80;

    this.boxes.forEach(b => {
      if (b === a) {
        b.isOverlapped = false;
        return;
      }

      const bw = 120;
      const bh = 80;

      b.isOverlapped = !(
        a.bounds.x + aw < b.bounds.x ||
        a.bounds.x > b.bounds.x + bw ||
        a.bounds.y + ah < b.bounds.y ||
        a.bounds.y > b.bounds.y + bh
      );
    });
  }
}
