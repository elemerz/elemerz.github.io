// tree-view.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent {
  @Input() treeModel: any;

  toggleNode(node: any): void {
    node.expanded = !node.expanded;
  }
}
