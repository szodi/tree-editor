import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {TreeNodeDto} from '@ptc-api-models/treeNodeDto';

type TreeNodeState = {
  rootNode: TreeNodeDto | null;
  selectedNode: TreeNodeDto | null;
}

// const initialState: TreeNodeState = {
//   rootNode: {
//     id: 1,
//     name: 'root',
//     content: 'Root node',
//     children: []
//   },
//   selectedNode: null
// }

// const initialState: TreeNodeState = {
//   rootNode: {
//     id: 1,
//     name: 'root',
//     content: 'Root node',
//     children: [{
//       id: 2,
//       name: 'child1',
//       content: 'Child 1 node',
//       parentId: 1,
//       children: []
//     }, {
//       id: 3,
//       name: 'child2',
//       content: 'Child 2 node',
//       parentId: 1,
//       children: []
//     }]
//   },
//   selectedNode: null
// }

const initialState: TreeNodeState = {
  rootNode: {
    id: 1,
    name: 'root',
    content: 'Root node',
    children: [{
      id: 2,
      name: 'child1',
      content: 'Child 1 node',
      parentId: 1,
      children: [{
        id: 4,
        name: 'grandchild1',
        content: 'Grandchild 1 node',
        parentId: 2,
        children: []
      }, {
        id: 5,
        name: 'grandchild2',
        content: 'Grandchild 2 node',
        parentId: 2,
        children: []
      }]
    }, {
      id: 3,
      name: 'child2',
      content: 'Child 2 node',
      parentId: 1,
      children: [{
        id: 6,
        name: 'grandchild3',
        content: 'Grandchild 3 node',
        parentId: 3,
        children: []
      }, {
        id: 7,
        name: 'grandchild4',
        content: 'Grandchild 4 node',
        parentId: 3,
        children: []
      }]
    }]
  },
  selectedNode: null
}

export const TreeNodeStore = signalStore(
  { providedIn: 'root'},
  withState(initialState),
  withMethods(store => ({
    setTreeNode(rootNode: TreeNodeDto) {
      patchState(store, { rootNode })
    },
    setSelectedNode(treeNode: TreeNodeDto) {
      patchState(store, { selectedNode: treeNode })
    }
  }))
);
