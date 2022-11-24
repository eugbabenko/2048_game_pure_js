import '../scss/styles.scss';
import DOM from './Dom';
import View from './View';
import Controller from './Controller';
import Model from './Model';
import LocalStorage from './LocalStorage';
import Observer from './Observer';

const localStorage = new LocalStorage();
const dom = new DOM();
const model = new Model(localStorage);
const view = new View(dom);
const controller = new Controller(view, model, dom);
const observer = new Observer();

controller.initGame();
controller.run();
