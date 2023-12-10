import { Component, ViewChild } from '@angular/core';
import { TreeViewComponent } from './tree-view/tree-view.component';

@Component({
  selector: 'app-other-component',
  templateUrl: './other-component.component.html',
  styleUrls: ['./other-component.component.css']
})
export class OtherComponent {
  @ViewChild(TreeViewComponent) treeViewComponent!: TreeViewComponent;

  constructor() {}

  ngAfterViewInit() {
    // You can now access the TreeViewComponent instance and call the setter method
    this.treeViewComponent.treeModel = {
      // ... your new tree model data
    };
  }

  // If you need to update the treeModel at some other point in time
  updateTreeModel() {
    if (this.treeViewComponent) {
      this.treeViewComponent.treeModel = {
        // ... your updated tree model data
      };
    }
  }
}
