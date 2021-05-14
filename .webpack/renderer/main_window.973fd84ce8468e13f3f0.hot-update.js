webpackHotUpdate("main_window",{

/***/ "./src/components/ComponentTree.tsx":
/*!******************************************!*\
  !*** ./src/components/ComponentTree.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var HeadNode_1 = __importDefault(__webpack_require__(/*! ./HeadNode */ "./src/components/HeadNode.tsx"));
var Node_1 = __importDefault(__webpack_require__(/*! ./Node */ "./src/components/Node.tsx"));
// Component Tree for React Fiber Tree
// Currently renders a head node and a node component
// Probably will need to change once we figure out how to show the tree
function ComponentTree() {
    return (react_1.default.createElement("div", { className: 'componentTree' },
        react_1.default.createElement(HeadNode_1.default, null),
        react_1.default.createElement(Node_1.default, null)));
}
exports.default = ComponentTree;


/***/ }),

/***/ "./src/components/HeadNode.tsx":
/*!*************************************!*\
  !*** ./src/components/HeadNode.tsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
function HeadNode() {
    return react_1.default.createElement("div", { className: 'node' }, "Head Node");
}
exports.default = HeadNode;


/***/ }),

/***/ "./src/components/Header.tsx":
/*!***********************************!*\
  !*** ./src/components/Header.tsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
// Will eventually house header info 
// Need to add img, how to get img working in webpack? 
function Header() {
    return react_1.default.createElement("header", null, "ReacTron Header");
}
exports.default = Header;


/***/ }),

/***/ "./src/components/Node.tsx":
/*!*********************************!*\
  !*** ./src/components/Node.tsx ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
function Node() {
    return react_1.default.createElement("div", { className: 'node' }, "Node");
}
exports.default = Node;


/***/ }),

/***/ "./src/components/ReactComponent.tsx":
/*!*******************************************!*\
  !*** ./src/components/ReactComponent.tsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
function ReactComponent() {
    return react_1.default.createElement("div", { className: 'reactComponent' }, "Rendered React Component");
}
exports.default = ReactComponent;


/***/ }),

/***/ "./src/components/RenderedContainer.tsx":
/*!**********************************************!*\
  !*** ./src/components/RenderedContainer.tsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var ReactComponent_1 = __importDefault(__webpack_require__(/*! ./ReactComponent */ "./src/components/ReactComponent.tsx"));
function RenderedContainer() {
    return (react_1.default.createElement("div", { className: 'renderedContainer' },
        react_1.default.createElement(ReactComponent_1.default, null)));
}
exports.default = RenderedContainer;


/***/ }),

/***/ "./src/components/RenderedPage.tsx":
/*!*****************************************!*\
  !*** ./src/components/RenderedPage.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var Header_1 = __importDefault(__webpack_require__(/*! ./Header */ "./src/components/Header.tsx"));
var ComponentTree_1 = __importDefault(__webpack_require__(/*! ./ComponentTree */ "./src/components/ComponentTree.tsx"));
var Visualizer_1 = __importDefault(__webpack_require__(/*! ./Visualizer */ "./src/components/Visualizer.tsx"));
var electron = window.require('electron');
var path = __webpack_require__(/*! path */ "path");
// allows async rendering, and listens from the main processor
var ipcRenderer = electron.ipcRenderer;
var View = electron.view;
// Page that will show once directory has been imported
// exports RenderedPage with hook
function RenderedPage() {
    // allows async rendering, to listen from the main processor
    var filePath = 'file://' + path.resolve(__dirname, '../test.html');
    ipcRenderer.on('file-opened', function (event, content) {
        // reassign #hello to content rendered from ipcRenderer, the file uploaded
        console.log(content);
        var iframe = document.createElement('iframe');
        iframe.setAttribute('src', '');
        document.getElementById('hello').innerHTML = content;
    });
    return (react_1.default.createElement("div", { className: 'renderedPage' },
        react_1.default.createElement("button", { id: 'selectMe' }, "Click Me"),
        react_1.default.createElement("webview", { src: filePath }),
        react_1.default.createElement(Header_1.default, null),
        react_1.default.createElement(ComponentTree_1.default, null),
        react_1.default.createElement(Visualizer_1.default, null)));
}
exports.default = RenderedPage;


/***/ }),

/***/ "./src/components/StateContainer.tsx":
/*!*******************************************!*\
  !*** ./src/components/StateContainer.tsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var StateItem_1 = __importDefault(__webpack_require__(/*! ./StateItem */ "./src/components/StateItem.tsx"));
// conditional rendering based on how many state items
function StateContainer() {
    return (react_1.default.createElement("div", { className: 'stateContainer' },
        react_1.default.createElement(StateItem_1.default, null)));
}
exports.default = StateContainer;


/***/ }),

/***/ "./src/components/StateItem.tsx":
/*!**************************************!*\
  !*** ./src/components/StateItem.tsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
function StateItem() {
    return react_1.default.createElement("div", { className: 'stateItem' }, "State / Prop");
}
exports.default = StateItem;


/***/ }),

/***/ "./src/components/Visualizer.tsx":
/*!***************************************!*\
  !*** ./src/components/Visualizer.tsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var StateContainer_1 = __importDefault(__webpack_require__(/*! ./StateContainer */ "./src/components/StateContainer.tsx"));
var RenderedContainer_1 = __importDefault(__webpack_require__(/*! ./RenderedContainer */ "./src/components/RenderedContainer.tsx"));
// shows the selected React Component and it's props / state / methods
function Visualizer() {
    return (react_1.default.createElement("div", { className: 'visualizer' },
        react_1.default.createElement(StateContainer_1.default, null),
        react_1.default.createElement(RenderedContainer_1.default, null)));
}
exports.default = Visualizer;


/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Db21wb25lbnRUcmVlLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9IZWFkTm9kZS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvSGVhZGVyLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Ob2RlLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9SZWFjdENvbXBvbmVudC50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvUmVuZGVyZWRDb250YWluZXIudHN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1JlbmRlcmVkUGFnZS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvU3RhdGVDb250YWluZXIudHN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1N0YXRlSXRlbS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVmlzdWFsaXplci50c3giLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlHQUEwQjtBQUMxQix5R0FBa0M7QUFDbEMsNkZBQTBCO0FBRTFCLHNDQUFzQztBQUN0QyxxREFBcUQ7QUFDckQsdUVBQXVFO0FBRXZFLFNBQXdCLGFBQWE7SUFDbkMsT0FBTyxDQUNMLHVDQUFLLFNBQVMsRUFBQyxlQUFlO1FBQzVCLDhCQUFDLGtCQUFRLE9BQUc7UUFDWiw4QkFBQyxjQUFJLE9BQUcsQ0FDSixDQUNQLENBQUM7QUFDSixDQUFDO0FBUEQsZ0NBT0M7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZELGlHQUEwQjtBQUUxQixTQUF3QixRQUFRO0lBQzlCLE9BQU8sdUNBQUssU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsQ0FBQztBQUZELDJCQUVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKRCxpR0FB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YyxPQUFHO1FBQ2xCLDhCQUFDLDJCQUFpQixPQUFHLENBQ2pCLENBQ1AsQ0FBQztBQUNKLENBQUM7QUFQRCw2QkFPQzs7Ozs7Ozs7Ozs7O0FDYkQsaUMiLCJmaWxlIjoibWFpbl93aW5kb3cuOTczZmQ4NGNlODQ2OGUxM2YzZjAuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVhZE5vZGUgZnJvbSAnLi9IZWFkTm9kZSc7XG5pbXBvcnQgTm9kZSBmcm9tICcuL05vZGUnO1xuXG4vLyBDb21wb25lbnQgVHJlZSBmb3IgUmVhY3QgRmliZXIgVHJlZVxuLy8gQ3VycmVudGx5IHJlbmRlcnMgYSBoZWFkIG5vZGUgYW5kIGEgbm9kZSBjb21wb25lbnRcbi8vIFByb2JhYmx5IHdpbGwgbmVlZCB0byBjaGFuZ2Ugb25jZSB3ZSBmaWd1cmUgb3V0IGhvdyB0byBzaG93IHRoZSB0cmVlXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbXBvbmVudFRyZWUoKSB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9J2NvbXBvbmVudFRyZWUnPlxuICAgICAgPEhlYWROb2RlIC8+XG4gICAgICA8Tm9kZSAvPlxuICAgIDwvZGl2PlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSGVhZE5vZGUoKSB7XG4gIHJldHVybiA8ZGl2IGNsYXNzTmFtZT0nbm9kZSc+SGVhZCBOb2RlPC9kaXY+O1xufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuLy8gV2lsbCBldmVudHVhbGx5IGhvdXNlIGhlYWRlciBpbmZvIFxuLy8gTmVlZCB0byBhZGQgaW1nLCBob3cgdG8gZ2V0IGltZyB3b3JraW5nIGluIHdlYnBhY2s/IFxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIZWFkZXIoKSB7XG4gIHJldHVybiA8aGVhZGVyPlJlYWNUcm9uIEhlYWRlcjwvaGVhZGVyPjtcbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE5vZGUoKSB7XG4gIHJldHVybiA8ZGl2IGNsYXNzTmFtZT0nbm9kZSc+Tm9kZTwvZGl2Pjtcbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFJlYWN0Q29tcG9uZW50KCkge1xuICByZXR1cm4gPGRpdiBjbGFzc05hbWU9J3JlYWN0Q29tcG9uZW50Jz5SZW5kZXJlZCBSZWFjdCBDb21wb25lbnQ8L2Rpdj47XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0Q29tcG9uZW50IGZyb20gJy4vUmVhY3RDb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZW5kZXJlZENvbnRhaW5lcigpIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT0ncmVuZGVyZWRDb250YWluZXInPlxuICAgICAgPFJlYWN0Q29tcG9uZW50IC8+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEhlYWRlciBmcm9tICcuL0hlYWRlcic7XG5pbXBvcnQgQ29tcG9uZW50VHJlZSBmcm9tICcuL0NvbXBvbmVudFRyZWUnO1xuaW1wb3J0IFZpc3VhbGl6ZXIgZnJvbSAnLi9WaXN1YWxpemVyJztcbmNvbnN0IGVsZWN0cm9uID0gd2luZG93LnJlcXVpcmUoJ2VsZWN0cm9uJyk7XG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuLy8gYWxsb3dzIGFzeW5jIHJlbmRlcmluZywgYW5kIGxpc3RlbnMgZnJvbSB0aGUgbWFpbiBwcm9jZXNzb3JcbmNvbnN0IGlwY1JlbmRlcmVyID0gZWxlY3Ryb24uaXBjUmVuZGVyZXI7XG5jb25zdCBWaWV3ID0gZWxlY3Ryb24udmlldztcblxuLy8gUGFnZSB0aGF0IHdpbGwgc2hvdyBvbmNlIGRpcmVjdG9yeSBoYXMgYmVlbiBpbXBvcnRlZFxuXG4vLyBleHBvcnRzIFJlbmRlcmVkUGFnZSB3aXRoIGhvb2tcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFJlbmRlcmVkUGFnZSgpIHtcbiAgLy8gYWxsb3dzIGFzeW5jIHJlbmRlcmluZywgdG8gbGlzdGVuIGZyb20gdGhlIG1haW4gcHJvY2Vzc29yXG4gIGNvbnN0IGZpbGVQYXRoID0gJ2ZpbGU6Ly8nICsgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uL3Rlc3QuaHRtbCcpO1xuICBpcGNSZW5kZXJlci5vbignZmlsZS1vcGVuZWQnLCAoZXZlbnQ6IGFueSwgY29udGVudDogc3RyaW5nKSA9PiB7XG4gICAgLy8gcmVhc3NpZ24gI2hlbGxvIHRvIGNvbnRlbnQgcmVuZGVyZWQgZnJvbSBpcGNSZW5kZXJlciwgdGhlIGZpbGUgdXBsb2FkZWRcbiAgICBjb25zb2xlLmxvZyhjb250ZW50KTtcbiAgICBjb25zdCBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdzcmMnLCAnJyk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlbGxvJykuaW5uZXJIVE1MID0gY29udGVudDtcbiAgfSk7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9J3JlbmRlcmVkUGFnZSc+XG4gICAgICB7LyogYnV0dG9uIHNlbGVjdE1lIGluIHJlbmRlcmVyLnRzICovfVxuICAgICAgPGJ1dHRvbiBpZD0nc2VsZWN0TWUnPkNsaWNrIE1lPC9idXR0b24+XG4gICAgICAgIDx3ZWJ2aWV3IHNyYz17ZmlsZVBhdGh9Pjwvd2Vidmlldz5cbiAgICAgIDxIZWFkZXIgLz5cbiAgICAgIDxDb21wb25lbnRUcmVlIC8+XG4gICAgICA8VmlzdWFsaXplciAvPlxuICAgIDwvZGl2PlxuICApO1xufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTdGF0ZUl0ZW0gZnJvbSAnLi9TdGF0ZUl0ZW0nO1xuXG4vLyBjb25kaXRpb25hbCByZW5kZXJpbmcgYmFzZWQgb24gaG93IG1hbnkgc3RhdGUgaXRlbXNcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU3RhdGVDb250YWluZXIoKSB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9J3N0YXRlQ29udGFpbmVyJz5cbiAgICAgIDxTdGF0ZUl0ZW0gLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFN0YXRlSXRlbSgpIHtcbiAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPSdzdGF0ZUl0ZW0nPlN0YXRlIC8gUHJvcDwvZGl2Pjtcbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU3RhdGVDb250YWluZXIgZnJvbSAnLi9TdGF0ZUNvbnRhaW5lcic7XG5pbXBvcnQgUmVuZGVyZWRDb250YWluZXIgZnJvbSAnLi9SZW5kZXJlZENvbnRhaW5lcic7XG5cbi8vIHNob3dzIHRoZSBzZWxlY3RlZCBSZWFjdCBDb21wb25lbnQgYW5kIGl0J3MgcHJvcHMgLyBzdGF0ZSAvIG1ldGhvZHNcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVmlzdWFsaXplcigpIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT0ndmlzdWFsaXplcic+XG4gICAgICA8U3RhdGVDb250YWluZXIgLz5cbiAgICAgIDxSZW5kZXJlZENvbnRhaW5lciAvPlxuICAgIDwvZGl2PlxuICApO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiXSwic291cmNlUm9vdCI6IiJ9