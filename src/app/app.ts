import {Component, inject} from '@angular/core';
import {TreeNodeStore} from './app.store';
import {MyNodeTree} from './components/my-node-tree/my-node-tree';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    MyNodeTree
  ],
  styleUrl: './app.scss'
})
export class App {
  treeNodeStore = inject(TreeNodeStore);

  selectedNode = this.treeNodeStore.selectedNode;

}
