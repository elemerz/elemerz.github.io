const treeModel={
    label:'TreeRoot', icon:'root.png', expanded: true,
    children: [
        {label:'Fruits', icon:'fruits.png', expanded: true, actionButtons:[{action:editLabel, tooltip:'Edit the label', iconClass:'edit-label'}],
            children:[
                {label:'Apple', icon:'apple.png', expanded: true,
                    children: [
                        {label:'Granny Smith', icon:'granny-smith.png', expanded: false, children:[]},
                        {label:'Red Delicious', icon:'red-delicious.png', expanded: false, children:[]},
                        {label:'Golden', icon:'golden.png', expanded: false, children:[]},
                        {label:'Pink Lady', icon:'pink-lady.png', expanded: false, children:[]}
                    ]
                },
                {label:'Pear', icon:'pear.png', expanded: true,
                    children: [
                        {label:'Williams', icon:'williams.png', expanded: false, children:[]},
                        {label:'Abate', icon:'abate.png', expanded: false, children:[]},
                        {label:'Concorde', icon:'concorde.png', expanded: false, children:[]},
                        {label:'Anjou', icon:'anjou.png', expanded: false, children:[]}
                    ]
                },
                {label:'Plum', icon:'plum.png', expanded: true,
                    children: [
                        {label:'Besztercei', icon:'besztercei.png', expanded: false, children:[]},
                        {label:'Fosóka', icon:'fosoka.png', expanded: false, children:[]},
                        {label:'Ruby Queen', icon:'ruby-queen.png', expanded: false, children:[]},
                        {label:'Damson', icon:'damson.png', expanded: false, children:[]}
                    ]
                }
            ]
        },
        {label:'Vegetables', icon:'vegetables.png', expanded: true,
            children:[
                {label:'Potato', icon:'potato.png', expanded: true,
                    children: [
                        {label:'Yukon Gold', icon:'yukon-gold.png', expanded: false, children:[]},
                        {label:'Purple Majesty', icon:'purple-majesty.png', expanded: false, children:[]},
                        {label:'King Edward', icon:'king-edward.png', expanded: false, children:[]},
                        {label:'Desiree', icon:'desiree', expanded: false, children:[]}
                    ]
                },
                {label:'Tomato', icon:'tomato.png', expanded: true,
                    children: [
                        {label:'Roma ', icon:'roma.png', expanded: false, children:[]},
                        {label:'Cherry', icon:'cherry.png', expanded: false, children:[]},
                        {label:'Sungold', icon:'sungold.png', expanded: false, children:[]},
                        {label:'Indigo Rose', icon:'indigo-rose.png', expanded: false, children:[]}
                    ]
                },
                {label:'Carrot', icon:'carrot.png', expanded: true,
                    children: [
                        {label:'Danvers', icon:'danvers.png', expanded: false, children:[]},
                        {label:'Imperator', icon:'imperator.png', expanded: false, children:[]},
                        {label:'Nelson', icon:'nelson.png', expanded: false, children:[]},
                        {label:'Flyaway', icon:'flyaway.png', expanded: false, children:[]}
                    ]
                }
            ]
        }
    ]
};

function createSubTree(node, parentElement) {
    const nodeElement = document.createElement('div');
    nodeElement.className = 'node';
    nodeElement.innerHTML = `<div class="node-elements"><span class=${node.children.length ? "expander" : ""}></span><span class="node-icon"></span><span class="node-label" tabindex="0">${node.label}</span><span class="node-buttons"></span></span></div>`;
    parentElement.appendChild(nodeElement);

    if (node.children && node.children.length > 0) {
        const childrenInner = document.createElement('div');
        childrenInner.className = 'children-inner';
        const childrenContainer = document.createElement('div');
        childrenContainer.className = 'children';
        childrenContainer.appendChild(childrenInner);
        nodeElement.appendChild(childrenContainer);


        node.children.forEach(child => createSubTree(child, childrenInner));
        nodeElement.classList.add(node.expanded ? 'expanded' : '');
        nodeElement.querySelector('.expander').addEventListener('click', function() {
            nodeElement.classList.toggle('expanded');
        });
        //assign action Buttons
        node.actionButtons && node.actionButtons.forEach(btn => createButton(btn, nodeElement.querySelector('.node-buttons')));
    }
}

function createButton(btn, parentNode) {
    if(!parentNode) {return;}
    console.log('createButton:', btn, parentNode);
    parentNode.appendChild(Object.assign(document.createElement("button"), {onclick: btn.action, title: btn.tooltip, className: "action-button " + btn.iconClass}))
}

function initTree() {
    const rootElement = document.getElementById('treeView');
    rootElement.innerHTML = ''; //make the method idempotent
    createSubTree(treeModel, rootElement);
}
function editLabel() {
    console.log('switch label to edit mode.');
}