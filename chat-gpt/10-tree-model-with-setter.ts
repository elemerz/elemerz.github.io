import { Component, Input } from '@angular/core';

interface TreeNode {
  // ... (TreeNode properties)
}

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent {
  private _treeModel: TreeNode;

  @Input()
  get treeModel(): TreeNode {
    return this._treeModel;
  }

  set treeModel(value: TreeNode) {
    this._treeModel = value;
    // You can add additional logic here if needed when the tree model is set
  }

  // ... (rest of your component code)
}
