import {Component, computed, ElementRef, HostListener, inject, viewChildren} from '@angular/core';
import {TreeNodeStore} from './app.store';
import {TreeNodeDto} from '@ptc-api-models/treeNodeDto';
import {MyNode} from './components/my-node/my-node';

interface Box {
  treeNode: TreeNodeDto;
  x: number;
  y: number;
  isOverlapped: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [MyNode],
  styleUrl: './app.scss'
})
export class App {
  treeNodeStore = inject(TreeNodeStore);

  selectedNode = this.treeNodeStore.selectedNode;

  draggingBox: Box | null = null;
  offsetX = 0;
  offsetY = 0;

  nodeWithPositionList = computed(() => {
    let result: Box[] = [];
    this.organizeNodesToLevels(this.treeNodeStore.rootNode() ?? {}, result, 0);
    return result;
  });

  boxElements = viewChildren(MyNode, { read: ElementRef });
  boxComponents = viewChildren(MyNode);

  selectNode(node: TreeNodeDto) {
    this.treeNodeStore.setSelectedNode(node);
  }

  private organizeNodesToLevels(node: TreeNodeDto, boxes: Box[], level: number) {
    boxes.push({
      treeNode: node,
      x: level * 50,
      y: boxes.length * 100,
      isOverlapped: false
    });
    node.children?.forEach(child => this.organizeNodesToLevels(child, boxes, level + 1));
  }


  startDrag(event: MouseEvent, box: Box) {
    this.selectNode(box.treeNode);
    this.draggingBox = box;
    this.offsetX = event.clientX - box.x;
    this.offsetY = event.clientY - box.y;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.draggingBox) return;

    this.draggingBox.x = event.clientX - this.offsetX;
    this.draggingBox.y = event.clientY - this.offsetY;

    this.detectOverlaps();
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.draggingBox = null;
    this.nodeWithPositionList().forEach(b => b.isOverlapped = false);
  }


  detectOverlaps() {
    if (!this.draggingBox) return;

    const a = this.draggingBox;

    const draggingBoxBounds = this.findNativeElementById(a.treeNode.id!).getBoundingClientRect();
    const aw = draggingBoxBounds.width;
    const ah = draggingBoxBounds.height;

    this.nodeWithPositionList().forEach(b => {
      if (b === a) {
        b.isOverlapped = false;
        return;
      }

      const boxBounds = this.findNativeElementById(b.treeNode.id!).getBoundingClientRect();
      const bw = boxBounds.width;
      const bh = boxBounds.height;

      b.isOverlapped = !(
        a.x + aw < b.x ||
        a.x > b.x + bw ||
        a.y + ah < b.y ||
        a.y > b.y + bh
      );
    });
  }

  private findNativeElementById(treeNodeId: number): HTMLElement {
    const componentIndex = this.boxComponents().findIndex(c => c.treeNode().id === treeNodeId);
    return this.boxElements()[componentIndex].nativeElement;
  }
}
