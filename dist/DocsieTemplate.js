"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _gatsby = require("gatsby");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var DocsieNav = function DocsieNav(props) {
  var navItems = props.nav.nodes.map(function (n) {
    return /*#__PURE__*/_react["default"].createElement("ul", {
      className: "docise-nav-items"
    }, n.items.map(function (doc) {
      return /*#__PURE__*/_react["default"].createElement("li", {
        key: doc.id,
        className: "docise-nav-item"
      }, /*#__PURE__*/_react["default"].createElement(_gatsby.Link, {
        to: doc.slug,
        onClick: function onClick(e) {
          return props.setMenu(function (_) {
            return doc.id;
          });
        }
      }, doc.name), !!doc.items.length && props.selectedMenu === doc.id && /*#__PURE__*/_react["default"].createElement("ul", {
        className: "docsie-nav-items"
      }, doc.items.map(function (book) {
        return /*#__PURE__*/_react["default"].createElement("li", {
          className: "docsie-nav-item",
          onClick: function onClick(e) {
            return props.setMenu(function (_) {
              return doc.id;
            });
          },
          key: book.id
        }, /*#__PURE__*/_react["default"].createElement(_gatsby.Link, {
          to: book.slugAsAnchor
        }, book.name));
      })));
    }));
  });
  return /*#__PURE__*/_react["default"].createElement("div", null, navItems.map(function (item) {
    return item;
  }));
};
function Docsie(props) {
  var _props$pageContext = props.pageContext,
    childrenDocsieBook = _props$pageContext.childrenDocsieBook,
    id = _props$pageContext.id,
    nav = _props$pageContext.nav;
  var _React$useState = _react["default"].useState("nav_item_" + id),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    selectedMenu = _React$useState2[0],
    setMenu = _React$useState2[1];
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "docsie-main-container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "docsie-nav-container"
  }, /*#__PURE__*/_react["default"].createElement(DocsieNav, {
    nav: nav,
    selectedMenu: selectedMenu,
    setMenu: setMenu
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "docsie-page-container"
  }, childrenDocsieBook.map(function (book) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("h2", {
      id: book.anchor,
      key: book.id
    }, book.name), book.childrenDocsieArticle.map(function (article) {
      return /*#__PURE__*/_react["default"].createElement("span", {
        dangerouslySetInnerHTML: {
          __html: article.html
        },
        id: article.anchor,
        key: article.id
      });
    }));
  })));
}
var _default = Docsie;
exports["default"] = _default;