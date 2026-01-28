import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {TreeNodeDto} from '@ptc-api-models/treeNodeDto';

type TreeNodeState = {
  rootNode: TreeNodeDto | null;
  selectedNode: TreeNodeDto | null;
}

const initialState: TreeNodeState = {
  rootNode: null,
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
