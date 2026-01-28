import {Component, ElementRef, input, viewChild} from '@angular/core';
import {TreeNodeDto} from '@ptc-api-models/treeNodeDto';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-my-node',
  imports: [
    NgClass
  ],
  templateUrl: './my-node.html',
  styleUrl: './my-node.scss',
})
export class MyNode {
  treeNode = input.required<TreeNodeDto>();
  isOverlapped = input<boolean>(false);

  card = viewChild<ElementRef>('card');

  getBounds() {
    return this.card()?.nativeElement.getBoundingClientRect();
  }
}
