module.exports =  new class {
  store = {};
  setItem = (key, val) => (this.store[key] = val);
  getItem = key => {
    if (this.store.hasOwnProperty(key)){
      return this.store[key];
    } else {
      return undefined;
    }
  }
  removeItem = key => {
    if (this.store.hasOwnProperty(key)) { 
      delete this.store[key]; 
      return true;
    } else {
      return false;
    }
  }
  clear = () => (this.store = {});
}();