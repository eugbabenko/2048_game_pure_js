import '../scss/styles.scss';
import DOM from './Dom';
import View from './View';
import Controller from './Controller';
import Model from './Model';
import LocalStorage from './LocalStorage';
import Observer from './Observer';

const localStorage = new LocalStorage();
const dom = new DOM();
const observer = new Observer();
const model = new Model(localStorage, observer);
const view = new View(dom, observer);
const controller = new Controller(model, dom);

controller.initGame();
controller.run();
