System.register(["./arrays", "./Bag", "./BSTree", "./Dictionary", "./Heap", "./LinkedDictionary", "./MultiDictionary", "./Queue", "./PriorityQueue", "./Set", "./Stack"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var _arrays;
    var arrays;
    return {
        setters:[
            function (_arrays_1) {
                _arrays = _arrays_1;
            },
            function (Bag_1_1) {
                exports_1({
                    "Bag": Bag_1_1["default"]
                });
            },
            function (BSTree_1_1) {
                exports_1({
                    "BSTree": BSTree_1_1["default"]
                });
            },
            function (Dictionary_1_1) {
                exports_1({
                    "Dictionary": Dictionary_1_1["default"]
                });
            },
            function (Heap_1_1) {
                exports_1({
                    "Heap": Heap_1_1["default"]
                });
            },
            function (LinkedDictionary_1_1) {
                exports_1({
                    "LinkedDictionary": LinkedDictionary_1_1["default"]
                });
            },
            function (MultiDictionary_1_1) {
                exports_1({
                    "MultiDictionary": MultiDictionary_1_1["default"]
                });
            },
            function (Queue_1_1) {
                exports_1({
                    "Queue": Queue_1_1["default"]
                });
            },
            function (PriorityQueue_1_1) {
                exports_1({
                    "PriorityQueue": PriorityQueue_1_1["default"]
                });
            },
            function (Set_1_1) {
                exports_1({
                    "Set": Set_1_1["default"]
                });
            },
            function (Stack_1_1) {
                exports_1({
                    "Stack": Stack_1_1["default"]
                });
            }],
        execute: function() {
            exports_1("arrays", arrays = _arrays);
        }
    }
});
