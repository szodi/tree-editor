import { Component, Input, Output, EventEmitter } from '@angular/core';
import {NgClass, NgStyle} from '@angular/common';
import {TreeNodeDto} from '@ptc-api-models/treeNodeDto';
import {MyNode} from '../my-node/my-node';

@Component({
  selector: 'app-box',
  templateUrl: './box.html',
  styleUrl: './box.scss',
  imports: [NgClass, MyNode, NgStyle]
})
export class BoxComponent {
  @Input({ required: true }) treeNode: TreeNodeDto = {};
  @Input() selected = false;
  @Input() overlapped = false;

  color = `rgba(${this.getRandomInt(255)}, ${this.getRandomInt(255)}, ${this.getRandomInt(255)}, 0.5)`;

  private getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
}
