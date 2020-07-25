"use strict";

var createElement = function createElement(_ref) {
  var _ref$attrs = _ref.attrs,
      attrs = _ref$attrs === void 0 ? {} : _ref$attrs,
      _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? {} : _ref$styles,
      _ref$handlers = _ref.handlers,
      handlers = _ref$handlers === void 0 ? {} : _ref$handlers,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? [] : _ref$data,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? "div" : _ref$type,
      forAttr = _ref.forAttr,
      text = _ref.text,
      html = _ref.html,
      className = _ref.className,
      id = _ref.id,
      parent = _ref.parent;
  var element = document.createElement(type);

  for (var attr in attrs) {
    element[attr] = attrs[attr];
  }

  for (var style in styles) {
    element.style[style] = styles[style];
  }

  for (var handler in handlers) {
    element.addEventListener(handler, handlers[handler].bind(element));
  }

  data.forEach(function (items) {
    element.setAttribute(items.key, items.value);
  });
  if (forAttr) element.setAttribute('for', forAttr);
  if (id) element.id = id;
  if (className) element.className = className;
  if (text) element.innerText = text;
  if (html) element.innerHTML = html;
  if (parent) parent.appendChild(element);
  return element;
};
//# sourceMappingURL=createElement.js.map
