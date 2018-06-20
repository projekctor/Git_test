import React from 'react';
import { describe, it } from 'mocha';
import { expect } from 'chai';

import CountryStore from './CountryStore';


/* eslint-disable react/jsx-filename-extension */
describe('CountryStore test', () => {
  describe('CountryStore test in sync', () => {
    global.fetch = global.syncFetch;
    global.localStorage.removeItem('Country');
    const countryStore = new CountryStore();

    it('Test loading status', () => {
      expect(countryStore.loading).to.be.equal(false);
    });
    it('Test error status', () => {
      expect(countryStore.error).to.be.equal('');
    });
    it('Test countries status', () => {
      expect(countryStore.countries.items.length).to.be.equal(1);
      expect(countryStore.countries.items[0]._id).to.be.equal('5');
    });
    it('Test country status', () => {
      expect(countryStore.country).to.be.equal('');
    });
  });

  describe('CountryStore test in async process', () => {
    global.fetch = global.asyncFetch;
    const countryStore = new CountryStore();
    const resLoading = countryStore.loading;
    const resCountries = countryStore.countries;
    const resError = countryStore.error;

    it('Test loading status', () => {
      expect(resLoading).to.be.equal(true);
    });

    it('Test error status', () => {
      expect(resError).to.be.equal('');
    });

    it('Test countries status', () => {
      expect(resCountries).to.be.empty;
    });
  });

  // should test - does it really sync test in describe?
  describe('CountryStore test after async process', () => {
    global.fetch = global.asyncFetch;
    const countryStore = new CountryStore();

    it('Test loading status', async () => {
      await sleep(1500);
      expect(countryStore.loading).to.be.equal(false);
    });
    it('Test error status', () => {
      expect(countryStore.error).to.be.equal('');
    });
    it('Test countries status', () => {
      expect(countryStore.countries.items.length).to.be.equal(1);
      expect(countryStore.countries.items[0]._id).to.be.equal('5');
    });
  });

  describe('CountryStore test methods with wright country', () => {
    global.fetch = global.syncFetch;
    const countryStore = new CountryStore();
    countryStore.setCountry({ value: '5' });

    it('Test getCountryList()', () => {
      expect(countryStore.getCountryList()[0].value).to.be.equal('5');
      expect(countryStore.getCountryList()[0].label).to.be.equal('United Kingdom');
    });
    it('Test getCurCountry()', () => {
      expect(countryStore.getCurCountry().value).to.be.equal('5');
      expect(countryStore.getCurCountry().label).to.be.equal('United Kingdom');
    });
    it('Test getDefCurrency()', () => {
      expect(countryStore.getDefCurrency()).to.be.equal('58');
    });
  });

  describe('CountryStore test methods with wrong country', () => {
    global.fetch = global.syncFetch;
    const countryStore = new CountryStore();
    countryStore.setCountry({ value: '555' });

    it('Test getCurCountry()', () => {
      expect(countryStore.getCurCountry()).to.be.empty;
    });
    it('Test getDefCurrency()', () => {
      expect(countryStore.getDefCurrency()).to.be.empty;
    });
  });

  describe('CountryStore test localStorage', () => {
    global.fetch = global.syncFetch;

    it('Test localStorage saves "country"', () => {
      const countryStore = new CountryStore();
      countryStore.setCountry({ value: '5' });
      expect(countryStore.country).to.be.equal('5');
    });

    it('Test localStorage load "country"', () => {
      const countryStore = new CountryStore();
      expect(countryStore.country).to.be.equal('5');
    });

    it('Test localStorage clear "country" if wrong setted', () => {
      let countryStore = new CountryStore();
      countryStore.setCountry({ value: '555' });
      countryStore = new CountryStore();
      expect(countryStore.country).to.be.equal('');
    });
  });
});
