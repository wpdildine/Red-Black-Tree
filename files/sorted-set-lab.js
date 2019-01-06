"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var readlineSync = require("readline-sync");
var Node = /** @class */ (function () {
    function Node(value, left, right) {
        if (value === void 0) { value = null; }
        if (left === void 0) { left = null; }
        if (right === void 0) { right = null; }
        this.value = value;
        this.left = left;
        this.right = right;
    }
    return Node;
}());
var SortedSet = /** @class */ (function () {
    function SortedSet() {
        this.root = null;
    }
    SortedSet.prototype.isEmpty = function () {
        return this.root === null ? true : false;
    };
    SortedSet.prototype.add = function (value) {
        var node = new Node(value);
        this.addNode(node, value);
    };
    SortedSet.prototype.remove = function (value) {
        this.removeNode(this.root, value);
    };
    SortedSet.prototype.contains = function (value) {
        var current = this.root;
        while (current) {
            if (value === current.value) {
                return true;
            }
            if (value < current.value) {
                current = current.left;
            }
            else {
                current = current.right;
            }
        }
        return false;
    };
    SortedSet.prototype.addNode = function (node, value) {
        if (!this.root) {
            this.root = node;
        }
        else {
            var current = this.root;
            while (current) {
                if (node.value < current.value) {
                    if (!current.left) {
                        current.left = node;
                        break;
                    }
                    current = current.left;
                }
                else if (node.value > current.value) {
                    if (!current.right) {
                        current.right = node;
                        break;
                    }
                    current = current.right;
                }
                else {
                    break;
                }
            }
        }
    };
    SortedSet.prototype.removeNode = function (node, value) {
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
        }
        else if (value < node.value) {
            node.left = this.removeNode(node.left, value);
            return node;
        }
        else {
            node.right = this.removeNode(node.right, value);
            return node;
        }
    };
    SortedSet.prototype.getMin = function (node) {
        if (!node) {
            node = this.root;
        }
        while (node.left) {
            node = node.left;
        }
        return node.value;
    };
    SortedSet.prototype.print = function () {
        console.log(this.root);
    };
    return SortedSet;
}());
function insertValue(fileInput, sortedSet) {
    var i = 0;
    while (i < fileInput.length) {
        var char = fileInput[i];
        if (!/ ,/g.test(char) && /[0-9]/g.test(char)) {
            var numVal = 0;
            while (i < fileInput.length) {
                var num = fileInput[i].charCodeAt(0) - 48;
                if (num >= 0 && num <= 9) {
                    numVal = numVal * 10 + num;
                    i++;
                }
                else {
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
    var fileInput = fs.readFileSync(path.join(__dirname, 'infile.dat'), 'utf8');
    var sortedSet = new SortedSet();
    insertValue(fileInput, sortedSet);
    var userInput = readlineSync.questionInt('Please enter a value : ');
    if (sortedSet.contains(userInput)) {
        console.log('Yes');
    }
    else {
        console.log('No');
    }
}
SortedSetLab();
//# sourceMappingURL=sorted-set-lab.js.map