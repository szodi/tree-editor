import {Component, ElementRef, input, viewChild, viewChildren} from '@angular/core';
import {TreeNodeDto} from '@ptc-api-models/treeNodeDto';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-my-node',
  imports: [
    NgStyle
  ],
  templateUrl: './my-node.html',
  styleUrl: './my-node.scss',
})
export class MyNode {

  treeNode = input.required<TreeNodeDto>();

  elementRef = viewChild('nodeRoot', { read: ElementRef });

  color = `rgba(${this.getRandomInt(255)}, ${this.getRandomInt(255)}, ${this.getRandomInt(255)}, 0.5)`;

  private getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  press(event: MouseEvent) {
    event.stopPropagation();
    const bounds = this.elementRef()?.nativeElement?.getBoundingClientRect();
    const element = this.elementRef()?.nativeElement as HTMLElement;
    element.style = `position: relative; left: 0; top: 0; width: ${bounds?.width}px; height: ${bounds?.height}px;`
    // element.style = `position: absolute; left: ${bounds?.left}px; top: ${bounds?.top}px;`
  }

  release(event: MouseEvent) {
    event.stopPropagation();
    const element = this.elementRef()?.nativeElement as HTMLElement;
    element.style = `position: static;`
  }
}
