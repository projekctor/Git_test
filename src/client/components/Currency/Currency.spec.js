import React from 'react';
import { shallow } from 'enzyme';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import Select from 'react-select';

import CurrencyWrapper from './Currency';
import CurrencyStore from '../../stores/CurrencyStore';

const Currency = CurrencyWrapper.wrappedComponent;
/* eslint-disable react/jsx-filename-extension */

global.fetch = global.syncFetch;

describe('<Currency />', () => {
  const props = {
    currencyStore: new CurrencyStore(),
  };
  const wrapper = shallow(<Currency {...props} />);

  it('Test shallow render', () => {
    expect(wrapper.length).to.be.equal(1);
    expect(wrapper.find(Select)).to.have.length(1);
  });

  it('test handleCurrencyChange call', () => {
    const setCurrencySpy = sinon.spy(props.currencyStore, 'setCurrency');
    const testCurrency = { value: '58' };
    wrapper.instance().handleCurrencyChange(testCurrency);
    expect(setCurrencySpy.args[0][0]).to.be.equal(testCurrency);
    setCurrencySpy.restore();
  });
});
