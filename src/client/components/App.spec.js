import React from 'react';
import { shallow } from 'enzyme';
import { describe, it } from 'mocha';
import { expect } from 'chai';

import Country from './Country';
import Currency from './Currency';
import AppWrapper from './App';
import CountryStore from '../stores/CountryStore';
import CurrencyStore from '../stores/CurrencyStore';

const App = AppWrapper.wrappedComponent;
/* eslint-disable react/jsx-filename-extension */

global.fetch = global.syncFetch;

describe('<App />', () => {
  const props = {
    countryStore: new CountryStore(),
    currencyStore: new CurrencyStore(),
  };
  const wrapper = shallow(<App {...props} />);
  it('Test shallow render', () => {
    expect(wrapper.length).to.be.equal(1);
    expect(wrapper.find(Country)).to.have.length(1);
    expect(wrapper.find(Currency)).to.have.length(1);
  });

  props.countryStore.error = 'test error';
  const wrapperErr1 = shallow(<App {...props} />);
  it('Test shallow render with error in countryStore ', () => {
    expect(wrapperErr1.length).to.be.equal(1);
    expect(wrapperErr1.contains(<div> <span>Error...try to reload page</span> </div>)).to.equal(true);
  });

  props.countryStore.error = '';
  props.currencyStore.error = 'test error';
  const wrapperErr2 = shallow(<App {...props} />);
  it('Test shallow render with error in currencyStore', () => {
    expect(wrapperErr2.length).to.be.equal(1);
    expect(wrapperErr2.contains(<div> <span>Error...try to reload page</span> </div>)).to.equal(true);
  });

  props.countryStore.error = '';
  props.currencyStore.error = '';
  props.countryStore.loading = true;
  const wrapperLoad1 = shallow(<App {...props} />);
  it('Test shallow render with loading in countryStore ', () => {
    expect(wrapperLoad1.length).to.be.equal(1);
    expect(wrapperLoad1.contains(<div> <span>Loading...</span> </div>)).to.equal(true);
  });

  props.countryStore.loading = false;
  props.currencyStore.loading = true;
  const wrapperLoad2 = shallow(<App {...props} />);
  it('Test shallow render with loading in currencyStore', () => {
    expect(wrapperLoad2.length).to.be.equal(1);
    expect(wrapperLoad2.contains(<div> <span>Loading...</span> </div>)).to.equal(true);
  });
});
