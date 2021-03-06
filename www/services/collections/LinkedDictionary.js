System.register(["./Dictionary", "./util"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Dictionary_1, util;
    var LinkedDictionaryPair, LinkedDictionary;
    return {
        setters:[
            function (Dictionary_1_1) {
                Dictionary_1 = Dictionary_1_1;
            },
            function (util_1) {
                util = util_1;
            }],
        execute: function() {
            /**
             * This class is used by the LinkedDictionary Internally
             * Has to be a class, not an interface, because it needs to have
             * the 'unlink' function defined.
             */
            LinkedDictionaryPair = (function () {
                function LinkedDictionaryPair(key, value) {
                    this.key = key;
                    this.value = value;
                }
                LinkedDictionaryPair.prototype.unlink = function () {
                    this.prev.next = this.next;
                    this.next.prev = this.prev;
                };
                return LinkedDictionaryPair;
            }());
            LinkedDictionary = (function (_super) {
                __extends(LinkedDictionary, _super);
                function LinkedDictionary(toStrFunction) {
                    _super.call(this, toStrFunction);
                    this.head = new LinkedDictionaryPair(null, null);
                    this.tail = new LinkedDictionaryPair(null, null);
                    this.head.next = this.tail;
                    this.tail.prev = this.head;
                }
                /**
                 * Inserts the new node to the 'tail' of the list, updating the
                 * neighbors, and moving 'this.tail' (the End of List indicator) that
                 * to the end.
                 */
                LinkedDictionary.prototype.appendToTail = function (entry) {
                    var lastNode = this.tail.prev;
                    lastNode.next = entry;
                    entry.prev = lastNode;
                    entry.next = this.tail;
                    this.tail.prev = entry;
                };
                /**
                 * Retrieves a linked dictionary from the table internally
                 */
                LinkedDictionary.prototype.getLinkedDictionaryPair = function (key) {
                    if (util.isUndefined(key)) {
                        return undefined;
                    }
                    var k = '$' + this.toStr(key);
                    var pair = (this.table[k]);
                    return pair;
                };
                /**
                 * Returns the value to which this dictionary maps the specified key.
                 * Returns undefined if this dictionary contains no mapping for this key.
                 * @param {Object} key key whose associated value is to be returned.
                 * @return {*} the value to which this dictionary maps the specified key or
                 * undefined if the map contains no mapping for this key.
                 */
                LinkedDictionary.prototype.getValue = function (key) {
                    var pair = this.getLinkedDictionaryPair(key);
                    if (!util.isUndefined(pair)) {
                        return pair.value;
                    }
                    return undefined;
                };
                /**
                 * Removes the mapping for this key from this dictionary if it is present.
                 * Also, if a value is present for this key, the entry is removed from the
                 * insertion ordering.
                 * @param {Object} key key whose mapping is to be removed from the
                 * dictionary.
                 * @return {*} previous value associated with specified key, or undefined if
                 * there was no mapping for key.
                 */
                LinkedDictionary.prototype.remove = function (key) {
                    var pair = this.getLinkedDictionaryPair(key);
                    if (!util.isUndefined(pair)) {
                        _super.prototype.remove.call(this, key); // This will remove it from the table
                        pair.unlink(); // This will unlink it from the chain
                        return pair.value;
                    }
                    return undefined;
                };
                /**
                * Removes all mappings from this LinkedDictionary.
                * @this {collections.LinkedDictionary}
                */
                LinkedDictionary.prototype.clear = function () {
                    _super.prototype.clear.call(this);
                    this.head.next = this.tail;
                    this.tail.prev = this.head;
                };
                /**
                 * Internal function used when updating an existing KeyValue pair.
                 * It places the new value indexed by key into the table, but maintains
                 * its place in the linked ordering.
                 */
                LinkedDictionary.prototype.replace = function (oldPair, newPair) {
                    var k = '$' + this.toStr(newPair.key);
                    // set the new Pair's links to existingPair's links
                    newPair.next = oldPair.next;
                    newPair.prev = oldPair.prev;
                    // Delete Existing Pair from the table, unlink it from chain.
                    // As a result, the nElements gets decremented by this operation
                    this.remove(oldPair.key);
                    // Link new Pair in place of where oldPair was,
                    // by pointing the old pair's neighbors to it.
                    newPair.prev.next = newPair;
                    newPair.next.prev = newPair;
                    this.table[k] = newPair;
                    // To make up for the fact that the number of elements was decremented,
                    // We need to increase it by one.
                    ++this.nElements;
                };
                /**
                 * Associates the specified value with the specified key in this dictionary.
                 * If the dictionary previously contained a mapping for this key, the old
                 * value is replaced by the specified value.
                 * Updating of a key that already exists maintains its place in the
                 * insertion order into the map.
                 * @param {Object} key key with which the specified value is to be
                 * associated.
                 * @param {Object} value value to be associated with the specified key.
                 * @return {*} previous value associated with the specified key, or undefined if
                 * there was no mapping for the key or if the key/value are undefined.
                 */
                LinkedDictionary.prototype.setValue = function (key, value) {
                    if (util.isUndefined(key) || util.isUndefined(value)) {
                        return undefined;
                    }
                    var existingPair = this.getLinkedDictionaryPair(key);
                    var newPair = new LinkedDictionaryPair(key, value);
                    var k = '$' + this.toStr(key);
                    // If there is already an element for that key, we
                    // keep it's place in the LinkedList
                    if (!util.isUndefined(existingPair)) {
                        this.replace(existingPair, newPair);
                        return existingPair.value;
                    }
                    else {
                        this.appendToTail(newPair);
                        this.table[k] = newPair;
                        ++this.nElements;
                        return undefined;
                    }
                };
                /**
                 * Returns an array containing all of the keys in this LinkedDictionary, ordered
                 * by insertion order.
                 * @return {Array} an array containing all of the keys in this LinkedDictionary,
                 * ordered by insertion order.
                 */
                LinkedDictionary.prototype.keys = function () {
                    var array = [];
                    this.forEach(function (key, value) {
                        array.push(key);
                    });
                    return array;
                };
                /**
                 * Returns an array containing all of the values in this LinkedDictionary, ordered by
                 * insertion order.
                 * @return {Array} an array containing all of the values in this LinkedDictionary,
                 * ordered by insertion order.
                 */
                LinkedDictionary.prototype.values = function () {
                    var array = [];
                    this.forEach(function (key, value) {
                        array.push(value);
                    });
                    return array;
                };
                /**
                * Executes the provided function once for each key-value pair
                * present in this LinkedDictionary. It is done in the order of insertion
                * into the LinkedDictionary
                * @param {function(Object,Object):*} callback function to execute, it is
                * invoked with two arguments: key and value. To break the iteration you can
                * optionally return false.
                */
                LinkedDictionary.prototype.forEach = function (callback) {
                    var crawlNode = this.head.next;
                    while (crawlNode.next != null) {
                        var ret = callback(crawlNode.key, crawlNode.value);
                        if (ret === false) {
                            return;
                        }
                        crawlNode = crawlNode.next;
                    }
                };
                return LinkedDictionary;
            }(Dictionary_1.default));
            exports_1("default", LinkedDictionary); // End of LinkedDictionary
        }
    }
});
// /**
//  * Returns true if this dictionary is equal to the given dictionary.
//  * Two dictionaries are equal if they contain the same mappings.
//  * @param {collections.Dictionary} other the other dictionary.
//  * @param {function(Object,Object):boolean=} valuesEqualFunction optional
//  * function used to check if two values are equal.
//  * @return {boolean} true if this dictionary is equal to the given dictionary.
//  */
// collections.Dictionary.prototype.equals = function(other,valuesEqualFunction) {
// 	const eqF = valuesEqualFunction || collections.defaultEquals;
// 	if(!(other instanceof collections.Dictionary)){
// 		return false;
// 	}
// 	if(this.size() !== other.size()){
// 		return false;
// 	}
// 	return this.equalsAux(this.firstNode,other.firstNode,eqF);
// }
