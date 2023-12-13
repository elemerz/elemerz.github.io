const treeModel = {
    id: 1,
    label: 'TreeRoot',
    icon: 'root.png',
    expanded: true,
    selected: true,
    highlighted: false,
    children: [
        {
            id: 2,
            label: 'Fruits',
            icon: 'fruits.png',
            expanded: true,
            selected: false,
            highlighted: true,
            actionButtons: [
                {
                    kind: 'action', /*action|label|error*/
                    show: true, /*true|false*/
                    action: editLabel, /*function pointer*/
                    tooltip: 'Edit the label',
                    iconClass: 'edit-label'
                }
            ],
            children: [
                {
                    id: 3,
                    label: 'Apple',
                    icon: 'apple.png',
                    expanded: true,
                    selected: false,
                    highlighted: false,
                    children: [
                        {
                            id: 4,
                            label: 'Granny Smith',
                            icon: 'granny-smith.png',
                            expanded: false,
                            selected: false,
                            highlighted: false,
                            children: [

                            ]
                        },
                        {
                            id: 5,
                            label: 'Red Delicious',
                            icon: 'red-delicious.png',
                            expanded: false,
                            selected: false,
                            highlighted: false,
                            children: [

                            ]
                        },
                        {
                            id: 6,
                            label: 'Golden',
                            icon: 'golden.png',
                            expanded: false,
                            selected: false,
                            highlighted: false,
                            children: [

                            ]
                        },
                        {
                            id: 7,
                            label: 'Pink Lady',
                            icon: 'pink-lady.png',
                            expanded: false,
                            selected: false,
                            highlighted: false,
                            children: [

                            ]
                        }
                    ]
                },
                {
                    id: 8,
                    label: 'Pear',
                    icon: 'pear.png',
                    expanded: true,
                    children: [
                        {
                            id: 9,
                            label: 'Williams',
                            icon: 'williams.png',
                            expanded: false,
                            selected: false,
                            highlighted: false,
                            children: [

                            ]
                        },
                        {
                            id: 10,
                            label: 'Abate',
                            icon: 'abate.png',
                            expanded: false,
                            selected: false,
                            highlighted: false,
                            children: [

                            ]
                        },
                        {
                            id: 11,
                            label: 'Concorde',
                            icon: 'concorde.png',
                            expanded: false,
                            selected: false,
                            highlighted: false,
                            children: [

                            ]
                        },
                        {
                            id: 12,
                            label: 'Anjou',
                            icon: 'anjou.png',
                            expanded: false,
                            selected: false,
                            highlighted: false,
                            children: [

                            ]
                        }
                    ]
                },
                {
                    id: 13,
                    label: 'Plum',
                    icon: 'plum.png',
                    expanded: true,
                    children: [
                        {
                            id: 14,
                            label: 'Besztercei',
                            icon: 'besztercei.png',
                            expanded: false,
                            selected: false,
                            highlighted: false,
                            children: [

                            ]
                        },
                        {
                            id: 15,
                            label: 'Fosóka',
                            icon: 'fosoka.png',
                            expanded: false,
                            selected: false,
                            highlighted: false,
                            children: [

                            ]
                        },
                        {
                            id: 16,
                            label: 'Ruby Queen',
                            icon: 'ruby-queen.png',
                            expanded: false,
                            selected: false,
                            highlighted: false,
                            children: [

                            ]
                        },
                        {
                            id: 17,
                            label: 'Damson',
                            icon: 'damson.png',
                            expanded: false,
                            selected: false,
                            highlighted: false,
                            children: [

                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 18,
            label: 'Vegetables',
            icon: 'vegetables.png',
            expanded: true,
            children: [
                {
                    id: 19,
                    label: 'Potato',
                    icon: 'potato.png',
                    expanded: true,
                    children: [
                        {
                            id: 20,
                            label: 'Yukon Gold',
                            icon: 'yukon-gold.png',
                            expanded: false,
                            selected: false,
                            highlighted: false,
                            children: [

                            ]
                        },
                        {
                            id: 21,
                            label: 'Purple Majesty',
                            icon: 'purple-majesty.png',
                            expanded: false,
                            selected: false,
                            highlighted: false,
                            children: [

                            ]
                        },
                        {
                            id: 22,
                            label: 'King Edward',
                            icon: 'king-edward.png',
                            expanded: false,
                            selected: false,
                            highlighted: false,
                            children: [

                            ]
                        },
                        {
                            id: 23,
                            label: 'Desiree',
                            icon: 'desiree',
                            expanded: false,
                            selected: false,
                            highlighted: false,
                            children: [

                            ]
                        }
                    ]
                },
                {
                    id: 24,
                    label: 'Tomato',
                    icon: 'tomato.png',
                    expanded: true,
                    children: [
                        {
                            id: 25,
                            label: 'Roma ',
                            icon: 'roma.png',
                            expanded: false,
                            selected: false,
                            highlighted: false,
                            children: [

                            ]
                        },
                        {
                            id: 26,
                            label: 'Cherry',
                            icon: 'cherry.png',
                            expanded: false,
                            selected: false,
                            highlighted: false,
                            children: [

                            ]
                        },
                        {
                            id: 27,
                            label: 'Sungold',
                            icon: 'sungold.png',
                            expanded: false,
                            selected: false,
                            highlighted: false,
                            children: [

                            ]
                        },
                        {
                            id: 28,
                            label: 'Indigo Rose',
                            icon: 'indigo-rose.png',
                            expanded: false,
                            selected: false,
                            highlighted: false,
                            children: [

                            ]
                        }
                    ]
                },
                {
                    id: 29,
                    label: 'Carrot',
                    icon: 'carrot.png',
                    expanded: true,
                    children: [
                        {
                            id: 30,
                            label: 'Danvers',
                            icon: 'danvers.png',
                            expanded: false,
                            selected: false,
                            highlighted: false,
                            children: [

                            ]
                        },
                        {
                            id: 31,
                            label: 'Imperator',
                            icon: 'imperator.png',
                            expanded: false,
                            selected: false,
                            highlighted: false,
                            children: [

                            ]
                        },
                        {
                            id: 32,
                            label: 'Nelson',
                            icon: 'nelson.png',
                            expanded: false,
                            selected: false,
                            highlighted: false,
                            children: [

                            ]
                        },
                        {
                            id: 33,
                            label: 'Flyaway',
                            icon: 'flyaway.png',
                            expanded: false,
                            selected: false,
                            highlighted: false,
                            children: [

                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

function createSubTree(node, parentElement) {
    const nodeElement = document.createElement('div');
    nodeElement.className = `node${node.selected ? ' selected' : ''}${node.highlighted ? ' highlighted' : ''}`;
    nodeElement['data-id'] = node.id;
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
    }
    //assign action Buttons
    node.actionButtons && node.actionButtons.forEach(btn => createButton(btn, nodeElement.querySelector('.node-buttons')));
}

function createButton(btnModel, parentNode) {
    if(!parentNode) {return;}
    console.log('createButton:', btnModel, parentNode);
    const btnElement = document.createElement("button");
    parentNode.appendChild(Object.assign(btnElement, {model: btnModel, onclick: btnModel.action, title: btnModel.tooltip, className: "action-button " + btnModel.iconClass}))
}

function initTree() {
    const rootElement = document.getElementById('treeView');
    rootElement.innerHTML = ''; //make the method idempotent
    createSubTree(treeModel, rootElement);
}

function editLabel(evt) {
    console.log('switch label to edit mode. evt:', evt.currentTarget, 'Model', evt.currentTarget.model);
    alert('switch label to edit mode.');
}
