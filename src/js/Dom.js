/* eslint-disable class-methods-use-this */
export default class DOM {
  createElement(element) {
    return document.createElement(element);
  }

  getElementBySelector(selector) {
    return document.querySelector(selector);
  }

  getElementByID(id) {
    return document.getElementById(id);
  }

  addListener(selector, action, callback) {
    return document.querySelector(selector).addEventListener(action, callback);
  }

  getDocument() {
    return document;
  }
}
