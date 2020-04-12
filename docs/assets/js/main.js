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
/* harmony import */ var _modules_tab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tab */ "./src/@js/modules/tab.ts");

Object(_modules_tab__WEBPACK_IMPORTED_MODULE_0__["default"])();


/***/ }),

/***/ "./src/@js/modules/tab.ts":
/*!********************************!*\
  !*** ./src/@js/modules/tab.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _Tab; });
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
var ariaName = {
    expanded: 'aria-expanded',
    hidden: 'aria-hidden',
    selected: 'aria-selected',
};
//TODO
// リファクタリング
// jQuery依存の削除
function _Tab() {
    var tabContainerName = '[data-tablist]';
    var tabHeaderName = '[role="presentation"]';
    var tabContentName = '[role="tabpanel"]';
    var tabContainers = __spread(document.querySelectorAll(tabContainerName));
    var tabHeaders = __spread(document.querySelectorAll(tabHeaderName));
    var tabContents = __spread(document.querySelectorAll(tabContentName));
    var tabContainerTabHeaders = tabContainers.map(function (x) { return __spread(x.querySelectorAll(tabHeaderName)); });
    var tabContainerTabContents = tabContainers.map(function (x) { return __spread(x.querySelectorAll(tabContentName)); });
    function toggleAriaSelected(element) {
        var isCurrentAriaSelected = element.getAttribute(ariaName.selected) === 'false';
        if (isCurrentAriaSelected) {
            element.setAttribute(ariaName.selected, 'true');
        }
        else {
            element.setAttribute(ariaName.selected, 'false');
        }
    }
    function toggleAriaHidden(element) {
        var isCurrentAriaHidden = element.getAttribute(ariaName.hidden) === 'false';
        if (isCurrentAriaHidden) {
            element.setAttribute(ariaName.hidden, 'true');
        }
        else {
            element.setAttribute(ariaName.hidden, 'false');
        }
    }
    function init() {
        tabContainers.forEach(function (tabContainer, tabContainerIndex) {
            tabContainerTabHeaders[tabContainerIndex].forEach(function (tabContainerTabHeader, tabContainerTabHeaderIndex) {
                if (tabContainerTabHeaderIndex === 0) {
                    tabContainerTabHeader.setAttribute(ariaName.selected, 'true');
                }
                else {
                    tabContainerTabHeader.setAttribute(ariaName.selected, 'false');
                }
            });
            tabContainerTabContents[tabContainerIndex].forEach(function (tabContainerTabContent, tabContainerTabContentIndex) {
                if (tabContainerTabContentIndex === 0) {
                    tabContainerTabContent.setAttribute(ariaName.hidden, 'false');
                    tabContainerTabContent.style.display = 'block';
                }
                else {
                    tabContainerTabContent.setAttribute(ariaName.hidden, 'true');
                    tabContainerTabContent.style.display = 'none';
                }
            });
        });
        tabHeaders.forEach(function (x, i) { return x.setAttribute('aria-controls', "tab" + i); });
        tabContents.forEach(function (x, i) { return x.setAttribute('id', "tab" + i); });
    }
    function accordion() {
        tabContainers.forEach(function (tabContainer, tabContainerIndex) {
            tabContainerTabHeaders[tabContainerIndex].forEach(function (tabContainerTabHeader, tabContainerTabHeaderIndex, tabContainerTabHeadersArray) {
                tabContainerTabHeader.addEventListener('click', function () {
                    var currentStatus = tabContainerTabHeader.getAttribute(ariaName.selected) === 'true';
                    if (currentStatus)
                        return;
                    tabContainerTabHeadersArray.forEach(function (x) { return toggleAriaSelected(x); });
                    tabContainerTabContents[tabContainerIndex].forEach(function (tabContainerTabContent, tabContainerTabContentIndex) {
                        toggleAriaHidden(tabContainerTabContent);
                        if (tabContainerTabHeaderIndex !== tabContainerTabContentIndex) {
                            tabContainerTabContent.style.display = 'none';
                        }
                        else {
                            tabContainerTabContent.style.display = 'block';
                        }
                    });
                });
            });
        });
    }
    if (tabContainers) {
        init();
        accordion();
    }
}


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Bqcy9tYWluLnRzIiwid2VicGFjazovLy8uL3NyYy9AanMvbW9kdWxlcy90YWIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0BzY3NzL2NvbW1vbi5zY3NzPzQ1NmEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQWlDO0FBQ2pDLDREQUFJLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNEUCxJQUFNLFFBQVEsR0FBRztJQUNmLFFBQVEsRUFBRSxlQUFlO0lBQ3pCLE1BQU0sRUFBRSxhQUFhO0lBQ3JCLFFBQVEsRUFBRSxlQUFlO0NBQzFCLENBQUM7QUFFRixNQUFNO0FBQ04sV0FBVztBQUNYLGNBQWM7QUFFQyxTQUFTLElBQUk7SUFDMUIsSUFB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Q0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsSUFBSSxhQUFhLEVBQUU7UUFDakIsSUFBSSxFQUFFLENBQUM7UUFDUCxTQUFTLEVBQUUsQ0FBQztLQUNiO0FBQ0gsQ0FBQzs7Ozs7Ozs7Ozs7O0FDckZELHlDIiwiZmlsZSI6Ii9kb2NzL2Fzc2V0cy9qcy9tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsImltcG9ydCBfVGFiIGZyb20gJy4vbW9kdWxlcy90YWInO1xuX1RhYigpOyIsImNvbnN0IGFyaWFOYW1lID0ge1xuICBleHBhbmRlZDogJ2FyaWEtZXhwYW5kZWQnLFxuICBoaWRkZW46ICdhcmlhLWhpZGRlbicsXG4gIHNlbGVjdGVkOiAnYXJpYS1zZWxlY3RlZCcsXG59O1xuXG4vL1RPRE9cbi8vIOODquODleOCoeOCr+OCv+ODquODs+OCsFxuLy8galF1ZXJ55L6d5a2Y44Gu5YmK6ZmkXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9UYWIoKTogdm9pZCB7XG4gIGNvbnN0IHRhYkNvbnRhaW5lck5hbWUgPSAnW2RhdGEtdGFibGlzdF0nO1xuICBjb25zdCB0YWJIZWFkZXJOYW1lID0gJ1tyb2xlPVwicHJlc2VudGF0aW9uXCJdJztcbiAgY29uc3QgdGFiQ29udGVudE5hbWUgPSAnW3JvbGU9XCJ0YWJwYW5lbFwiXSc7XG5cbiAgY29uc3QgdGFiQ29udGFpbmVycyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50Pih0YWJDb250YWluZXJOYW1lKV07XG4gIGNvbnN0IHRhYkhlYWRlcnMgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4odGFiSGVhZGVyTmFtZSldO1xuICBjb25zdCB0YWJDb250ZW50cyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50Pih0YWJDb250ZW50TmFtZSldO1xuXG4gIGNvbnN0IHRhYkNvbnRhaW5lclRhYkhlYWRlcnMgPSB0YWJDb250YWluZXJzLm1hcCh4ID0+IFsuLi54LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KHRhYkhlYWRlck5hbWUpXSk7XG4gIGNvbnN0IHRhYkNvbnRhaW5lclRhYkNvbnRlbnRzID0gdGFiQ29udGFpbmVycy5tYXAoeCA9PiBbLi4ueC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50Pih0YWJDb250ZW50TmFtZSldKTtcblxuICBmdW5jdGlvbiB0b2dnbGVBcmlhU2VsZWN0ZWQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBpc0N1cnJlbnRBcmlhU2VsZWN0ZWQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShhcmlhTmFtZS5zZWxlY3RlZCkgPT09ICdmYWxzZSc7XG4gICAgaWYgKGlzQ3VycmVudEFyaWFTZWxlY3RlZCkge1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXJpYU5hbWUuc2VsZWN0ZWQsICd0cnVlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGFyaWFOYW1lLnNlbGVjdGVkLCAnZmFsc2UnKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gdG9nZ2xlQXJpYUhpZGRlbihlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IGlzQ3VycmVudEFyaWFIaWRkZW4gPSBlbGVtZW50LmdldEF0dHJpYnV0ZShhcmlhTmFtZS5oaWRkZW4pID09PSAnZmFsc2UnO1xuICAgIGlmIChpc0N1cnJlbnRBcmlhSGlkZGVuKSB7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShhcmlhTmFtZS5oaWRkZW4sICd0cnVlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGFyaWFOYW1lLmhpZGRlbiwgJ2ZhbHNlJyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW5pdCgpOiB2b2lkIHtcbiAgICB0YWJDb250YWluZXJzLmZvckVhY2goKHRhYkNvbnRhaW5lciwgdGFiQ29udGFpbmVySW5kZXgpID0+IHtcbiAgICAgIHRhYkNvbnRhaW5lclRhYkhlYWRlcnNbdGFiQ29udGFpbmVySW5kZXhdLmZvckVhY2goKHRhYkNvbnRhaW5lclRhYkhlYWRlciwgdGFiQ29udGFpbmVyVGFiSGVhZGVySW5kZXgpID0+IHtcbiAgICAgICAgaWYgKHRhYkNvbnRhaW5lclRhYkhlYWRlckluZGV4ID09PSAwKSB7XG4gICAgICAgICAgdGFiQ29udGFpbmVyVGFiSGVhZGVyLnNldEF0dHJpYnV0ZShhcmlhTmFtZS5zZWxlY3RlZCwgJ3RydWUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YWJDb250YWluZXJUYWJIZWFkZXIuc2V0QXR0cmlidXRlKGFyaWFOYW1lLnNlbGVjdGVkLCAnZmFsc2UnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0YWJDb250YWluZXJUYWJDb250ZW50c1t0YWJDb250YWluZXJJbmRleF0uZm9yRWFjaCgodGFiQ29udGFpbmVyVGFiQ29udGVudCwgdGFiQ29udGFpbmVyVGFiQ29udGVudEluZGV4KSA9PiB7XG4gICAgICAgIGlmICh0YWJDb250YWluZXJUYWJDb250ZW50SW5kZXggPT09IDApIHtcbiAgICAgICAgICB0YWJDb250YWluZXJUYWJDb250ZW50LnNldEF0dHJpYnV0ZShhcmlhTmFtZS5oaWRkZW4sICdmYWxzZScpO1xuICAgICAgICAgIHRhYkNvbnRhaW5lclRhYkNvbnRlbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFiQ29udGFpbmVyVGFiQ29udGVudC5zZXRBdHRyaWJ1dGUoYXJpYU5hbWUuaGlkZGVuLCAndHJ1ZScpO1xuICAgICAgICAgIHRhYkNvbnRhaW5lclRhYkNvbnRlbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdGFiSGVhZGVycy5mb3JFYWNoKCh4LCBpKSA9PiB4LnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIGB0YWIke2l9YCkpO1xuICAgIHRhYkNvbnRlbnRzLmZvckVhY2goKHgsIGkpID0+IHguc2V0QXR0cmlidXRlKCdpZCcsIGB0YWIke2l9YCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gYWNjb3JkaW9uKCk6IHZvaWQge1xuICAgIHRhYkNvbnRhaW5lcnMuZm9yRWFjaCgodGFiQ29udGFpbmVyLCB0YWJDb250YWluZXJJbmRleCkgPT4ge1xuICAgICAgdGFiQ29udGFpbmVyVGFiSGVhZGVyc1t0YWJDb250YWluZXJJbmRleF0uZm9yRWFjaCgodGFiQ29udGFpbmVyVGFiSGVhZGVyLCB0YWJDb250YWluZXJUYWJIZWFkZXJJbmRleCwgdGFiQ29udGFpbmVyVGFiSGVhZGVyc0FycmF5KSA9PiB7XG4gICAgICAgIHRhYkNvbnRhaW5lclRhYkhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBjb25zdCBjdXJyZW50U3RhdHVzID0gdGFiQ29udGFpbmVyVGFiSGVhZGVyLmdldEF0dHJpYnV0ZShhcmlhTmFtZS5zZWxlY3RlZCkgPT09ICd0cnVlJztcbiAgICAgICAgICBpZiAoY3VycmVudFN0YXR1cykgcmV0dXJuO1xuICAgICAgICAgIHRhYkNvbnRhaW5lclRhYkhlYWRlcnNBcnJheS5mb3JFYWNoKHggPT4gdG9nZ2xlQXJpYVNlbGVjdGVkKHgpKTtcbiAgICAgICAgICB0YWJDb250YWluZXJUYWJDb250ZW50c1t0YWJDb250YWluZXJJbmRleF0uZm9yRWFjaCgodGFiQ29udGFpbmVyVGFiQ29udGVudCwgdGFiQ29udGFpbmVyVGFiQ29udGVudEluZGV4KSA9PiB7XG4gICAgICAgICAgICB0b2dnbGVBcmlhSGlkZGVuKHRhYkNvbnRhaW5lclRhYkNvbnRlbnQpO1xuICAgICAgICAgICAgaWYgKHRhYkNvbnRhaW5lclRhYkhlYWRlckluZGV4ICE9PSB0YWJDb250YWluZXJUYWJDb250ZW50SW5kZXgpIHtcbiAgICAgICAgICAgICAgdGFiQ29udGFpbmVyVGFiQ29udGVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGFiQ29udGFpbmVyVGFiQ29udGVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBpZiAodGFiQ29udGFpbmVycykge1xuICAgIGluaXQoKTtcbiAgICBhY2NvcmRpb24oKTtcbiAgfVxufVxuIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9