import * as fs from 'fs';
import * as path from 'path';
import * as readlineSync from 'readline-sync';

class Node {
    public value: Number;
    public left: Node;
    public right: Node;

    public constructor(value = null, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class SortedSet {
    private root = null;

    public isEmpty() {
        return this.root === null ? true : false;
    }

    public add(value) {
        let node = new Node(value);
        this.addNode(node, value);
    }

    public remove(value) {
        this.removeNode(this.root, value);
    }

    public contains(value) {
        var current = this.root;
        while (current) {
            if (value === current.value) {
                return true;
            }
            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
    }

    public addNode(node, value) {
        if (!this.root) {
            this.root = node;
        } else {
            let current = this.root;
            while (current) {
                if (node.value < current.value) {
                    if (!current.left) {
                        current.left = node;
                        break;
                    }
                    current = current.left;
                } else if (node.value > current.value) {
                    if (!current.right) {
                        current.right = node;
                        break;
                    }
                    current = current.right;
                } else {
                    break;
                }
            }
        }
    }

    private removeNode(node, value) {
        if (!node) {
            return null;
        }
        if (value === node.value) {
            if (!node.left && !node.right) {
                return null;
            }
            if (!node.left) {
                return node.right;
            }
            if (!node.right) {
                return node.left;
            }
            var temp = this.getMin(node.right);
            node.value = temp;
            node.right = this.removeNode(node.right, temp);
            return node;
        } else if (value < node.value) {
            node.left = this.removeNode(node.left, value);
            return node;
        } else {
            node.right = this.removeNode(node.right, value);
            return node;
        }
    }

    private getMin(node) {
        if (!node) {
            node = this.root;
        }
        while (node.left) {
            node = node.left;
        }
        return node.value;
    }

    public print() {
        console.log(this.root);
    }
}

function insertValue(fileInput, sortedSet) {
    let i = 0;
    while (i < fileInput.length) {
        let char = fileInput[i];
        if (!/ ,/g.test(char) && /[0-9]/g.test(char)) {
            let numVal = 0;
            while (i < fileInput.length) {
                let num = fileInput[i].charCodeAt(0) - 48;
                if (num >= 0 && num <= 9) {
                    numVal = numVal * 10 + num;
                    i++;
                } else {
                    i--; 
                    break;
                }
            }
            sortedSet.add(numVal);
        }
        i++;
    }    
}

function SortedSetLab() {
    let fileInput = fs.readFileSync(path.join(__dirname, 'infile.dat'), 'utf8');
    let sortedSet = new SortedSet();
    insertValue(fileInput, sortedSet);
    
    let userInput = readlineSync.questionInt('Please enter a value : ');
    if (sortedSet.contains(userInput)) {
        console.log('Yes');
    } else {
        console.log('No');
    }
}

SortedSetLab();