import '../scss/styles.scss';
import DOM from './dom';
import View from './view';
import Controller from './controller.js';
import Model from './model.js';
import LocalStorage from './LocalStorage.js';

const localStorage = new LocalStorage();
const dom = new DOM();
const model = new Model(localStorage);
const view = new View(dom);
const controller = new Controller(view, model, dom);

controller.initGame();
controller.run();
