"use strict";

// aaaaaaa
var PI = 3.141593;
PI > 3.0;
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Person = // The 'class' keyword
function Person(name, age) {
    _classCallCheck(this, Person);

    // Constructors
    this.name = name;
    this.age = age;
};

var Developer = function (_Person) {
    _inherits(Developer, _Person);

    // The 'extends' keyword

    function Developer(name, age) {
        _classCallCheck(this, Developer);

        // Super calls

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Developer).call(this, name, age)); // Rest parameters


        for (var _len = arguments.length, languages = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            languages[_key - 2] = arguments[_key];
        }

        _this.languages = [].concat(languages); // The spread operator
        return _this;
    }

    _createClass(Developer, [{
        key: "printLanguages",
        value: function printLanguages() {
            // Short method definitions
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.languages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var lang = _step.value;
                    // The for..of loop
                    console.log(lang);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }]);

    return Developer;
}(Person);

var me = new Developer("James", 23, "ES5", "ES6"); // Block scoping