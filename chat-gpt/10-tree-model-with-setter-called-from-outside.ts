import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { TreeViewComponent } from './tree-view/tree-view.component';

@Component({
  selector: 'app-another-component',
  templateUrl: './another-component.component.html',
  styleUrls: ['./another-component.component.css']
})
export class AnotherComponent implements AfterViewInit {
  @ViewChild(TreeViewComponent) treeViewComponent: TreeViewComponent;

  ngAfterViewInit() {
    // Assuming you have a newTreeModel to set
    const newTreeModel = {/* ... */};
    this.treeViewComponent.treeModel = newTreeModel;
  }

  // ... (rest of your component code)
}
