"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();Object.defineProperty(exports,"__esModule",{value:!0});var _react=require("react"),_react2=_interopRequireDefault(_react),_materialUi=require("material-ui"),_reactRedux=require("react-redux"),Head=function(e){function t(){return _classCallCheck(this,t),_possibleConstructorReturn(this,Object.getPrototypeOf(t).apply(this,arguments))}return _inherits(t,e),_createClass(t,[{key:"render",value:function(){return _react2["default"].createElement(_materialUi.AppBar,{title:this.props.user&&"admin"==this.props.user.group?"管理员主页":"个人主页",style:Object.assign({},{background:this.props.user?"admin"==this.props.user.group?"#444":"#f5862b":"#3d69e3"},this.props.style),iconElementLeft:_react2["default"].createElement(_materialUi.IconButton,{onClick:function(){return window.location="/"}},_react2["default"].createElement(_materialUi.SvgIcon,null,_react2["default"].createElement("path",{d:"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"}),_react2["default"].createElement("path",{d:"M0 0h24v24H0z",fill:"none"}))),iconElementRight:_react2["default"].createElement(_materialUi.FlatButton,{label:this.props.user?"注销":"登录",onTouchTap:this.props.user?this.props.onLogoutBtn:this.props.onLoginBtn})})}}]),t}(_react2["default"].Component);exports["default"]=(0,_reactRedux.connect)(function(e){return{user:e.user}},function(e){return{onLoginBtn:function(){return e({type:"login"})},onLogoutBtn:function(){return e({type:"logout"})}}})(Head);