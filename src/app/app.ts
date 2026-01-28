import {Component, inject, OnInit} from '@angular/core';
import {TreeNodeStore} from './app.store';
import {MyNodeTree} from './components/my-node-tree/my-node-tree';
import {TreeNodeControllerService} from '@ptc-api-services/treeNodeController.service';
import {switchMap} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    MyNodeTree
  ],
  styleUrl: './app.scss'
})
export class App implements OnInit {
  treeNodeStore = inject(TreeNodeStore);
  treeNodeService = inject(TreeNodeControllerService);

  selectedNode = this.treeNodeStore.selectedNode;

  ngOnInit() {
    this.treeNodeService.getRootTreeNode().pipe(
      switchMap(rootNode => this.treeNodeService.getTreeNode(rootNode.id!))
    ).subscribe(rootNode => this.treeNodeStore.setTreeNode(rootNode));
  }
}
