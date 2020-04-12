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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/@js/main.ts":
/*!*************************!*\
  !*** ./src/@js/main.ts ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_Tab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Tab */ "./src/@js/modules/Tab.ts");

new _modules_Tab__WEBPACK_IMPORTED_MODULE_0__["default"]('test');


/***/ }),

/***/ "./src/@js/modules/Tab.ts":
/*!********************************!*\
  !*** ./src/@js/modules/Tab.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
    function Tab(tabContainerName) {
        this.tabContainerName = tabContainerName;
        this.tabContainerElement = document.getElementById(this.tabContainerName);
        this.tabButtons = __spread(this.tabContainerElement.querySelectorAll('[role="tab"]'));
        this.tabContents = __spread(this.tabContainerElement.querySelectorAll('[role="tabpanel"]'));
        this.init();
    }
    Tab.prototype.init = function () {
        var _this = this;
        this.tabButtons.forEach(function (tabButton, index) {
            _this.setAriaControls(tabButton, index);
            _this.setAriaSelected(tabButton, _this.isFirstItem(index));
            tabButton.addEventListener('click', function () { return _this.click(tabButton, index); });
        });
        this.tabContents.forEach(function (tabContent, index) {
            _this.setID(tabContent, index);
            _this.setAriaHidden(tabContent, !_this.isFirstItem(index));
        });
    };
    Tab.prototype.click = function (element, index) {
        var isSelected = element.getAttribute('aria-selected') === 'true';
        if (isSelected)
            return;
        var hideTabButtons = this.tabButtons.filter(function (x, i) { return i !== index; });
        var hideTabContainers = this.tabContents.filter(function (x, i) { return i !== index; });
        this.show(element, this.tabContents[index]);
        this.hide(hideTabButtons, hideTabContainers);
    };
    Tab.prototype.isFirstItem = function (index) {
        return index === 0;
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
    Tab.prototype.setAriaControls = function (element, value) {
        element.setAttribute('aria-controls', this.tabContainerName + "-tab" + value);
    };
    Tab.prototype.setID = function (element, value) {
        element.setAttribute('id', this.tabContainerName + "-tab" + value);
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


/***/ }),

/***/ "./src/@scss/common.scss":
/*!*******************************!*\
  !*** ./src/@scss/common.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*******************************************************!*\
  !*** multi ./src/@js/main.ts ./src/@scss/common.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/hisho/github/tab/src/@js/main.ts */"./src/@js/main.ts");
module.exports = __webpack_require__(/*! /Users/hisho/github/tab/src/@scss/common.scss */"./src/@scss/common.scss");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Bqcy9tYWluLnRzIiwid2VicGFjazovLy8uL3NyYy9AanMvbW9kdWxlcy9UYWIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0BzY3NzL2NvbW1vbi5zY3NzPzQ1NmEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQWdDO0FBQ2hDLElBQUksb0RBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0RoQjtJQUtFLGFBQVksZ0JBQXVCO1FBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztRQUN6QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMs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LEVBQUssSUFBSSxDQUFDLGdCQUFnQixZQUFPLEtBQU8sQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFDRCxtQkFBSyxHQUFMLFVBQU0sT0FBbUIsRUFBQyxLQUFxQjtRQUM3QyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksRUFBSyxJQUFJLENBQUMsZ0JBQWdCLFlBQU8sS0FBTyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUNELDJCQUFhLEdBQWIsVUFBYyxPQUFtQixFQUFDLEtBQWE7UUFDN0MsT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsS0FBRyxLQUFPLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBQ0QsNkJBQWUsR0FBZixVQUFnQixPQUFtQixFQUFDLEtBQWE7UUFDL0MsT0FBTyxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsS0FBRyxLQUFPLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBQ0gsVUFBQztBQUFELENBQUM7Ozs7Ozs7Ozs7Ozs7QUN0REQseUMiLCJmaWxlIjoiL2RvY3MvYXNzZXRzL2pzL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiaW1wb3J0IFRhYiBmcm9tICcuL21vZHVsZXMvVGFiJztcbm5ldyBUYWIoJ3Rlc3QnKTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUYWIge1xuICB0YWJDb250YWluZXJOYW1lOiBzdHJpbmc7XG4gIHRhYkNvbnRhaW5lckVsZW1lbnQ6SFRNTEVsZW1lbnQ7XG4gIHRhYkJ1dHRvbnM6SFRNTEVsZW1lbnRbXTtcbiAgdGFiQ29udGVudHM6SFRNTEVsZW1lbnRbXTtcbiAgY29uc3RydWN0b3IodGFiQ29udGFpbmVyTmFtZTpzdHJpbmcpIHtcbiAgICB0aGlzLnRhYkNvbnRhaW5lck5hbWUgPSB0YWJDb250YWluZXJOYW1lO1xuICAgIHRoaXMudGFiQ29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMudGFiQ29udGFpbmVyTmFtZSk7XG4gICAgdGhpcy50YWJCdXR0b25zID0gWy4uLnRoaXMudGFiQ29udGFpbmVyRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PignW3JvbGU9XCJ0YWJcIl0nKV07XG4gICAgdGhpcy50YWJDb250ZW50cyA9IFsuLi50aGlzLnRhYkNvbnRhaW5lckVsZW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oJ1tyb2xlPVwidGFicGFuZWxcIl0nKV07XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cbiAgaW5pdCgpIHtcbiAgICB0aGlzLnRhYkJ1dHRvbnMuZm9yRWFjaCgodGFiQnV0dG9uLCBpbmRleCkgPT4ge1xuICAgICAgdGhpcy5zZXRBcmlhQ29udHJvbHModGFiQnV0dG9uLGluZGV4KTtcbiAgICAgIHRoaXMuc2V0QXJpYVNlbGVjdGVkKHRhYkJ1dHRvbix0aGlzLmlzRmlyc3RJdGVtKGluZGV4KSk7XG4gICAgICB0YWJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmNsaWNrKHRhYkJ1dHRvbixpbmRleCkpO1xuICAgIH0pO1xuICAgIHRoaXMudGFiQ29udGVudHMuZm9yRWFjaCgodGFiQ29udGVudCwgaW5kZXgpID0+IHtcbiAgICAgIHRoaXMuc2V0SUQodGFiQ29udGVudCxpbmRleCk7XG4gICAgICB0aGlzLnNldEFyaWFIaWRkZW4odGFiQ29udGVudCwhdGhpcy5pc0ZpcnN0SXRlbShpbmRleCkpO1xuICAgIH0pO1xuICB9XG4gIGNsaWNrKGVsZW1lbnQ6SFRNTEVsZW1lbnQsaW5kZXg6bnVtYmVyKSB7XG4gICAgY29uc3QgaXNTZWxlY3RlZDpib29sZWFuID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnKSA9PT0gJ3RydWUnO1xuICAgIGlmIChpc1NlbGVjdGVkKSByZXR1cm47XG4gICAgY29uc3QgaGlkZVRhYkJ1dHRvbnM6SFRNTEVsZW1lbnRbXSA9IHRoaXMudGFiQnV0dG9ucy5maWx0ZXIoKHgsaSkgPT4gaSAhPT0gaW5kZXgpO1xuICAgIGNvbnN0IGhpZGVUYWJDb250YWluZXJzOkhUTUxFbGVtZW50W10gPSB0aGlzLnRhYkNvbnRlbnRzLmZpbHRlcigoeCxpKSA9PiBpICE9PSBpbmRleCk7XG4gICAgdGhpcy5zaG93KGVsZW1lbnQsdGhpcy50YWJDb250ZW50c1tpbmRleF0pO1xuICAgIHRoaXMuaGlkZShoaWRlVGFiQnV0dG9ucyxoaWRlVGFiQ29udGFpbmVycyk7XG4gIH1cbiAgaXNGaXJzdEl0ZW0oaW5kZXg6bnVtYmVyKTpib29sZWFuIHtcbiAgICByZXR1cm4gaW5kZXggPT09IDA7XG4gIH1cbiAgc2hvdyh0YWJCdXR0b246SFRNTEVsZW1lbnQsdGFiQ29udGFpbmVyOkhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy5zZXRBcmlhU2VsZWN0ZWQodGFiQnV0dG9uLHRydWUpO1xuICAgIHRoaXMuc2V0QXJpYUhpZGRlbih0YWJDb250YWluZXIsZmFsc2UpO1xuICB9XG4gIGhpZGUodGFiQnV0dG9uczpIVE1MRWxlbWVudFtdLHRhYkNvbnRhaW5lcnM6SFRNTEVsZW1lbnRbXSkge1xuICAgIHRhYkJ1dHRvbnMuZm9yRWFjaCh4ID0+IHRoaXMuc2V0QXJpYVNlbGVjdGVkKHgsZmFsc2UpKTtcbiAgICB0YWJDb250YWluZXJzLmZvckVhY2goeCA9PiB0aGlzLnNldEFyaWFIaWRkZW4oeCx0cnVlKSk7XG4gIH1cbiAgc2V0QXJpYUNvbnRyb2xzKGVsZW1lbnQ6SFRNTEVsZW1lbnQsdmFsdWU6KG51bWJlcnxzdHJpbmcpKSB7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnLCBgJHt0aGlzLnRhYkNvbnRhaW5lck5hbWV9LXRhYiR7dmFsdWV9YCk7XG4gIH1cbiAgc2V0SUQoZWxlbWVudDpIVE1MRWxlbWVudCx2YWx1ZToobnVtYmVyfHN0cmluZykpIHtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCBgJHt0aGlzLnRhYkNvbnRhaW5lck5hbWV9LXRhYiR7dmFsdWV9YCk7XG4gIH1cbiAgc2V0QXJpYUhpZGRlbihlbGVtZW50OkhUTUxFbGVtZW50LHZhbHVlOmJvb2xlYW4pIHtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCBgJHt2YWx1ZX1gKTtcbiAgfVxuICBzZXRBcmlhU2VsZWN0ZWQoZWxlbWVudDpIVE1MRWxlbWVudCx2YWx1ZTpib29sZWFuKSB7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCBgJHt2YWx1ZX1gKTtcbiAgfVxufSIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==