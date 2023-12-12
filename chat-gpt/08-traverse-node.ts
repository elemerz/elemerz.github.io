interface TreeNode {
  id: number;
  label: string;
  icon: string;
  expanded: boolean;
  selected?: boolean;
  children: TreeNode[];
}

function traverse(
  treeModel: TreeNode,
  specialNodeIds: number[],
  specialNodeProcessor: (node: TreeNode) => void,
  otherNodeProcessor: (node: TreeNode) => void
): void {
  // Helper function to process each node
  function processNode(node: TreeNode): void {
    if (specialNodeIds.includes(node.id)) {
      specialNodeProcessor(node);
    } else {
      otherNodeProcessor(node);
    }

    // If the node has children, traverse them as well
    if (node.children && node.children.length > 0) {
      node.children.forEach(processNode);
    }
  }

  // Start processing from the root node
  processNode(treeModel);
}
