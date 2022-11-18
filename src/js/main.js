import '../scss/styles.scss';
import DOM from './dom.js';
import View from './view.js';
import Controller from './controller.js';
import Model from './model.js';

const dom = new DOM();
const model = new Model();
const view = new View(dom, model);
const controller = new Controller(view, model, dom);

controller.initGame();
controller.run();
