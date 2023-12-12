import { Component, Input } from '@angular/core';

interface TreeNode {
  id: number;
  label: string;
  icon: string;
  expanded: boolean;
  selected?: boolean;
  children: TreeNode[];
}

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent {
  @Input() treeModel: TreeNode;

  toggleNode(node: TreeNode): void {
    node.expanded = !node.expanded;
  }

  traverse(
    specialNodeIds: number[],
    specialNodeProcessor: (node: TreeNode) => void,
    otherNodeProcessor: (node: TreeNode) => void
  ): void {
    const processNode = (node: TreeNode): void => {
      if (specialNodeIds.includes(node.id)) {
        specialNodeProcessor(node);
      } else {
        otherNodeProcessor(node);
      }

      if (node.children && node.children.length > 0) {
        node.children.forEach(processNode);
      }
    };

    processNode(this.treeModel);
  }
}
