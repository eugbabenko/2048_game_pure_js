import '../scss/styles.scss';
import DOM from './dom.js';
import View from './view.js';
import Controller from './controller.js';
import Model from './model.js';

const dom = new DOM();
const view = new View();
const controller = new Controller();
const model = new Model();

controller.run()