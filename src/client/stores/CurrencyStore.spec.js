import React from 'react';
import { describe, it } from 'mocha';
import { expect } from 'chai';

import CurrencyStore from './CurrencyStore';


/* eslint-disable react/jsx-filename-extension */
describe('CurrencyStore test', () => {
  describe('CurrencyStore test in sync', () => {
    global.fetch = global.syncFetch;
    global.localStorage.removeItem('Currency');
    const currencyStore = new CurrencyStore();

    it('Test loading status', () => {
      expect(currencyStore.loading).to.be.equal(false);
    });
    it('Test error status', () => {
      expect(currencyStore.error).to.be.equal('');
    });
    it('Test currencies status', () => {
      expect(currencyStore.currencies.items.length).to.be.equal(2);
      expect(currencyStore.currencies.items[0]._id).to.be.equal('100');
    });
    it('Test currency status', () => {
      expect(currencyStore.currency).to.be.equal('');
    });
  });

  describe('CurrencyStore test in async process', () => {
    global.fetch = global.asyncFetch;
    const currencyStore = new CurrencyStore();
    const resLoading = currencyStore.loading;
    const resCurrencies = currencyStore.currencies;
    const resError = currencyStore.error;

    it('Test loading status', () => {
      expect(resLoading).to.be.equal(true);
    });

    it('Test error status', () => {
      expect(resError).to.be.equal('');
    });

    it('Test currencies status', () => {
      expect(resCurrencies).to.be.empty;
    });
  });

  // should test - does it really sync test in describe?
  describe('CurrencyStore test after async process', () => {
    global.fetch = global.asyncFetch;
    const currencyStore = new CurrencyStore();

    it('Test loading status', async () => {
      await sleep(1500);
      expect(currencyStore.loading).to.be.equal(false);
    });
    it('Test error status', () => {
      expect(currencyStore.error).to.be.equal('');
    });
    it('Test currencies status', () => {
      expect(currencyStore.currencies.items.length).to.be.equal(2);
      expect(currencyStore.currencies.items[0]._id).to.be.equal('100');
    });
  });

  describe('CurrencyStore test methods with wright currency', () => {
    global.fetch = global.syncFetch;
    const currencyStore = new CurrencyStore();
    currencyStore.setCurrency({ value: '58' });

    it('Test getCurCountry()', () => {
      expect(currencyStore.getCurCurrency().value).to.be.equal('58');
      expect(currencyStore.getCurCurrency().label).to.be.equal('NZD');
    });
  });

  describe('CurrencyStore test methods with wrong currency', () => {
    global.fetch = global.syncFetch;
    const currencyStore = new CurrencyStore();
    currencyStore.setCurrency({ value: '555' });

    it('Test getCurCountry()', () => {
      expect(currencyStore.getCurCurrency()).to.be.empty;
    });
  });

  describe('CurrencyStore test localStorage', () => {
    global.fetch = global.syncFetch;

    it('Test localStorage saves "currency"', () => {
      const currencyStore = new CurrencyStore();
      currencyStore.setCurrency({ value: '58' });
      expect(currencyStore.currency).to.be.equal('58');
    });

    it('Test localStorage load "currency"', () => {
      const currencyStore = new CurrencyStore();
      expect(currencyStore.currency).to.be.equal('58');
    });

    it('Test localStorage clear "currency" if wrong setted', () => {
      let currencyStore = new CurrencyStore();
      currencyStore.setCurrency({ value: '555' });
      currencyStore = new CurrencyStore();
      expect(currencyStore.currency).to.be.equal('');
    });
  });
});
