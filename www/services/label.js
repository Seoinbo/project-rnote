System.register(['angular2/core', './util', './config', './collections/LinkedList', './labeldb'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, util_1, config_1, LinkedList_1, labeldb_1;
    var LabelService, Label;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (LinkedList_1_1) {
                LinkedList_1 = LinkedList_1_1;
            },
            function (labeldb_1_1) {
                labeldb_1 = labeldb_1_1;
            }],
        execute: function() {
            // You have to set userid first.
            LabelService = (function () {
                function LabelService() {
                    this._db = new labeldb_1.LabelDB();
                    this._db.init();
                    this._labels = new LinkedList_1.LinkedList();
                }
                LabelService.prototype.downloadAll = function (complete) {
                    var _this = this;
                    this._db.open().then(function () {
                        _this._db.table("labels").each(function (item) {
                            _this.add(_this.create(item));
                        }).then(function () {
                            complete.apply(null);
                        });
                    }).finally(function () {
                        _this._db.close();
                    });
                };
                LabelService.prototype.create = function (data) {
                    if (!data) {
                        data = {
                            id: this._userid + '-l' + util_1.Util.uniqID(config_1.Config.now()),
                            owner: this._userid,
                            name: 'New label',
                            updated: 0,
                            removed: false,
                            recipes: new LinkedList_1.LinkedList()
                        };
                    }
                    var label = new Label();
                    label.import(data);
                    label.touch();
                    return label;
                };
                LabelService.prototype.add = function (label) {
                    this.labels.add(label);
                };
                LabelService.prototype.remove = function (id) {
                    var label = this.getLabelByID(id);
                    if (label) {
                        if (!this.labels.remove(label)) {
                            return false;
                        }
                        label.remove();
                        label.syncIDB();
                    }
                    return true;
                };
                LabelService.prototype.getLabelByID = function (id) {
                    var retv = null;
                    this.labels.forEach(function (label) {
                        if (label.id == id) {
                            retv = label;
                            return false;
                        }
                    });
                    return retv;
                };
                Object.defineProperty(LabelService.prototype, "userid", {
                    get: function () {
                        return this._userid;
                    },
                    set: function (id) {
                        this._userid = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LabelService.prototype, "labels", {
                    get: function () {
                        return this._labels;
                    },
                    set: function (labels) {
                        this._labels = labels;
                    },
                    enumerable: true,
                    configurable: true
                });
                LabelService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], LabelService);
                return LabelService;
            }());
            exports_1("LabelService", LabelService);
            Label = (function () {
                function Label(labelID) {
                    this.removed = false;
                    this.id = labelID;
                    this._db = new labeldb_1.LabelDB();
                    this._db.init();
                }
                Label.prototype.import = function (data) {
                    return $.extend(this, data);
                };
                Label.prototype.export = function () {
                    return {
                        id: this.id,
                        owner: this.owner,
                        name: this.name,
                        updated: this.updated,
                        removed: this.removed
                    };
                };
                Label.prototype.touch = function () {
                    this.updated = util_1.Util.toUnixTimestamp(config_1.Config.now());
                };
                Label.prototype.remove = function () {
                    this.removed = true;
                    this.touch();
                };
                // Sync recipes between memory and IndexedDB(localStorage)
                Label.prototype.syncIDB = function () {
                    var _this = this;
                    this._db.open().then(function () {
                        _this._db.syncIDB("labels", _this.export(), function () {
                            console.log("Complete syncIndexdDB() at Label.");
                            _this._db.close();
                        });
                    }).catch(function (e) {
                        console.log(e);
                    });
                };
                return Label;
            }());
            exports_1("Label", Label);
        }
    }
});
