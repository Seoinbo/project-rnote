System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Sidebar;
    return {
        setters:[],
        execute: function() {
            Sidebar = (function () {
                // recipenote: Recipenote;
                function Sidebar(elementRef) {
                    this.element = elementRef.nativeElement;
                    // this.recipenote = new Recipenote();
                }
                Sidebar.prototype.show = function () {
                    document.querySelector('sidebar').setAttribute('active', 'on');
                    // this.recipenote.showCloseArea();
                };
                Sidebar.prototype.hide = function () {
                    document.querySelector('sidebar').setAttribute('active', 'off');
                };
                Sidebar.prototype.toggle = function () {
                    var elSidebar = document.querySelector('sidebar');
                    if (elSidebar.getAttribute('active') == 'off') {
                        this.show();
                    }
                    else {
                        this.hide();
                    }
                };
                return Sidebar;
            }());
            exports_1("Sidebar", Sidebar);
        }
    }
});
