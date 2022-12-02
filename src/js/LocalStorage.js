export default class LocalStorage {
  setItem(key, value) {
    return localStorage.setItem(key, value);
  }

  getItem(key) {
    return localStorage.getItem(key);
  }
}
