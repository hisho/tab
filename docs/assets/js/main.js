/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/deepmerge/dist/cjs.js":
/*!********************************************!*\
  !*** ./node_modules/deepmerge/dist/cjs.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, options) {
	return (options.clone !== false && options.isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, options)
		: value
}

function defaultArrayMerge(target, source, options) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, options)
	})
}

function getMergeFunction(key, options) {
	if (!options.customMerge) {
		return deepmerge
	}
	var customMerge = options.customMerge(key);
	return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getEnumerableOwnPropertySymbols(target) {
	return Object.getOwnPropertySymbols
		? Object.getOwnPropertySymbols(target).filter(function(symbol) {
			return target.propertyIsEnumerable(symbol)
		})
		: []
}

function getKeys(target) {
	return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

function propertyIsOnObject(object, property) {
	try {
		return property in object
	} catch(_) {
		return false
	}
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target, key) {
	return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
		&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
			&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
}

function mergeObject(target, source, options) {
	var destination = {};
	if (options.isMergeableObject(target)) {
		getKeys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
		});
	}
	getKeys(source).forEach(function(key) {
		if (propertyIsUnsafe(target, key)) {
			return
		}

		if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
			destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
		} else {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
		}
	});
	return destination
}

function deepmerge(target, source, options) {
	options = options || {};
	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
	options.isMergeableObject = options.isMergeableObject || isMergeableObject;
	// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
	// implementations can use it. The caller may not replace it.
	options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, options)
	} else if (sourceIsArray) {
		return options.arrayMerge(target, source, options)
	} else {
		return mergeObject(target, source, options)
	}
}

deepmerge.all = function deepmergeAll(array, options) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, options)
	}, {})
};

var deepmerge_1 = deepmerge;

module.exports = deepmerge_1;


/***/ }),

/***/ "./src/js/main.ts":
/*!************************!*\
  !*** ./src/js/main.ts ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_Tab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Tab */ "./src/js/modules/Tab.ts");

var basic = document.getElementById('basic') ? new _modules_Tab__WEBPACK_IMPORTED_MODULE_0__["default"]('basic') : null;
var hash1 = document.getElementById('hash1') ? new _modules_Tab__WEBPACK_IMPORTED_MODULE_0__["default"]('hash1', {
    hash: true
}) : null;
var hash2 = document.getElementById('hash2') ? new _modules_Tab__WEBPACK_IMPORTED_MODULE_0__["default"]('hash2', {
    id: 'myHash',
    hash: true
}) : null;


/***/ }),

/***/ "./src/js/modules/Tab.ts":
/*!*******************************!*\
  !*** ./src/js/modules/Tab.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! deepmerge */ "./node_modules/deepmerge/dist/cjs.js");
/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(deepmerge__WEBPACK_IMPORTED_MODULE_0__);
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (undefined && undefined.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};

var Tab = /** @class */ (function () {
    function Tab(tabContainerName, options) {
        if (options === void 0) { options = {}; }
        this.tabContainerName = tabContainerName;
        var defaultOptions = {
            id: this.tabContainerName + "-tab",
            firstShowIndex: 0,
            hash: false
        };
        this.options = deepmerge__WEBPACK_IMPORTED_MODULE_0___default()(defaultOptions, options);
        this.tabContainerElement = document.getElementById(this.tabContainerName);
        this.tabButtons = __spread(this.tabContainerElement.querySelectorAll('[role="tab"]'));
        this.tabContents = __spread(this.tabContainerElement.querySelectorAll('[role="tabpanel"]'));
        this.idList = this.makeIdList();
        this.currentHash = window.location.hash.replace(/^#/, '');
        this.init();
    }
    Tab.prototype.init = function () {
        var _this = this;
        if (this.options.hash)
            this.initHash();
        this.tabButtons.forEach(function (tabButton, index) {
            _this.setAriaControls(tabButton, index);
            _this.setAriaSelected(tabButton, _this.isFirstShowItem(index));
            tabButton.addEventListener('click', function () { return _this.click(tabButton, index); });
        });
        this.tabContents.forEach(function (tabContent, index) {
            _this.setID(tabContent, index);
            _this.setAriaHidden(tabContent, !_this.isFirstShowItem(index));
        });
    };
    Tab.prototype.click = function (element, index) {
        var isSelected = element.getAttribute('aria-selected') === 'true';
        if (isSelected)
            return;
        if (this.options.hash)
            this.addHash(index);
        var hideTabButtons = this.tabButtons.filter(function (x, i) { return i !== index; });
        var hideTabContainers = this.tabContents.filter(function (x, i) { return i !== index; });
        this.show(element, this.tabContents[index]);
        this.hide(hideTabButtons, hideTabContainers);
    };
    Tab.prototype.isFirstShowItem = function (index) {
        var hasCurrentHash = this.idList.indexOf(this.currentHash);
        var firstShowIndex = hasCurrentHash !== -1 ? hasCurrentHash : this.options.firstShowIndex;
        return index === firstShowIndex;
    };
    Tab.prototype.show = function (tabButton, tabContainer) {
        this.setAriaSelected(tabButton, true);
        this.setAriaHidden(tabContainer, false);
    };
    Tab.prototype.hide = function (tabButtons, tabContainers) {
        var _this = this;
        tabButtons.forEach(function (x) { return _this.setAriaSelected(x, false); });
        tabContainers.forEach(function (x) { return _this.setAriaHidden(x, true); });
    };
    Tab.prototype.initHash = function () {
        var currentHash = window.location.hash;
        if (currentHash === '')
            this.addHash(this.options.firstShowIndex);
    };
    Tab.prototype.addHash = function (index) {
        history.replaceState(undefined, undefined, "#" + this.idList[index]);
        //ヒストリーに残す場合の処理
        // window.location.hash = `#${this.options.id}${index}`;
    };
    Tab.prototype.makeIdList = function () {
        var _this = this;
        return this.tabButtons.map(function (x, index) {
            var currentIndex = String(index).padStart(2, '0');
            return "" + _this.options.id + currentIndex;
        });
    };
    Tab.prototype.setAriaControls = function (element, index) {
        element.setAttribute('aria-controls', "" + this.idList[index]);
    };
    Tab.prototype.setID = function (element, index) {
        element.setAttribute('id', "" + this.idList[index]);
    };
    Tab.prototype.setAriaHidden = function (element, value) {
        element.setAttribute('aria-hidden', "" + value);
    };
    Tab.prototype.setAriaSelected = function (element, value) {
        element.setAttribute('aria-selected', "" + value);
    };
    return Tab;
}());
/* harmony default export */ __webpack_exports__["default"] = (Tab);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RlZXBtZXJnZS9kaXN0L2Nqcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9UYWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFLElBQUk7QUFDTjs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQ3BJQTtBQUFBO0FBQWdDO0FBRWhDLElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksb0RBQUcsQ0FBQyxPQUFPLENBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQzNFLElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksb0RBQUcsQ0FBQyxPQUFPLEVBQUU7SUFDaEUsSUFBSSxFQUFFLElBQUk7Q0FDWCxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUVWLElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksb0RBQUcsQ0FBQyxPQUFPLEVBQUU7SUFDaEUsRUFBRSxFQUFFLFFBQVE7SUFDWixJQUFJLEVBQUUsSUFBSTtDQUNYLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWb0I7QUFROUI7SUFRRSxhQUFZLGdCQUF1QixFQUFDLE9BQXVCO1FBQXZCLHNDQUF1QjtRQUN6RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDekMsSUFBTSxjQUFjLEdBQWM7WUFDaEMsRUFBRSxFQUFLLElBQUksQ0FBQyxnQkFBZ0IsU0FBTTtZQUNsQyxjQUFjLEVBQUUsQ0FBQztZQUNqQixJQUFJLEVBQUUsS0FBSztTQUNaLENBQUM7UUFDRixJQUFJLENBQUMsT0FBTyxHQUFHLGdEQUFLLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxVQUFVLFlBQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixDQUFjLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDOUYsSUFBSSxDQUFDLFdBQVcsWUFBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLENBQWMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1FBQ3BHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBQ0Qsa0JBQUksR0FBSjtRQUFBLGlCQVdDO1FBVkMsSUFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUk7WUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxTQUFTLEVBQUUsS0FBSztZQUN2QyxLQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBQyxLQUFLLENBQUMsQ0FBQztZQUN0QyxLQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBQyxLQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDNUQsU0FBUyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxjQUFNLFlBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFDLEtBQUssQ0FBQyxFQUEzQixDQUEyQixDQUFDLENBQUM7UUFDekUsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFVBQVUsRUFBRSxLQUFLO1lBQ3pDLEtBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdCLEtBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFDLENBQUMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzlELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELG1CQUFLLEdBQUwsVUFBTSxPQUFtQixFQUFDLEtBQVk7UUFDcEMsSUFBTSxVQUFVLEdBQVcsT0FBTyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsS0FBSyxNQUFNLENBQUM7UUFDNUUsSUFBSSxVQUFVO1lBQUUsT0FBTztRQUN2QixJQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSTtZQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsSUFBTSxjQUFjLEdBQWlCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQyxFQUFDLENBQUMsSUFBSyxRQUFDLEtBQUssS0FBSyxFQUFYLENBQVcsQ0FBQyxDQUFDO1FBQ2xGLElBQU0saUJBQWlCLEdBQWlCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQyxFQUFDLENBQUMsSUFBSyxRQUFDLEtBQUssS0FBSyxFQUFYLENBQVcsQ0FBQyxDQUFDO1FBQ3RGLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFDRCw2QkFBZSxHQUFmLFVBQWdCLEtBQVk7UUFDMUIsSUFBTSxjQUFjLEdBQVUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BFLElBQU0sY0FBYyxHQUFVLGNBQWMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7UUFDbEcsT0FBTyxLQUFLLEtBQUssY0FBYyxDQUFDO0lBQ2xDLENBQUM7SUFDRCxrQkFBSSxHQUFKLFVBQUssU0FBcUIsRUFBQyxZQUF3QjtRQUNqRCxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBQyxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBQ0Qsa0JBQUksR0FBSixVQUFLLFVBQXdCLEVBQUMsYUFBMkI7UUFBekQsaUJBR0M7UUFGQyxVQUFVLENBQUMsT0FBTyxDQUFDLFdBQUMsSUFBSSxZQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsRUFBN0IsQ0FBNkIsQ0FBQyxDQUFDO1FBQ3ZELGFBQWEsQ0FBQyxPQUFPLENBQUMsV0FBQyxJQUFJLFlBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxFQUExQixDQUEwQixDQUFDLENBQUM7SUFDekQsQ0FBQztJQUNELHNCQUFRLEdBQVI7UUFDRSxJQUFNLFdBQVcsR0FBVSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztRQUNoRCxJQUFHLFdBQVcsS0FBSyxFQUFFO1lBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFDRCxxQkFBTyxHQUFQLFVBQVEsS0FBWTtRQUNsQixPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBRyxDQUFDLENBQUM7UUFDckUsZUFBZTtRQUNmLHdEQUF3RDtJQUMxRCxDQUFDO0lBQ0Qsd0JBQVUsR0FBVjtRQUFBLGlCQUtDO1FBSkMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUMsRUFBQyxLQUFLO1lBQ2pDLElBQU0sWUFBWSxHQUFVLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzNELE9BQU8sS0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxZQUFjLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsNkJBQWUsR0FBZixVQUFnQixPQUFtQixFQUFDLEtBQVk7UUFDOUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsS0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBRyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUNELG1CQUFLLEdBQUwsVUFBTSxPQUFtQixFQUFDLEtBQVk7UUFDcEMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsS0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBRyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUNELDJCQUFhLEdBQWIsVUFBYyxPQUFtQixFQUFDLEtBQWE7UUFDN0MsT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsS0FBRyxLQUFPLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBQ0QsNkJBQWUsR0FBZixVQUFnQixPQUFtQixFQUFDLEtBQWE7UUFDL0MsT0FBTyxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsS0FBRyxLQUFPLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBQ0gsVUFBQztBQUFELENBQUM7QUFFYyxrRUFBRyxFQUFDIiwiZmlsZSI6ImRvY3MvYXNzZXRzL2pzL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9tYWluLnRzXCIpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNNZXJnZWFibGVPYmplY3QgPSBmdW5jdGlvbiBpc01lcmdlYWJsZU9iamVjdCh2YWx1ZSkge1xuXHRyZXR1cm4gaXNOb25OdWxsT2JqZWN0KHZhbHVlKVxuXHRcdCYmICFpc1NwZWNpYWwodmFsdWUpXG59O1xuXG5mdW5jdGlvbiBpc05vbk51bGxPYmplY3QodmFsdWUpIHtcblx0cmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0J1xufVxuXG5mdW5jdGlvbiBpc1NwZWNpYWwodmFsdWUpIHtcblx0dmFyIHN0cmluZ1ZhbHVlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKTtcblxuXHRyZXR1cm4gc3RyaW5nVmFsdWUgPT09ICdbb2JqZWN0IFJlZ0V4cF0nXG5cdFx0fHwgc3RyaW5nVmFsdWUgPT09ICdbb2JqZWN0IERhdGVdJ1xuXHRcdHx8IGlzUmVhY3RFbGVtZW50KHZhbHVlKVxufVxuXG4vLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2Jsb2IvYjVhYzk2M2ZiNzkxZDEyOThlN2YzOTYyMzYzODNiYzk1NWY5MTZjMS9zcmMvaXNvbW9ycGhpYy9jbGFzc2ljL2VsZW1lbnQvUmVhY3RFbGVtZW50LmpzI0wyMS1MMjVcbnZhciBjYW5Vc2VTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5mb3I7XG52YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gY2FuVXNlU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpIDogMHhlYWM3O1xuXG5mdW5jdGlvbiBpc1JlYWN0RWxlbWVudCh2YWx1ZSkge1xuXHRyZXR1cm4gdmFsdWUuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRVxufVxuXG5mdW5jdGlvbiBlbXB0eVRhcmdldCh2YWwpIHtcblx0cmV0dXJuIEFycmF5LmlzQXJyYXkodmFsKSA/IFtdIDoge31cbn1cblxuZnVuY3Rpb24gY2xvbmVVbmxlc3NPdGhlcndpc2VTcGVjaWZpZWQodmFsdWUsIG9wdGlvbnMpIHtcblx0cmV0dXJuIChvcHRpb25zLmNsb25lICE9PSBmYWxzZSAmJiBvcHRpb25zLmlzTWVyZ2VhYmxlT2JqZWN0KHZhbHVlKSlcblx0XHQ/IGRlZXBtZXJnZShlbXB0eVRhcmdldCh2YWx1ZSksIHZhbHVlLCBvcHRpb25zKVxuXHRcdDogdmFsdWVcbn1cblxuZnVuY3Rpb24gZGVmYXVsdEFycmF5TWVyZ2UodGFyZ2V0LCBzb3VyY2UsIG9wdGlvbnMpIHtcblx0cmV0dXJuIHRhcmdldC5jb25jYXQoc291cmNlKS5tYXAoZnVuY3Rpb24oZWxlbWVudCkge1xuXHRcdHJldHVybiBjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZChlbGVtZW50LCBvcHRpb25zKVxuXHR9KVxufVxuXG5mdW5jdGlvbiBnZXRNZXJnZUZ1bmN0aW9uKGtleSwgb3B0aW9ucykge1xuXHRpZiAoIW9wdGlvbnMuY3VzdG9tTWVyZ2UpIHtcblx0XHRyZXR1cm4gZGVlcG1lcmdlXG5cdH1cblx0dmFyIGN1c3RvbU1lcmdlID0gb3B0aW9ucy5jdXN0b21NZXJnZShrZXkpO1xuXHRyZXR1cm4gdHlwZW9mIGN1c3RvbU1lcmdlID09PSAnZnVuY3Rpb24nID8gY3VzdG9tTWVyZ2UgOiBkZWVwbWVyZ2Vcbn1cblxuZnVuY3Rpb24gZ2V0RW51bWVyYWJsZU93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpIHtcblx0cmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHNcblx0XHQ/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KS5maWx0ZXIoZnVuY3Rpb24oc3ltYm9sKSB7XG5cdFx0XHRyZXR1cm4gdGFyZ2V0LnByb3BlcnR5SXNFbnVtZXJhYmxlKHN5bWJvbClcblx0XHR9KVxuXHRcdDogW11cbn1cblxuZnVuY3Rpb24gZ2V0S2V5cyh0YXJnZXQpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKHRhcmdldCkuY29uY2F0KGdldEVudW1lcmFibGVPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSlcbn1cblxuZnVuY3Rpb24gcHJvcGVydHlJc09uT2JqZWN0KG9iamVjdCwgcHJvcGVydHkpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gcHJvcGVydHkgaW4gb2JqZWN0XG5cdH0gY2F0Y2goXykge1xuXHRcdHJldHVybiBmYWxzZVxuXHR9XG59XG5cbi8vIFByb3RlY3RzIGZyb20gcHJvdG90eXBlIHBvaXNvbmluZyBhbmQgdW5leHBlY3RlZCBtZXJnaW5nIHVwIHRoZSBwcm90b3R5cGUgY2hhaW4uXG5mdW5jdGlvbiBwcm9wZXJ0eUlzVW5zYWZlKHRhcmdldCwga2V5KSB7XG5cdHJldHVybiBwcm9wZXJ0eUlzT25PYmplY3QodGFyZ2V0LCBrZXkpIC8vIFByb3BlcnRpZXMgYXJlIHNhZmUgdG8gbWVyZ2UgaWYgdGhleSBkb24ndCBleGlzdCBpbiB0aGUgdGFyZ2V0IHlldCxcblx0XHQmJiAhKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRhcmdldCwga2V5KSAvLyB1bnNhZmUgaWYgdGhleSBleGlzdCB1cCB0aGUgcHJvdG90eXBlIGNoYWluLFxuXHRcdFx0JiYgT2JqZWN0LnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodGFyZ2V0LCBrZXkpKSAvLyBhbmQgYWxzbyB1bnNhZmUgaWYgdGhleSdyZSBub25lbnVtZXJhYmxlLlxufVxuXG5mdW5jdGlvbiBtZXJnZU9iamVjdCh0YXJnZXQsIHNvdXJjZSwgb3B0aW9ucykge1xuXHR2YXIgZGVzdGluYXRpb24gPSB7fTtcblx0aWYgKG9wdGlvbnMuaXNNZXJnZWFibGVPYmplY3QodGFyZ2V0KSkge1xuXHRcdGdldEtleXModGFyZ2V0KS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuXHRcdFx0ZGVzdGluYXRpb25ba2V5XSA9IGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkKHRhcmdldFtrZXldLCBvcHRpb25zKTtcblx0XHR9KTtcblx0fVxuXHRnZXRLZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcblx0XHRpZiAocHJvcGVydHlJc1Vuc2FmZSh0YXJnZXQsIGtleSkpIHtcblx0XHRcdHJldHVyblxuXHRcdH1cblxuXHRcdGlmIChwcm9wZXJ0eUlzT25PYmplY3QodGFyZ2V0LCBrZXkpICYmIG9wdGlvbnMuaXNNZXJnZWFibGVPYmplY3Qoc291cmNlW2tleV0pKSB7XG5cdFx0XHRkZXN0aW5hdGlvbltrZXldID0gZ2V0TWVyZ2VGdW5jdGlvbihrZXksIG9wdGlvbnMpKHRhcmdldFtrZXldLCBzb3VyY2Vba2V5XSwgb3B0aW9ucyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlc3RpbmF0aW9uW2tleV0gPSBjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZChzb3VyY2Vba2V5XSwgb3B0aW9ucyk7XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIGRlc3RpbmF0aW9uXG59XG5cbmZ1bmN0aW9uIGRlZXBtZXJnZSh0YXJnZXQsIHNvdXJjZSwgb3B0aW9ucykge1xuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblx0b3B0aW9ucy5hcnJheU1lcmdlID0gb3B0aW9ucy5hcnJheU1lcmdlIHx8IGRlZmF1bHRBcnJheU1lcmdlO1xuXHRvcHRpb25zLmlzTWVyZ2VhYmxlT2JqZWN0ID0gb3B0aW9ucy5pc01lcmdlYWJsZU9iamVjdCB8fCBpc01lcmdlYWJsZU9iamVjdDtcblx0Ly8gY2xvbmVVbmxlc3NPdGhlcndpc2VTcGVjaWZpZWQgaXMgYWRkZWQgdG8gYG9wdGlvbnNgIHNvIHRoYXQgY3VzdG9tIGFycmF5TWVyZ2UoKVxuXHQvLyBpbXBsZW1lbnRhdGlvbnMgY2FuIHVzZSBpdC4gVGhlIGNhbGxlciBtYXkgbm90IHJlcGxhY2UgaXQuXG5cdG9wdGlvbnMuY2xvbmVVbmxlc3NPdGhlcndpc2VTcGVjaWZpZWQgPSBjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZDtcblxuXHR2YXIgc291cmNlSXNBcnJheSA9IEFycmF5LmlzQXJyYXkoc291cmNlKTtcblx0dmFyIHRhcmdldElzQXJyYXkgPSBBcnJheS5pc0FycmF5KHRhcmdldCk7XG5cdHZhciBzb3VyY2VBbmRUYXJnZXRUeXBlc01hdGNoID0gc291cmNlSXNBcnJheSA9PT0gdGFyZ2V0SXNBcnJheTtcblxuXHRpZiAoIXNvdXJjZUFuZFRhcmdldFR5cGVzTWF0Y2gpIHtcblx0XHRyZXR1cm4gY2xvbmVVbmxlc3NPdGhlcndpc2VTcGVjaWZpZWQoc291cmNlLCBvcHRpb25zKVxuXHR9IGVsc2UgaWYgKHNvdXJjZUlzQXJyYXkpIHtcblx0XHRyZXR1cm4gb3B0aW9ucy5hcnJheU1lcmdlKHRhcmdldCwgc291cmNlLCBvcHRpb25zKVxuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBtZXJnZU9iamVjdCh0YXJnZXQsIHNvdXJjZSwgb3B0aW9ucylcblx0fVxufVxuXG5kZWVwbWVyZ2UuYWxsID0gZnVuY3Rpb24gZGVlcG1lcmdlQWxsKGFycmF5LCBvcHRpb25zKSB7XG5cdGlmICghQXJyYXkuaXNBcnJheShhcnJheSkpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ2ZpcnN0IGFyZ3VtZW50IHNob3VsZCBiZSBhbiBhcnJheScpXG5cdH1cblxuXHRyZXR1cm4gYXJyYXkucmVkdWNlKGZ1bmN0aW9uKHByZXYsIG5leHQpIHtcblx0XHRyZXR1cm4gZGVlcG1lcmdlKHByZXYsIG5leHQsIG9wdGlvbnMpXG5cdH0sIHt9KVxufTtcblxudmFyIGRlZXBtZXJnZV8xID0gZGVlcG1lcmdlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZXBtZXJnZV8xO1xuIiwiaW1wb3J0IFRhYiBmcm9tICcuL21vZHVsZXMvVGFiJztcblxuY29uc3QgYmFzaWMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFzaWMnKSA/IG5ldyBUYWIoJ2Jhc2ljJywgKSA6IG51bGw7XG5jb25zdCBoYXNoMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoYXNoMScpID8gbmV3IFRhYignaGFzaDEnLCB7XG4gIGhhc2g6IHRydWVcbn0pIDogbnVsbDtcblxuY29uc3QgaGFzaDIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGFzaDInKSA/IG5ldyBUYWIoJ2hhc2gyJywge1xuICBpZDogJ215SGFzaCcsXG4gIGhhc2g6IHRydWVcbn0pIDogbnVsbDsiLCJpbXBvcnQgbWVyZ2UgZnJvbSBcImRlZXBtZXJnZVwiO1xuXG5pbnRlcmZhY2UgVGFiT3B0aW9ucyB7XG4gIGlkPzogc3RyaW5nXG4gIGZpcnN0U2hvd0luZGV4PzogbnVtYmVyLFxuICBoYXNoPzogYm9vbGVhblxufVxuXG5jbGFzcyBUYWIge1xuICB0YWJDb250YWluZXJOYW1lOiBzdHJpbmc7XG4gIHRhYkNvbnRhaW5lckVsZW1lbnQ6SFRNTEVsZW1lbnQ7XG4gIHRhYkJ1dHRvbnM6SFRNTEVsZW1lbnRbXTtcbiAgdGFiQ29udGVudHM6SFRNTEVsZW1lbnRbXTtcbiAgaWRMaXN0OnN0cmluZ1tdO1xuICBjdXJyZW50SGFzaDogc3RyaW5nO1xuICBvcHRpb25zOiBUYWJPcHRpb25zO1xuICBjb25zdHJ1Y3Rvcih0YWJDb250YWluZXJOYW1lOnN0cmluZyxvcHRpb25zOlRhYk9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMudGFiQ29udGFpbmVyTmFtZSA9IHRhYkNvbnRhaW5lck5hbWU7XG4gICAgY29uc3QgZGVmYXVsdE9wdGlvbnM6VGFiT3B0aW9ucyA9IHtcbiAgICAgIGlkOiBgJHt0aGlzLnRhYkNvbnRhaW5lck5hbWV9LXRhYmAsXG4gICAgICBmaXJzdFNob3dJbmRleDogMCxcbiAgICAgIGhhc2g6IGZhbHNlXG4gICAgfTtcbiAgICB0aGlzLm9wdGlvbnMgPSBtZXJnZShkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgdGhpcy50YWJDb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy50YWJDb250YWluZXJOYW1lKTtcbiAgICB0aGlzLnRhYkJ1dHRvbnMgPSBbLi4udGhpcy50YWJDb250YWluZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KCdbcm9sZT1cInRhYlwiXScpXTtcbiAgICB0aGlzLnRhYkNvbnRlbnRzID0gWy4uLnRoaXMudGFiQ29udGFpbmVyRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PignW3JvbGU9XCJ0YWJwYW5lbFwiXScpXTtcbiAgICB0aGlzLmlkTGlzdCA9IHRoaXMubWFrZUlkTGlzdCgpO1xuICAgIHRoaXMuY3VycmVudEhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaC5yZXBsYWNlKC9eIy8sJycpO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG4gIGluaXQoKSB7XG4gICAgaWYodGhpcy5vcHRpb25zLmhhc2gpIHRoaXMuaW5pdEhhc2goKTtcbiAgICB0aGlzLnRhYkJ1dHRvbnMuZm9yRWFjaCgodGFiQnV0dG9uLCBpbmRleCkgPT4ge1xuICAgICAgdGhpcy5zZXRBcmlhQ29udHJvbHModGFiQnV0dG9uLGluZGV4KTtcbiAgICAgIHRoaXMuc2V0QXJpYVNlbGVjdGVkKHRhYkJ1dHRvbix0aGlzLmlzRmlyc3RTaG93SXRlbShpbmRleCkpO1xuICAgICAgdGFiQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5jbGljayh0YWJCdXR0b24saW5kZXgpKTtcbiAgICB9KTtcbiAgICB0aGlzLnRhYkNvbnRlbnRzLmZvckVhY2goKHRhYkNvbnRlbnQsIGluZGV4KSA9PiB7XG4gICAgICB0aGlzLnNldElEKHRhYkNvbnRlbnQsaW5kZXgpO1xuICAgICAgdGhpcy5zZXRBcmlhSGlkZGVuKHRhYkNvbnRlbnQsIXRoaXMuaXNGaXJzdFNob3dJdGVtKGluZGV4KSk7XG4gICAgfSk7XG4gIH1cbiAgY2xpY2soZWxlbWVudDpIVE1MRWxlbWVudCxpbmRleDpudW1iZXIpIHtcbiAgICBjb25zdCBpc1NlbGVjdGVkOmJvb2xlYW4gPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcpID09PSAndHJ1ZSc7XG4gICAgaWYgKGlzU2VsZWN0ZWQpIHJldHVybjtcbiAgICBpZih0aGlzLm9wdGlvbnMuaGFzaCkgdGhpcy5hZGRIYXNoKGluZGV4KTtcbiAgICBjb25zdCBoaWRlVGFiQnV0dG9uczpIVE1MRWxlbWVudFtdID0gdGhpcy50YWJCdXR0b25zLmZpbHRlcigoeCxpKSA9PiBpICE9PSBpbmRleCk7XG4gICAgY29uc3QgaGlkZVRhYkNvbnRhaW5lcnM6SFRNTEVsZW1lbnRbXSA9IHRoaXMudGFiQ29udGVudHMuZmlsdGVyKCh4LGkpID0+IGkgIT09IGluZGV4KTtcbiAgICB0aGlzLnNob3coZWxlbWVudCx0aGlzLnRhYkNvbnRlbnRzW2luZGV4XSk7XG4gICAgdGhpcy5oaWRlKGhpZGVUYWJCdXR0b25zLGhpZGVUYWJDb250YWluZXJzKTtcbiAgfVxuICBpc0ZpcnN0U2hvd0l0ZW0oaW5kZXg6bnVtYmVyKTpib29sZWFuIHtcbiAgICBjb25zdCBoYXNDdXJyZW50SGFzaDpudW1iZXIgPSB0aGlzLmlkTGlzdC5pbmRleE9mKHRoaXMuY3VycmVudEhhc2gpO1xuICAgIGNvbnN0IGZpcnN0U2hvd0luZGV4Om51bWJlciA9IGhhc0N1cnJlbnRIYXNoICE9PSAtMSA/IGhhc0N1cnJlbnRIYXNoIDp0aGlzLm9wdGlvbnMuZmlyc3RTaG93SW5kZXg7XG4gICAgcmV0dXJuIGluZGV4ID09PSBmaXJzdFNob3dJbmRleDtcbiAgfVxuICBzaG93KHRhYkJ1dHRvbjpIVE1MRWxlbWVudCx0YWJDb250YWluZXI6SFRNTEVsZW1lbnQpIHtcbiAgICB0aGlzLnNldEFyaWFTZWxlY3RlZCh0YWJCdXR0b24sdHJ1ZSk7XG4gICAgdGhpcy5zZXRBcmlhSGlkZGVuKHRhYkNvbnRhaW5lcixmYWxzZSk7XG4gIH1cbiAgaGlkZSh0YWJCdXR0b25zOkhUTUxFbGVtZW50W10sdGFiQ29udGFpbmVyczpIVE1MRWxlbWVudFtdKSB7XG4gICAgdGFiQnV0dG9ucy5mb3JFYWNoKHggPT4gdGhpcy5zZXRBcmlhU2VsZWN0ZWQoeCxmYWxzZSkpO1xuICAgIHRhYkNvbnRhaW5lcnMuZm9yRWFjaCh4ID0+IHRoaXMuc2V0QXJpYUhpZGRlbih4LHRydWUpKTtcbiAgfVxuICBpbml0SGFzaCgpIHtcbiAgICBjb25zdCBjdXJyZW50SGFzaDpzdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcbiAgICBpZihjdXJyZW50SGFzaCA9PT0gJycpIHRoaXMuYWRkSGFzaCh0aGlzLm9wdGlvbnMuZmlyc3RTaG93SW5kZXgpO1xuICB9XG4gIGFkZEhhc2goaW5kZXg6bnVtYmVyKSB7XG4gICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUodW5kZWZpbmVkLCB1bmRlZmluZWQsIGAjJHt0aGlzLmlkTGlzdFtpbmRleF19YCk7XG4gICAgLy/jg5Ljgrnjg4jjg6rjg7zjgavmrovjgZnloLTlkIjjga7lh6bnkIZcbiAgICAvLyB3aW5kb3cubG9jYXRpb24uaGFzaCA9IGAjJHt0aGlzLm9wdGlvbnMuaWR9JHtpbmRleH1gO1xuICB9XG4gIG1ha2VJZExpc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFiQnV0dG9ucy5tYXAoKHgsaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRJbmRleDpzdHJpbmcgPSBTdHJpbmcoaW5kZXgpLnBhZFN0YXJ0KDIsICcwJyk7XG4gICAgICByZXR1cm4gYCR7dGhpcy5vcHRpb25zLmlkfSR7Y3VycmVudEluZGV4fWA7XG4gICAgfSk7XG4gIH1cbiAgc2V0QXJpYUNvbnRyb2xzKGVsZW1lbnQ6SFRNTEVsZW1lbnQsaW5kZXg6bnVtYmVyKSB7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnLCBgJHt0aGlzLmlkTGlzdFtpbmRleF19YCk7XG4gIH1cbiAgc2V0SUQoZWxlbWVudDpIVE1MRWxlbWVudCxpbmRleDpudW1iZXIpIHtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCBgJHt0aGlzLmlkTGlzdFtpbmRleF19YCk7XG4gIH1cbiAgc2V0QXJpYUhpZGRlbihlbGVtZW50OkhUTUxFbGVtZW50LHZhbHVlOmJvb2xlYW4pIHtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCBgJHt2YWx1ZX1gKTtcbiAgfVxuICBzZXRBcmlhU2VsZWN0ZWQoZWxlbWVudDpIVE1MRWxlbWVudCx2YWx1ZTpib29sZWFuKSB7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCBgJHt2YWx1ZX1gKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUYWI7Il0sInNvdXJjZVJvb3QiOiIifQ==