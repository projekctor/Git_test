import React from 'react';
import { shallow } from 'enzyme';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import Select from 'react-select';

import CountryWrapper from './Country';
import CountryStore from '../../stores/CountryStore';
import CurrencyStore from '../../stores/CurrencyStore';

const Country = CountryWrapper.wrappedComponent;
/* eslint-disable react/jsx-filename-extension */

global.fetch = global.syncFetch;

describe('<Country />', () => {
  const props = {
    countryStore: new CountryStore(),
    currencyStore: new CurrencyStore(),
  };
  const wrapper = shallow(<Country {...props} />);

  it('Test shallow render', () => {
    expect(wrapper.length).to.be.equal(1);
    expect(wrapper.find(Select)).to.have.length(1);
  });

  it('test handleCountryChange call', () => {
    const setCountrySpy = sinon.spy(props.countryStore, 'setCountry');
    const setCurrencySpy = sinon.spy(props.currencyStore, 'setCurrency');
    const testCountry = { value: '5', label: 'United Kingdom' };
    wrapper.instance().handleCountryChange(testCountry);
    expect(setCountrySpy.args[0][0]).to.be.equal(testCountry);
    expect(setCurrencySpy.args[0][0].value).to.be.equal('58');
    setCountrySpy.restore();
  });
});
