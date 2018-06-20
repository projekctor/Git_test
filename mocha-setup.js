import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

require('babel-polyfill');
// require('isomorphic-fetch');

Enzyme.configure({ adapter: new Adapter() });

class LocalStorageMock {
  getItem = key => (this[key]);
  setItem = (key, value) => { this[key] = value; };
  removeItem = (key) => { delete this[key]; };
}

// sync fetch mock
class PromiseMock {
  constructor(reslove, error) {
    this.resolve = reslove;
    this.error = error;
  }

  then = (res) => {
    let resPromise = null;

    if (!this.error) {
      try {
        resPromise = new PromiseMock(res(this.resolve));
      } catch (err) {
        this.error = err;
        resPromise = new PromiseMock(null, this.error);
      }
    } else {
      resPromise = new PromiseMock(null, this.error);
    }
    return resPromise;
  };

  catch = (rej) => {
    if (this.error) rej(this.error);
  };
}

class JsonMock {
  constructor(smth) {
    if (smth === 'https://api.pleasepay.co.uk/countries') {
      this._json = '{"items":[{"_id":"5","preferredCurrency":{"id":"58","name":"GBP"},"priority":0,"translations":{"en":"United Kingdom"},"vatPercent":"20"}]}';
    } else if (smth === 'https://api.pleasepay.co.uk/currencies') {
      this._json = '{"items":[{"_id":"100","positionType":"lex","translations":{"en":"MXN"}},{"_id":"58","positionType":"lex","translations":{"en":"NZD"}}]}';
    } else {
      this._json = '';
    }
  }
}

class SyncJson extends (JsonMock) {
  json = () => JSON.parse(this._json);
}

class AsyncJson extends (JsonMock) {
  json = () => (new Promise(resolve => resolve(JSON.parse(this._json))));
}

const asyncFetch = async (smth) => {
//  console.log(`async ${smth}`);
  await sleep(1000);
  return new AsyncJson(smth);
};

function syncFetch(smth) {
//  console.log(`sync ${smth}`);
  return new PromiseMock(new SyncJson(smth));
}

global.sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
global.syncFetch = smth => new syncFetch(smth);
global.asyncFetch = smth => new asyncFetch(smth);
global.localStorage = new LocalStorageMock();
