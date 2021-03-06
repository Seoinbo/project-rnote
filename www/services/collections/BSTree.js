System.register(["./util", "./Queue"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var util, Queue_1;
    var BSTree;
    return {
        setters:[
            function (util_1) {
                util = util_1;
            },
            function (Queue_1_1) {
                Queue_1 = Queue_1_1;
            }],
        execute: function() {
            BSTree = (function () {
                /**
                 * Creates an empty binary search tree.
                 * @class <p>A binary search tree is a binary tree in which each
                 * internal node stores an element such that the elements stored in the
                 * left subtree are less than it and the elements
                 * stored in the right subtree are greater.</p>
                 * <p>Formally, a binary search tree is a node-based binary tree data structure which
                 * has the following properties:</p>
                 * <ul>
                 * <li>The left subtree of a node contains only nodes with elements less
                 * than the node's element</li>
                 * <li>The right subtree of a node contains only nodes with elements greater
                 * than the node's element</li>
                 * <li>Both the left and right subtrees must also be binary search trees.</li>
                 * </ul>
                 * <p>If the inserted elements are custom objects a compare function must
                 * be provided at construction time, otherwise the <=, === and >= operators are
                 * used to compare elements. Example:</p>
                 * <pre>
                 * function compare(a, b) {
                 *  if (a is less than b by some ordering criterion) {
                 *     return -1;
                 *  } if (a is greater than b by the ordering criterion) {
                 *     return 1;
                 *  }
                 *  // a must be equal to b
                 *  return 0;
                 * }
                 * </pre>
                 * @constructor
                 * @param {function(Object,Object):number=} compareFunction optional
                 * function used to compare two elements. Must return a negative integer,
                 * zero, or a positive integer as the first argument is less than, equal to,
                 * or greater than the second.
                 */
                function BSTree(compareFunction) {
                    this.root = null;
                    this.compare = compareFunction || util.defaultCompare;
                    this.nElements = 0;
                }
                /**
                 * Adds the specified element to this tree if it is not already present.
                 * @param {Object} element the element to insert.
                 * @return {boolean} true if this tree did not already contain the specified element.
                 */
                BSTree.prototype.add = function (element) {
                    if (util.isUndefined(element)) {
                        return false;
                    }
                    if (this.insertNode(this.createNode(element)) !== null) {
                        this.nElements++;
                        return true;
                    }
                    return false;
                };
                /**
                 * Removes all of the elements from this tree.
                 */
                BSTree.prototype.clear = function () {
                    this.root = null;
                    this.nElements = 0;
                };
                /**
                 * Returns true if this tree contains no elements.
                 * @return {boolean} true if this tree contains no elements.
                 */
                BSTree.prototype.isEmpty = function () {
                    return this.nElements === 0;
                };
                /**
                 * Returns the number of elements in this tree.
                 * @return {number} the number of elements in this tree.
                 */
                BSTree.prototype.size = function () {
                    return this.nElements;
                };
                /**
                 * Returns true if this tree contains the specified element.
                 * @param {Object} element element to search for.
                 * @return {boolean} true if this tree contains the specified element,
                 * false otherwise.
                 */
                BSTree.prototype.contains = function (element) {
                    if (util.isUndefined(element)) {
                        return false;
                    }
                    return this.searchNode(this.root, element) !== null;
                };
                /**
                 * Removes the specified element from this tree if it is present.
                 * @return {boolean} true if this tree contained the specified element.
                 */
                BSTree.prototype.remove = function (element) {
                    var node = this.searchNode(this.root, element);
                    if (node === null) {
                        return false;
                    }
                    this.removeNode(node);
                    this.nElements--;
                    return true;
                };
                /**
                 * Executes the provided function once for each element present in this tree in
                 * in-order.
                 * @param {function(Object):*} callback function to execute, it is invoked with one
                 * argument: the element value, to break the iteration you can optionally return false.
                 */
                BSTree.prototype.inorderTraversal = function (callback) {
                    this.inorderTraversalAux(this.root, callback, {
                        stop: false
                    });
                };
                /**
                 * Executes the provided function once for each element present in this tree in pre-order.
                 * @param {function(Object):*} callback function to execute, it is invoked with one
                 * argument: the element value, to break the iteration you can optionally return false.
                 */
                BSTree.prototype.preorderTraversal = function (callback) {
                    this.preorderTraversalAux(this.root, callback, {
                        stop: false
                    });
                };
                /**
                 * Executes the provided function once for each element present in this tree in post-order.
                 * @param {function(Object):*} callback function to execute, it is invoked with one
                 * argument: the element value, to break the iteration you can optionally return false.
                 */
                BSTree.prototype.postorderTraversal = function (callback) {
                    this.postorderTraversalAux(this.root, callback, {
                        stop: false
                    });
                };
                /**
                 * Executes the provided function once for each element present in this tree in
                 * level-order.
                 * @param {function(Object):*} callback function to execute, it is invoked with one
                 * argument: the element value, to break the iteration you can optionally return false.
                 */
                BSTree.prototype.levelTraversal = function (callback) {
                    this.levelTraversalAux(this.root, callback);
                };
                /**
                 * Returns the minimum element of this tree.
                 * @return {*} the minimum element of this tree or undefined if this tree is
                 * is empty.
                 */
                BSTree.prototype.minimum = function () {
                    if (this.isEmpty()) {
                        return undefined;
                    }
                    return this.minimumAux(this.root).element;
                };
                /**
                 * Returns the maximum element of this tree.
                 * @return {*} the maximum element of this tree or undefined if this tree is
                 * is empty.
                 */
                BSTree.prototype.maximum = function () {
                    if (this.isEmpty()) {
                        return undefined;
                    }
                    return this.maximumAux(this.root).element;
                };
                /**
                 * Executes the provided function once for each element present in this tree in inorder.
                 * Equivalent to inorderTraversal.
                 * @param {function(Object):*} callback function to execute, it is
                 * invoked with one argument: the element value, to break the iteration you can
                 * optionally return false.
                 */
                BSTree.prototype.forEach = function (callback) {
                    this.inorderTraversal(callback);
                };
                /**
                 * Returns an array containing all of the elements in this tree in in-order.
                 * @return {Array} an array containing all of the elements in this tree in in-order.
                 */
                BSTree.prototype.toArray = function () {
                    var array = [];
                    this.inorderTraversal(function (element) {
                        array.push(element);
                        return true;
                    });
                    return array;
                };
                /**
                 * Returns the height of this tree.
                 * @return {number} the height of this tree or -1 if is empty.
                 */
                BSTree.prototype.height = function () {
                    return this.heightAux(this.root);
                };
                /**
                * @private
                */
                BSTree.prototype.searchNode = function (node, element) {
                    var cmp = null;
                    while (node !== null && cmp !== 0) {
                        cmp = this.compare(element, node.element);
                        if (cmp < 0) {
                            node = node.leftCh;
                        }
                        else if (cmp > 0) {
                            node = node.rightCh;
                        }
                    }
                    return node;
                };
                /**
                * @private
                */
                BSTree.prototype.transplant = function (n1, n2) {
                    if (n1.parent === null) {
                        this.root = n2;
                    }
                    else if (n1 === n1.parent.leftCh) {
                        n1.parent.leftCh = n2;
                    }
                    else {
                        n1.parent.rightCh = n2;
                    }
                    if (n2 !== null) {
                        n2.parent = n1.parent;
                    }
                };
                /**
                * @private
                */
                BSTree.prototype.removeNode = function (node) {
                    if (node.leftCh === null) {
                        this.transplant(node, node.rightCh);
                    }
                    else if (node.rightCh === null) {
                        this.transplant(node, node.leftCh);
                    }
                    else {
                        var y = this.minimumAux(node.rightCh);
                        if (y.parent !== node) {
                            this.transplant(y, y.rightCh);
                            y.rightCh = node.rightCh;
                            y.rightCh.parent = y;
                        }
                        this.transplant(node, y);
                        y.leftCh = node.leftCh;
                        y.leftCh.parent = y;
                    }
                };
                /**
                * @private
                */
                BSTree.prototype.inorderTraversalAux = function (node, callback, signal) {
                    if (node === null || signal.stop) {
                        return;
                    }
                    this.inorderTraversalAux(node.leftCh, callback, signal);
                    if (signal.stop) {
                        return;
                    }
                    signal.stop = callback(node.element) === false;
                    if (signal.stop) {
                        return;
                    }
                    this.inorderTraversalAux(node.rightCh, callback, signal);
                };
                /**
                * @private
                */
                BSTree.prototype.levelTraversalAux = function (node, callback) {
                    var queue = new Queue_1.default();
                    if (node !== null) {
                        queue.enqueue(node);
                    }
                    while (!queue.isEmpty()) {
                        node = queue.dequeue();
                        if (callback(node.element) === false) {
                            return;
                        }
                        if (node.leftCh !== null) {
                            queue.enqueue(node.leftCh);
                        }
                        if (node.rightCh !== null) {
                            queue.enqueue(node.rightCh);
                        }
                    }
                };
                /**
                * @private
                */
                BSTree.prototype.preorderTraversalAux = function (node, callback, signal) {
                    if (node === null || signal.stop) {
                        return;
                    }
                    signal.stop = callback(node.element) === false;
                    if (signal.stop) {
                        return;
                    }
                    this.preorderTraversalAux(node.leftCh, callback, signal);
                    if (signal.stop) {
                        return;
                    }
                    this.preorderTraversalAux(node.rightCh, callback, signal);
                };
                /**
                * @private
                */
                BSTree.prototype.postorderTraversalAux = function (node, callback, signal) {
                    if (node === null || signal.stop) {
                        return;
                    }
                    this.postorderTraversalAux(node.leftCh, callback, signal);
                    if (signal.stop) {
                        return;
                    }
                    this.postorderTraversalAux(node.rightCh, callback, signal);
                    if (signal.stop) {
                        return;
                    }
                    signal.stop = callback(node.element) === false;
                };
                /**
                * @private
                */
                BSTree.prototype.minimumAux = function (node) {
                    while (node.leftCh !== null) {
                        node = node.leftCh;
                    }
                    return node;
                };
                /**
                * @private
                */
                BSTree.prototype.maximumAux = function (node) {
                    while (node.rightCh !== null) {
                        node = node.rightCh;
                    }
                    return node;
                };
                /**
                  * @private
                  */
                BSTree.prototype.heightAux = function (node) {
                    if (node === null) {
                        return -1;
                    }
                    return Math.max(this.heightAux(node.leftCh), this.heightAux(node.rightCh)) + 1;
                };
                /*
                * @private
                */
                BSTree.prototype.insertNode = function (node) {
                    var parent = null;
                    var position = this.root;
                    var cmp = null;
                    while (position !== null) {
                        cmp = this.compare(node.element, position.element);
                        if (cmp === 0) {
                            return null;
                        }
                        else if (cmp < 0) {
                            parent = position;
                            position = position.leftCh;
                        }
                        else {
                            parent = position;
                            position = position.rightCh;
                        }
                    }
                    node.parent = parent;
                    if (parent === null) {
                        // tree is empty
                        this.root = node;
                    }
                    else if (this.compare(node.element, parent.element) < 0) {
                        parent.leftCh = node;
                    }
                    else {
                        parent.rightCh = node;
                    }
                    return node;
                };
                /**
                * @private
                */
                BSTree.prototype.createNode = function (element) {
                    return {
                        element: element,
                        leftCh: null,
                        rightCh: null,
                        parent: null
                    };
                };
                return BSTree;
            }());
            exports_1("default", BSTree);
        }
    }
});
