import '../scss/styles.scss';
import DOM from './dom.js';
import View from './view.js';
import Controller from './controller.js';
import Model from './model.js';

const view = new View();
const model = new Model();
const dom = new DOM(model);
const controller = new Controller(model, dom);

controller.run()

